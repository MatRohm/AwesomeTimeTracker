import AutoCompleteEntry from './AutoCompleteEntry';

export default interface IDataSource {
  GetEntries(filter: string): AutoCompleteEntry[];
}
