import AutoCompleteEntry from './AutoCompleteEntry';

export default interface IAutocompleteDatasource {
  getEntries(filter: string): AutoCompleteEntry[];
}
