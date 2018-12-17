import { WorkitemStore } from '../../shared/WorkitemStore';
import { IWorkitem } from '../../shared/businessModel/IWorkitem';
import { NedbService } from '../../shared/NedbService';

export class CurrentWorkitemService {
  public static getInstance(): CurrentWorkitemService {
    if (this.instance == null) {
      this.instance = new CurrentWorkitemService();
    }
    return this.instance;
  }
  private static instance: CurrentWorkitemService;

  private _store: WorkitemStore;

  private constructor() {
    const service = NedbService.getDefault();
    this._store = new WorkitemStore(service);
  }

  public getWorkItems(name: string): Set<IWorkitem> {
    console.log('INPUT: ' + name);
    const items = this._store.getWorkItemsByName(name);
    return null;
  }
}

const serviceInstance = CurrentWorkitemService.getInstance();

export { serviceInstance };
