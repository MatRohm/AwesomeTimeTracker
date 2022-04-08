import { WorkItem } from './WorkItem';

export class WorkLog {
  private _workItem: WorkItem;
  private _start?: Date;
  private _end?: Date | undefined;

  public constructor(workItem: WorkItem) {
    this._workItem = workItem;
  }

  public get workItem(): WorkItem {
    return this._workItem;
  }

  public get start(): Date | undefined {
    return this._start;
  }
  public set start(value: Date | undefined) {
    this._start = value;
  }

  public get end(): Date | undefined {
    return this._end;
  }
  public set end(value: Date | undefined) {
    this._end = value;
  }
}
