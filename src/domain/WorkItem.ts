import { AutocompleteEntry } from '../components/autocomplete/Autcomplete';

export class WorkItem implements AutocompleteEntry {
  private _name: string;
  private _workItems: WorkItem[];

  public constructor(name: string, workItems?: WorkItem[]) {
    this._name = name;
    this._workItems = workItems ?? [];
  }

  public get name(): string {
    return this._name;
  } 
  public set name(value: string) {
    this._name = value;
  }

  public get workItems(): WorkItem[] {
    return this._workItems;
  }
}