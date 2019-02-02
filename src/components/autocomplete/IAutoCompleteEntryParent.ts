import AutoCompleteEntry from './autocompleteEntry/AutocompleteEntry';

export interface IAutoCompleteEntryParent {
  onEntrySelected(entry: AutoCompleteEntry): void;
  onEscapePressed(): void;
}
