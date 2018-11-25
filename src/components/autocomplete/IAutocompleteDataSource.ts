import AutoCompleteEntry from './AutoCompleteEntry';

export default interface IAutocompleteDataSource {
  GetEntries(filter: string): AutoCompleteEntry[];
}
