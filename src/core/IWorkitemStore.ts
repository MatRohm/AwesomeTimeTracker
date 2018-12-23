import { IWorkitem } from './businessModel/IWorkitem';

export interface IWorkitemStore {
  saveWorkItem(workItem: IWorkitem): void;
  getWorkItemsByName(name: string): Promise<IWorkitem[]>;
}
