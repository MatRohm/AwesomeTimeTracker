import IAutocompleteDataSource from '../../../components/autocomplete/IAutocompleteDataSource';
import AutoCompleteEntry from '../../../components/autocomplete/autocompleteEntry/AutocompleteEntry';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Autocomplete from '../../../components/autocomplete/Autocomplete';
import Event from '../../Event';
import { Mock, It, Times, ExpectedGetPropertyExpression } from 'moq.ts';
import IAutocompleteDatasource from '../../../components/autocomplete/IAutocompleteDataSource';

export class AutoCompleteControlObject {
  // tslint:disable-next-line:no-any
  private _autocomplete: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  private _entrySelector = '.autocompleteEntry';
  private _inputSelector = '.autocompleteInput';
  private _entryContainerSelector = '.autocompleteEntryContainer';
  private _dataSource: IAutocompleteDatasource;
  private _mock: Mock<IAutocompleteDataSource>;

  constructor() {
    this._dataSource = this.createDataSourceMock();

    this._autocomplete = mount(<Autocomplete dataSource={this._dataSource} />);
    this._autocomplete.setProps(this._dataSource);
  }
  public pressEscape(): void {
    this.pressKey('Escape');
  }

  public pressReturn(): void {
    this.pressKey('Return');
  }

  public tryUnmount(): void {
    if (this._autocomplete) {
      this._autocomplete.unmount();
    }
  }

  public getDisplayStyleOfEntryContainer(): string {
    // This is a workaround: the problem is when style is set over React Ref the value of the style property itself
    // doesnt gets added at the enzyme react wrapper. Which is unfortunate but cant be changed at the moment.

    const displayOfEntryContainer = this._autocomplete.find(this._entryContainerSelector).html();
    const regex = /(display:)\s*/;
    const split = displayOfEntryContainer.split(regex);
    const almostThere = split[split.length - 1];
    const value = almostThere.substr(0, almostThere.indexOf(';'));
    return value;
  }

  public enterTextIntoInput(value: string): void {
    const simulatedEventArgs = { target: { value } };
    this._autocomplete.find(this._inputSelector).simulate(Event.change, simulatedEventArgs);
  }

  public clickFirstSerchResult(): void {
    this._autocomplete.find(this._entrySelector).simulate(Event.click);
  }

  public getFoundEntriesCount(): number {
    const countOfListEntries = this._autocomplete.find(this._entrySelector).length;
    return countOfListEntries;
  }

  public getTextOfTextBox(): string {
    const textOfInput = this._autocomplete.find(this._inputSelector).props().value;
    return textOfInput.toString();
  }

  public getDataItemIdOfTextBox(): string {
    const props: any = this._autocomplete.find(this._inputSelector).props();
    const value = props['data-selected-id'];
    return value.toString();
  }

  public getDataItemIDsOfEntries(): string[] {
    const ids = new Array<string>();

    this._autocomplete
      .find(this._entrySelector)
      .forEach(o => {
        const props: any = o.props();
        ids.push(props['data-selected-id']);
      });

    return ids;
  }

  public hasSaveWorkItemBeenCalled(): void {
    this._mock.verify(instance => instance.saveWorkitem, Times.Once());
  }

  public hasSaveWorkItemNotBeenCalled(): void {
    this._mock.verify(instance => instance.saveWorkitem, Times.Never());
  }

  private createDataSourceMock(): IAutocompleteDataSource {
    this._mock = new Mock<IAutocompleteDataSource>();

    this._mock.setup(o => o.getEntries('test')).returns([
      new AutoCompleteEntry('1', 'test'),
      new AutoCompleteEntry('2', 'second test')
    ]);

    this._mock.setup(o => o.getEntries('t')).returns([new AutoCompleteEntry('1', 'test')]);
    this._mock.setup(o => o.saveWorkitem(It.IsAny())).callback(() => { return; });

    return this._mock.object();
  }

  private pressKey(keyName: string) {
    this._autocomplete.find(this._inputSelector).simulate(Event.keyDown, { key: keyName });
  }
}
