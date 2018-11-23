import { IWorkItem } from '../../shared/WorkItem';

export class CurrentWorkItemService {

  public static GetInstance(): CurrentWorkItemService {
    if (this.instance == null) {
      this.instance = new CurrentWorkItemService();
    }
    return this.instance;
  }
  private static instance: CurrentWorkItemService;

  private constructor() {
  }

  public GetWorkItems(name: string): Set<IWorkItem> {
    console.log('INPUT: ' + name);
    return null;
  }
}

const serviceInstance = CurrentWorkItemService.GetInstance();

export { serviceInstance };
