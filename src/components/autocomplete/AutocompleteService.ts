import IAutocompleteDataSource from './IAutocompleteDataSource';
import AutoCompleteEntry from './AutoCompleteEntry';

export class AutocompleteService {
  private _dataSource: IAutocompleteDataSource;

  constructor(dataSource: IAutocompleteDataSource) {
    this._dataSource = dataSource;
  }

  public searchEntries(filterText: string): AutoCompleteEntry[] {
    return this._dataSource.getEntries(filterText);
  }
}
