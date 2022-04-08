import { WorkItem } from './WorkItem';
import { WorkLog } from './WorkLog';

class WorkRepository {
  private _workItems: WorkItem[] = new Array<WorkItem>(new WorkItem('first-workitem'), new WorkItem('second-workitem'));  
  private _workLogs: WorkLog[] = new Array<WorkLog>(new WorkLog(this._workItems[0]), new WorkLog(this._workItems[1]));

  public getWorkItems(): WorkItem[] {
    return this._workItems;
  }

  public getWorkLogsForWorkItem(workItem: WorkItem) {
    const filteredWorkLogs = this._workLogs.filter(workLog => workLog.workItem == workItem);
    return filteredWorkLogs;
  }
}

export const repository = new WorkRepository();
