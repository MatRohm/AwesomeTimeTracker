import { IWorklog } from './IWorkLog';

export interface IWorkitem {
  name: string;
  worklogs: IWorklog[];
  getWorkedTimeInSeconds(): number;
}
