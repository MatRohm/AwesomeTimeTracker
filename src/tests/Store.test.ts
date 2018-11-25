import { workItemStore } from '../shared/Store';
import { WorkItem } from '../shared/WorkItem';
import * as Nedb from 'nedb';


describe('Integration test: GetWorkItemsByName', () => {
  it('When given null, returns all defined values', () => {
    let values = workItemStore.GetWorkItemsByName(null);
  });

  it('When given "ABC" returns all worklogs with "ABC" in its name', () => {
    let values = workItemStore.GetWorkItemsByName('ABC');
  });
});

describe('Integration test: SaveWorkItem', () => {
  it('When given null throws exceptions', () => {
    expect(() => workItemStore.SaveWorkItem(null)).toThrowError();
  });

  it('When given undefined throws exceptions', () => {
    expect(() => workItemStore.SaveWorkItem(undefined)).toThrowError();
  });

  it('When given a workitem with null name, throws excpetion', () => {
    let workitem = new WorkItem();
    expect(() => workItemStore.SaveWorkItem(workitem)).toThrowError();
  });

  it('When given a workitem stores it into database', () => {
    let workitem = new WorkItem();
    workitem.name = "Testitem";
    workItemStore.SaveWorkItem(workitem);

    this._workItemDatabase = new Nedb('./workItemDatabase.db');
    this._workItemDatabase.loadDatabase();
    this.find(item => {

    });
  });
});