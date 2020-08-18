import AutoCompleteEntry from './autocompleteEntry/AutocompleteEntry';
import { Workitem } from '../../core/businessModel/Workitem';

export default interface IAutocompleteDatasource {
  saveWorkitem(entry: Workitem): void;
  getEntries(filter: string): AutoCompleteEntry[];
}
