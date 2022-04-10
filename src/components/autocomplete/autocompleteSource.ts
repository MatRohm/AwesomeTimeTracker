import { AutocompleteEntry } from './autcomplete';

export interface AutocompleteSource<T extends AutocompleteEntry> {
  getValues(): Array<T>
  search(searchValue: string): T[];
}