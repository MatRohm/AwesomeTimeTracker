// follow https://github.com/louischatriot/nedb for further information
import { ArgumentUtility } from './Arguments/ArgumentUtility';
import { IWorkitemStore } from './IWorkitemStore';
import { IWorkitem } from './businessModel/IWorkitem';
import { NedbService } from './NedbService';
import { Workitem } from './businessModel/Workitem';

export class WorkitemStore implements IWorkitemStore {

  public _databaseService: NedbService;

  public constructor(service: NedbService) {
    ArgumentUtility.CheckDefined('service', service);
    this._databaseService = service;
  }

  public async GetWorkItemsByName(workItemName: string): Promise<IWorkitem[]> {
    let workitems: IWorkitem[];
    const query = this.GetWorkItemsByNameQuery(workItemName);

    const promise = this._databaseService.find(query);
    promise.then((docs) => { workitems = this.convertToWorkitems(docs); });

    await promise;
    return workitems;
  }

  public SaveWorkItem(workItem: IWorkitem): void {
    ArgumentUtility.CheckDefined('workItem', workItem);
    ArgumentUtility.CheckHasContent('workItem.name', workItem.name);

    const documentToInsert = {
      worklog: {
        name: workItem.name,
      }
    };
    this._databaseService.insert(documentToInsert);
  }

  private convertToWorkitems(documents: any[]): IWorkitem[] {
    const workitems = new Array<IWorkitem>();

    documents.forEach((value, index) => {
      const workitem = new Workitem();
      workitem.name = value.worklog.name;
      workitems.push(workitem);
    });

    return workitems;
  }

  private GetWorkItemsByNameQuery(workItemName: string): object {
    // this is a regex which checks if the given value contains 'workItemName' case-insensitive
    const containsNameRegex = new RegExp(`\\b(${workItemName})\\b`, 'gi');
    console.log(containsNameRegex);
    const query: object = { 'worklog.name': { $regex: containsNameRegex } };
    return query;
  }
}
