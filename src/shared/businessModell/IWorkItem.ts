import { IWorklog } from './IWorkLog';

export interface IWorkitem {
  name: string;
  worklogs: Set<IWorklog>;
  getWorkedTime(): string;
}
