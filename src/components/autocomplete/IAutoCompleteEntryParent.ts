import AutoCompleteEntry from './AutoCompleteEntry';

export interface IAutoCompleteEntryParent {
  onEntrySelected(entry: AutoCompleteEntry): void;
  onEscapePressed(): void;
}
