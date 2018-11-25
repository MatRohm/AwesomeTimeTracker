// follow https://github.com/louischatriot/nedb for further information
import * as Nedb from 'nedb';
import { WorkItem } from './BusinessModel/WorkItem';
import { IWorkItem } from './BusinessModel/IWorkItem';
import { ArgumentUtility } from './Arguments/ArgumentUtility';
import { IWorkItemStore } from './IWorkItemStore';

export class NeDBStore implements IWorkItemStore {
  public static GetDefault(): IWorkItemStore {
    if (this.workItemInstance == null) {
      const workItemDatabase = new Nedb('./workItemDatabase.db');
      this.workItemInstance = new NeDBStore(workItemDatabase);
    }

    return this.workItemInstance;
  }

  private static workItemInstance: IWorkItemStore;

  private _workItemDatabase: Nedb;

  public constructor(nedb: Nedb) {
    ArgumentUtility.CheckNotNullAndNotUndefined('nedb', nedb);

    this._workItemDatabase = nedb;
    this._workItemDatabase.loadDatabase();
  }
  public GetWorkItemsByName(workItemName: string): Set<IWorkItem> {
    const returnSet = new Set();
    const myQuery = `/${workItemName}/`;
    const results = this._workItemDatabase.find({ name: myQuery });
    results.limit(10);
    results.exec((err, docs) => {
      docs.forEach((value, index) => {
        const workItem = new WorkItem();
        workItem.name = (value as IWorkItem).name;
        returnSet.add(workItem);
      });
    });

    return returnSet;
  }

  public SaveWorkItem(workItem: IWorkItem): void {
    ArgumentUtility.CheckNotNullAndNotUndefined('workItem', workItem);
    ArgumentUtility.CheckNotNullAndNotUndefined('workItem.name', workItem.name);

    const documentToInsert = {
      name: workItem.name,
    };

    this._workItemDatabase.insert(documentToInsert);
  }
}

const workItemStore = NeDBStore.GetDefault();
export { workItemStore };
