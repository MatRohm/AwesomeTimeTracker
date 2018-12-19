import { Workitem } from '../../../shared/businessModel/Workitem';
import { IWorklog } from '../../../shared/businessModel/IWorkLog';
import * as TypeMoq from 'typemoq';

describe('Checks whether Workitem works correctly', () => {
  it('When ctor is called with null, undefined or whitespace it throws an exception', () => {
    expect(() => new Workitem(null)).toThrow();
    expect(() => new Workitem(undefined)).toThrow();
    expect(() => new Workitem(' ')).toThrow();
  });

  it('When setter of name is called with null, undefined or whitespace it throws an exception', () => {
    const workitem = new Workitem('sample');
    expect(() => workitem.name = null).toThrow();
    expect(() => workitem.name = undefined).toThrow();
    expect(() => workitem.name = ' ').toThrow();
  });

  it('When no work is logged getWorkedTimeInSeconds() returns 0', () => {
    const workitem = new Workitem('sample');
    expect(workitem.getWorkedTimeInSeconds()).toBe(0);
  });

  it('When work is logged getWorkedTimeInSeconds() returns the sum of the logs', () => {
    const workitem = new Workitem('sample');
    workitem.worklogs.push(getWorklogMock(10));
    workitem.worklogs.push(getWorklogMock(20));
    workitem.worklogs.push(getWorklogMock(5));
    expect(workitem.getWorkedTimeInSeconds()).toBe(35);
  });

  function getWorklogMock(seconds: number): IWorklog {
    const mock = TypeMoq.Mock.ofType<IWorklog>();
    mock.setup(o => o.getWorkedTimeInSeconds()).returns((val) => seconds);
    return mock.object;
  }
});
