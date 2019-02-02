export default class AutoCompleteEntry {
  public name: string;
  public id: string;

  constructor(id: string, name: string) {
    this.name = name;
    this.id = id;
  }
}
