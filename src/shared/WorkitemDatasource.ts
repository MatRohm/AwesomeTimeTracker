import IAutocompleteDataSource from '../components/autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../components/autocomplete/AutoCompleteEntry';
import { workItemStore } from './WorkitemStore';
import { IWorkitemStore } from './IWorkitemStore';
import { IWorkitem } from './businessModel/IWorkitem';

export class WorkitemDataSource implements IAutocompleteDataSource {
  private _store: IWorkitemStore;

  constructor(store?: IWorkitemStore) {
    if (store) {
      this._store = store;
    } else {
      this._store = workItemStore;
    }
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
