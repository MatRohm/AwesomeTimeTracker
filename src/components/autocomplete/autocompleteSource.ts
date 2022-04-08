export type AutocompleteSource<T> = {
  getValues(): Array<T>
  search(searchValue: string): T[];
};