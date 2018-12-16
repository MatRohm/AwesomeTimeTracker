import AutoCompleteEntry from '../components/autocomplete/AutoCompleteEntry';
import IAutocompleteDatasource from '../components/autocomplete/IAutocompleteDataSource';
import { ArgumentUtility } from './Arguments/ArgumentUtility';
import { IWorkitem } from './businessModel/IWorkitem';
import { IWorkitemStore } from './IWorkitemStore';

export class WorkitemDataSource implements IAutocompleteDatasource {
  private _store: IWorkitemStore;

  constructor(store: IWorkitemStore) {
    ArgumentUtility.CheckDefined('store', store);
    this._store = store;
  }

  public GetEntries(filter: string): AutoCompleteEntry[] {
    const workitems = this._store.GetWorkItemsByName(filter);

    const autoCompleteEntries = new Array<AutoCompleteEntry>();
    workitems.forEach(o => {
      const entry = this.CreateEntry(o);
      autoCompleteEntries.push(entry);
    });

    return autoCompleteEntries;
  }

  public CreateEntry(store: IWorkitem): AutoCompleteEntry {
    const entry = new AutoCompleteEntry(store.name, store.name);
    return entry;
  }
}
