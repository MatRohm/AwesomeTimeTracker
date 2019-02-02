import IAutocompleteDataSource from '../autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../autocomplete/autocompleteEntry/AutocompleteEntry';

export class Shoes implements IAutocompleteDataSource {

  public func: any = this.getEntries;

  public getEntries(filter: string): AutoCompleteEntry[] {
    return [
      new AutoCompleteEntry('1', 'Prade'),
      new AutoCompleteEntry('2', 'Jimmy Joe1'),
    ];
  }
}
