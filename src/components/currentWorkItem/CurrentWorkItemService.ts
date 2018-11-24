import { IWorkItem } from '../../shared/WorkItem';
// import { workItemStore } from '../../shared/Store';

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
    // var items = workItemStore.GetWorkItemsByName(name);
    return null;
  }
}

const serviceInstance = CurrentWorkItemService.GetInstance();

export { serviceInstance };
