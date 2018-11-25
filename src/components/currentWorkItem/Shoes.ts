import IDataSource from '../autocomplete/IDataSource';
import AutoCompleteEntry from '../autocomplete/AutoCompleteEntry';

export class Shoes implements IDataSource {

  public func: any = this.GetEntries;

  public GetEntries(filter: string): AutoCompleteEntry[] {
    return [
      new AutoCompleteEntry('1', 'Prade'),
      new AutoCompleteEntry('2', 'Jimmy Joe1'),
    ];
  }
}
