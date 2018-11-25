import { IWorkItem } from './businessModell/IWorkItem';

export interface IWorkItemStore {
  SaveWorkItem(workItem: IWorkItem): void;
  GetWorkItemsByName(name: string): Set<IWorkItem>;
}
