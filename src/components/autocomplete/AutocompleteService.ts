import IDataSource from './IDataSource';
import AutoCompleteEntry from './AutoCompleteEntry';

export class AutocompleteService {
  private _dataSource: IDataSource;

  constructor(dataSource: IDataSource) {
    this._dataSource = dataSource;
  }

  public searchEntries(filterText: string): AutoCompleteEntry[] {
    return this._dataSource.GetEntries(filterText);
  }
}
