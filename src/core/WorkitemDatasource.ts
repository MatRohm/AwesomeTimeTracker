import AutoCompleteEntry from '../components/autocomplete/autocompleteEntry/AutocompleteEntry';
import IAutocompleteDatasource from '../components/autocomplete/IAutocompleteDataSource';
import { ArgumentUtility } from './Arguments/ArgumentUtility';
import { IWorkitem } from './businessModel/IWorkitem';
import { IWorkitemStore } from './IWorkitemStore';

export class WorkitemDataSource implements IAutocompleteDatasource {
  private _store: IWorkitemStore;

  constructor(store: IWorkitemStore) {
    ArgumentUtility.checkDefined('store', store);
    this._store = store;
  }

  public getEntries(filter: string): AutoCompleteEntry[] {
    const workitems = this._store.getWorkItemsByName(filter);

    const autoCompleteEntries = new Array<AutoCompleteEntry>();
    workitems.then(o => o.forEach(o => {
      const entry = this.CreateEntry(o);
      autoCompleteEntries.push(entry);
    }));

    return autoCompleteEntries;
  }

  public CreateEntry(store: IWorkitem): AutoCompleteEntry {
    const entry = new AutoCompleteEntry(store.name, store.name);
    return entry;
  }
}
