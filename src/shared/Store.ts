// follow https://github.com/louischatriot/nedb for further information
import * as Nedb from 'nedb';
import { IWorkItem, WorkItem } from './WorkItem';
import { ArgumentUtility } from './ArgumentUtility';

export class NeDBStore implements IWorkItemStore {
  GetWorkItemsByName(workItemName: string): Set<IWorkItem> {
    let returnSet = new Set();
    let myQuery = `/${workItemName}/`;
    let results = this._workItemDatabase.find({ name: myQuery });
    results.limit(10);
    results.exec((err, docs) => {
      docs.forEach((value, index) => {
        var workItem = new WorkItem();
        workItem.name = (<IWorkItem>value).name;
        returnSet.add(workItem);
      })
    });

    return returnSet;
  }

  public static GetDefault(): IWorkItemStore {
    if (this.workItemInstance == null) {
      this.workItemInstance = new NeDBStore();
    }

    return this.workItemInstance;
  }

  private static workItemInstance: IWorkItemStore;
  private _workItemDatabase: Nedb;

  public constructor(nedb?: Nedb) {
    if (nedb) {
      this._workItemDatabase = nedb;
      this._workItemDatabase.loadDatabase();
    }
    else {
      this._workItemDatabase = new Nedb('./workItemDatabase.db');
      this._workItemDatabase.loadDatabase();
    }
  }

  public SaveWorkItem(workItem: IWorkItem): void {
    ArgumentUtility.CheckNotNullAndNotUndefined("workItem", workItem);
    ArgumentUtility.CheckNotNullAndNotUndefined("workItem.name", workItem.name);

    var documentToInsert = {
      name: workItem.name,
    }

    this._workItemDatabase.insert(documentToInsert);
  }
}

interface IWorkItemStore {
  SaveWorkItem(workItem: IWorkItem): void;
  GetWorkItemsByName(name: string): Set<IWorkItem>
}

const workItemStore = NeDBStore.GetDefault();
export { workItemStore };