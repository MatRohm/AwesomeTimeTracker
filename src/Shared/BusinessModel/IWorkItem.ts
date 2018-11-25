import { IWorkLog } from './IWorkLog';

export interface IWorkItem {
  name: string;
  worklogs: Set<IWorkLog>;
  getWorkedTime(): string;
}
