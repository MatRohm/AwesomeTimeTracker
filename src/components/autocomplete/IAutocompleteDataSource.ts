import AutoCompleteEntry from './AutoCompleteEntry';

export default interface IAutocompleteDatasource {
  GetEntries(filter: string): AutoCompleteEntry[];
}
