import * as Collections from 'typescript-collections';

export interface IWorkItem {
  name: string;
  worklogs: Collections.Set<IWorkLog>;
  getWorkedTime(): string;
}

export interface IWorkLog {
  startDate: Date,
  endDate: Date
}

export class WorkItem implements IWorkItem {
  getWorkedTime(): string {
    let sumOfMilliSeconds: number;
    this.worklogs.forEach(o => { sumOfMilliSeconds += o.startDate.getTime() - o.endDate.getTime() });
    let d = new Date();
    d.setMilliseconds(sumOfMilliSeconds);
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
  name: string;
  worklogs: Collections.Set<IWorkLog>;
}