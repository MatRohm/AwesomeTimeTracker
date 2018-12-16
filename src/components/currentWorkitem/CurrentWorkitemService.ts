import { WorkitemStore } from '../../shared/WorkitemStore';
import { IWorkitem } from '../../shared/businessModel/IWorkitem';

export class CurrentWorkitemService {
  public static GetInstance(): CurrentWorkitemService {
    if (this.instance == null) {
      this.instance = new CurrentWorkitemService();
    }
    return this.instance;
  }
  private static instance: CurrentWorkitemService;

  private _store: WorkitemStore;

  private constructor() {
    this._store = new WorkitemStore();
  }

  public GetWorkItems(name: string): Set<IWorkitem> {
    console.log('INPUT: ' + name);
    const items = this._store.GetWorkItemsByName(name);
    return null;
  }
}

const serviceInstance = CurrentWorkitemService.GetInstance();

export { serviceInstance };
