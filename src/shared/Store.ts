// follow https://github.com/louischatriot/nedb for further information
import * as Nedb from 'nedb';
import { IWorkItem, WorkItem } from './WorkItem';

class NeDBStore implements IWorkItemStore {
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

  public static GetWorkItemStore(): IWorkItemStore {
    if (this.workItemInstance == null) {
      this.workItemInstance = new NeDBStore();
    }

    return this.workItemInstance;
  }

  private static workItemInstance: IWorkItemStore;
  private _workItemDatabase: Nedb;

  private constructor() {
    this._workItemDatabase = new Nedb('./workItemDatabase.db');
    this._workItemDatabase.loadDatabase();
  }

  public SaveWorkItem(workItem: IWorkItem): void {
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

const workItemStore = NeDBStore.GetWorkItemStore();
export { workItemStore };