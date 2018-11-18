import { IWorkItem } from '../../shared/WorkItem';

export class CurrentWorkItemService {

  public static GetInstance(): CurrentWorkItemService {
    if (this._instance == null) {
      this._instance = new CurrentWorkItemService();
    }
    return this._instance;
  }
  private static _instance: CurrentWorkItemService;

  private constructor() {
  }

  public GetWorkItems(name: string): Set<IWorkItem> {
    console.log('INPUT: ' + name);
    return null;
  }
}

const serviceInstance = CurrentWorkItemService.GetInstance();

export { serviceInstance };
