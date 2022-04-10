import { AutocompleteEntry } from './Autcomplete';

export interface AutocompleteSource {
  search(searchValue: string): AutocompleteEntry[];
}