import { IWorklog } from './IWorkLog';
import { IWorkitem as IWorkitem } from './IWorkitem';
import { ArgumentUtility } from '../Arguments/ArgumentUtility';

export class Workitem implements IWorkitem {

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    ArgumentUtility.checkHasContent('value', value);
    this._name = value;
  }
  public worklogs: IWorklog[];
  private _name: string;

  constructor(name: string) {
    ArgumentUtility.checkHasContent('name', name);
    this._name = name;
    this.worklogs = new Array<IWorklog>();
  }

  public getWorkedTimeInSeconds(): number {
    let sumOfWorkInSeconds = 0;
    this.worklogs.forEach(worklog => { sumOfWorkInSeconds += worklog.getWorkedTimeInSeconds(); });
    return sumOfWorkInSeconds;
  }
}
