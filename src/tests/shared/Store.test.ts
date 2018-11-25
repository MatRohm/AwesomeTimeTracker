import * as Nedb from 'nedb';
import { NeDBStore } from '../../shared/Store';
import { WorkItem } from '../../shared/WorkItem';

var _nedbStore: NeDBStore;
var _nodeExprDB: Nedb;

describe('Integration test: GetWorkItemsByName', () => {
  beforeEach(() => {
    _nodeExprDB = new Nedb('./workItemDatabase.test.db');
    _nedbStore = new NeDBStore(_nodeExprDB);
  })

  afterEach(() => {
    _nodeExprDB.remove({}, { multi: true }, function (err, numRemoved) {
      _nodeExprDB.loadDatabase(function (err) {
      });
    });
  });

  it('When given null, returns all defined values', () => {
    let values = _nedbStore.GetWorkItemsByName(null);
  });

  it('When given "ABC" returns all worklogs with "ABC" in its name', () => {
    let values = _nedbStore.GetWorkItemsByName('ABC');
  });
});

describe('Integration test: SaveWorkItem', () => {
  beforeEach(() => {
    _nodeExprDB = new Nedb('./workItemDatabase.test.db');
    _nedbStore = new NeDBStore(_nodeExprDB);
  })

  afterEach(() => {
    _nodeExprDB.remove({}, { multi: true }, function (err, numRemoved) {
      _nodeExprDB.loadDatabase(function (err) {
      });
    });
  });
  afterAll(() => {
    // TODO: delete database
  })

  it('When given null throws exceptions', () => {
    expect(() => _nedbStore.SaveWorkItem(null)).toThrowError();
  });

  it('When given undefined throws exceptions', () => {
    expect(() => _nedbStore.SaveWorkItem(undefined)).toThrowError();
  });

  it('When given a workitem with null name, throws excpetion', () => {
    let workitem = new WorkItem();
    expect(() => _nedbStore.SaveWorkItem(workitem)).toThrowError();
  });

  it('When given a workitem stores it into database', () => {
    let workitem = new WorkItem();
    const itemName = "Testitem"

    workitem.name = itemName;
    _nedbStore.SaveWorkItem(workitem);

    _nodeExprDB.count({ name: itemName }, (err, count) => {
      expect(count).toBe(1);
    });
  });
});