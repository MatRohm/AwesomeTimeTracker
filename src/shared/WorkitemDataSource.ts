import IAutocompleteDataSource from '../components/autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../components/autocomplete/AutoCompleteEntry';
import { workItemStore } from './WorkitemStore';
import { IWorkItemStore } from './IWorkItemStore';
import { IWorkItem } from './businessModell/IWorkItem';

export class WorkitemDataSource implements IAutocompleteDataSource {
  private _store: IWorkItemStore;

  constructor(store?: IWorkItemStore) {
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

  public CreateEntry(store: IWorkItem): AutoCompleteEntry {
    const entry = new AutoCompleteEntry(store.name, store.name);
    return entry;
  }
}
