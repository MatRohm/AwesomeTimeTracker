// follow https://github.com/louischatriot/nedb for further information
import Nedb from 'nedb';
import { ArgumentUtility } from './Arguments/ArgumentUtility';
import { IWorkItemStore } from './IWorkItemStore';
import { IWorkItem } from './businessModell/IWorkItem';
import { WorkItem } from './businessModell/WorkItem';

export class WorkitemStore implements IWorkItemStore {
  public static GetDefault(): IWorkItemStore {
    if (this.s_workItemInstance == null) {
      const workItemDatabase = new Nedb('./workItemDatabase.db');
      this.s_workItemInstance = new WorkitemStore(workItemDatabase);
    }

    return this.s_workItemInstance;
  }

  private static s_workItemInstance: IWorkItemStore;

  private _workItemDatabase: Nedb;

  public constructor(nedb: Nedb) {
    ArgumentUtility.CheckDefined('nedb', nedb);

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
    ArgumentUtility.CheckDefined('workItem', workItem);
    ArgumentUtility.CheckDefined('workItem.name', workItem.name);

    const documentToInsert = {
      name: workItem.name,
    };

    this._workItemDatabase.insert(documentToInsert);
  }
}

const workItemStore = WorkitemStore.GetDefault();
export { workItemStore };
