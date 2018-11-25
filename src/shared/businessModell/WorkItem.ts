import { IWorkLog } from './IWorkLog';
import { IWorkItem } from './IWorkItem';

export class WorkItem implements IWorkItem {
  public worklogs: Set<IWorkLog>;
  private _name: string;

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public getWorkedTime(): string {
    let sumOfMilliSeconds: number;
    this.worklogs.forEach(o => { sumOfMilliSeconds += o.startDate.getTime() - o.endDate.getTime(); });
    const d = new Date();
    d.setMilliseconds(sumOfMilliSeconds);
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  }
}
