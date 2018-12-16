import { IWorkitem } from './businessModel/IWorkitem';

export interface IWorkitemStore {
  SaveWorkItem(workItem: IWorkitem): void;
  GetWorkItemsByName(name: string): Promise<IWorkitem[]>;
}
