import { IWorkitem } from './businessModell/IWorkItem';

export interface IWorkitemStore {
  SaveWorkItem(workItem: IWorkitem): void;
  GetWorkItemsByName(name: string): Set<IWorkitem>;
}
