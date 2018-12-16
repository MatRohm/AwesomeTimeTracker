import { workItemStore } from '../../shared/WorkitemStore';
import { IWorkitem } from '../../shared/businessModell/IWorkItem';

export class CurrentWorkitemService {
  public static GetInstance(): CurrentWorkitemService {
    if (this.instance == null) {
      this.instance = new CurrentWorkitemService();
    }
    return this.instance;
  }
  private static instance: CurrentWorkitemService;

  private constructor() {
  }

  public GetWorkItems(name: string): Set<IWorkitem> {
    console.log('INPUT: ' + name);
    const items = workItemStore.GetWorkItemsByName(name);
    return null;
  }
}

const serviceInstance = CurrentWorkitemService.GetInstance();

export { serviceInstance };
