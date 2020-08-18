import IAutocompleteDataSource from '../autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../autocomplete/autocompleteEntry/AutocompleteEntry';
import { Workitem } from '../../core/businessModel/Workitem';

export class Shoes implements IAutocompleteDataSource {
  public func: any = this.getEntries;

  public saveWorkitem(entry: Workitem): void {
    return;
  }

  public getEntries(filter: string): AutoCompleteEntry[] {
    return [
      new AutoCompleteEntry('1', 'Prade'),
      new AutoCompleteEntry('2', 'Jimmy Joe1'),
    ];
  }
}
