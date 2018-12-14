import Nedb from 'nedb';
import { NeDBStore } from '../../shared/Store';
import { WorkItem } from '../../shared/businessModell/WorkItem';

let _nedbStore: NeDBStore;
let _nodeExprDB: Nedb;

describe('Integration test: GetWorkItemsByName', () => {
  beforeEach(() => {
    _nodeExprDB = new Nedb('./workItemDatabase.test.db');
    _nedbStore = new NeDBStore(_nodeExprDB);
  });

  afterEach(() => {
    _nodeExprDB.remove({}, { multi: true }, (err, numRemoved) => {
      _nodeExprDB.loadDatabase();
    });
  });

  it('When given null, returns all defined values', () => {
    const values = _nedbStore.GetWorkItemsByName(null);
  });

  it('When given "ABC" returns all worklogs with "ABC" in its name', () => {
    const values = _nedbStore.GetWorkItemsByName('ABC');
  });
});

describe('Integration test: SaveWorkItem', () => {
  beforeEach(() => {
    _nodeExprDB = new Nedb('./workItemDatabase.test.db');
    _nedbStore = new NeDBStore(_nodeExprDB);
  });

  afterEach(() => {
    _nodeExprDB.remove({}, { multi: true }, (err, numRemoved) => {
      _nodeExprDB.loadDatabase();
    });
  });

  it('When given null throws exceptions', () => {
    expect(() => _nedbStore.SaveWorkItem(null)).toThrowError();
  });

  it('When given undefined throws exceptions', () => {
    expect(() => _nedbStore.SaveWorkItem(undefined)).toThrowError();
  });

  it('When given a workitem with null name, throws excpetion', () => {
    const workitem = new WorkItem();
    expect(() => _nedbStore.SaveWorkItem(workitem)).toThrowError();
  });

  it('When given a workitem stores it into database', () => {
    const workitem = new WorkItem();
    const itemName = 'Testitem';

    workitem.name = itemName;
    _nedbStore.SaveWorkItem(workitem);

    _nodeExprDB.count({ name: itemName }, (err, count) => {
      expect(count).toBe(1);
    });
  });
});
