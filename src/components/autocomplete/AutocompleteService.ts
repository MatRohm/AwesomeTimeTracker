import IAutocompleteDataSource from './IAutocompleteDataSource';
import AutoCompleteEntry from './autocompleteEntry/AutocompleteEntry';
import { Workitem } from '../../core/businessModel/Workitem';
import { NOTIMP } from 'dns';
import { ArgumentUtility } from '../../core/Arguments/ArgumentUtility';

export class AutocompleteService {
  private _dataSource: IAutocompleteDataSource;

  constructor(dataSource: IAutocompleteDataSource) {
    this._dataSource = dataSource;
  }
  public addEntry(inputText: string): void {
    if (!inputText) {
      return;
    }

    const workItem = new Workitem(inputText);
    return this._dataSource.saveWorkitem(workItem);
  }

  public searchEntries(filterText: string): AutoCompleteEntry[] {
    return this._dataSource.getEntries(filterText);
  }
}
