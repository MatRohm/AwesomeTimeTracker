import { IWorkItem } from '../../shared/WorkItem';

export class CurrentWorkItemService {
  private static _instance: CurrentWorkItemService;

  public static GetInstance(): CurrentWorkItemService {
    if (this._instance == null) {
      this._instance = new CurrentWorkItemService();
    }
    return this._instance
  }

  private constructor() {
  }

  GetWorkItems(name: string): Set<IWorkItem> {
    console.log("INPUT: " + name);
    return null;
  }
}

const serviceInstance = CurrentWorkItemService.GetInstance();

export { serviceInstance };