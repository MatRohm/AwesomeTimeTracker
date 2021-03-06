import Nedb from 'nedb';
import { WorkitemStore } from '../../core/WorkitemStore';
import { Workitem } from '../../core/businessModel/Workitem';
import { NedbService } from '../../core/NedbService';

let _workItemStore: WorkitemStore;
let _nodeExprDB: Nedb;

describe('Integration tests for WorkitemStore', () => {
  beforeEach(() => {
    _nodeExprDB = new Nedb('./awesomeTimeTracker.test.db');
    _nodeExprDB.loadDatabase();
    const s_workItemInstance = new NedbService(_nodeExprDB);
    _workItemStore = new WorkitemStore(s_workItemInstance);
  });

  afterEach(() => {
    _nodeExprDB.remove({}, { multi: true }, (err, numRemoved) => {
      _nodeExprDB.loadDatabase();
    });
  });

  it('test save and find', async () => {
    const item = new Workitem('Sample test');

    expect(() => _workItemStore.saveWorkItem(item)).not.toThrowError();

    const loadedWorkItems = await _workItemStore.getWorkItemsByName(item.name);
    expect(loadedWorkItems).toHaveLength(1);
    expect(loadedWorkItems[0].name).toBe(item.name);
  });
});
