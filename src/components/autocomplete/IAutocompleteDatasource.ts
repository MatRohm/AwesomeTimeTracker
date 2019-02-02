import AutoCompleteEntry from './autocompleteEntry/AutocompleteEntry';

export default interface IAutocompleteDatasource {
  getEntries(filter: string): AutoCompleteEntry[];
}
