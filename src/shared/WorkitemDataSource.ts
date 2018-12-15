import IAutocompleteDataSource from '../components/autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../components/autocomplete/AutoCompleteEntry';

export class WorkitemDataSource implements IAutocompleteDataSource {
  public GetEntries(filter: string): AutoCompleteEntry[] {
    throw new Error('Method not implemented.');
  }
}
