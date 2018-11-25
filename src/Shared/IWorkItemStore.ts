import { IWorkItem } from './BusinessModel/IWorkItem';
export interface IWorkItemStore {
  SaveWorkItem(workItem: IWorkItem): void;
  GetWorkItemsByName(name: string): Set<IWorkItem>;
}
