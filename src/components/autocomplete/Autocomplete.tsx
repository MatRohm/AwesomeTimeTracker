import * as React from 'react';
import IAutocompleteDataSource from './IAutocompleteDataSource';
import { AutocompleteService } from './AutocompleteService';
import AutoCompleteEntry from './AutoCompleteEntry';
import './Autocomplete.css';
import { ArgumentUtility } from '../../shared/Arguments/ArgumentUtility';

export default class Autocomplete extends React.Component<{ dataSource: IAutocompleteDataSource }, { inputValue: string, entries: AutoCompleteEntry[] }> {
  public _inputText: React.RefObject<HTMLInputElement>;
  private _service: AutocompleteService;
  private _autocompleteEntryContainer: React.RefObject<HTMLUListElement>;

  constructor(props: { dataSource: IAutocompleteDataSource }) {
    super(props);
    ArgumentUtility.CheckDefined('props.dataSource', props.dataSource);
    console.log('props', props);
    this._service = new AutocompleteService(props.dataSource);
    this.state = {
      inputValue: '',
      entries: []
    };

    this._autocompleteEntryContainer = React.createRef();
    this._inputText = React.createRef();
  }

  public render() {
    return <div className='autocompleteContainer'>

      <input
        ref={this._inputText}
        type='text'
        placeholder='Start typing text...'
        onChange={this.handleOnchange.bind(this)}
        value={this.state.inputValue}
        className='autocompleteInput' id='autocompleteInput' />

      <ul className='autocompleteEntryContainer' ref={this._autocompleteEntryContainer}>
        {this.renderAutocompleteEntries()}
      </ul>
    </div>;
  }

  private handleOnchange(eventArgs: React.ChangeEvent<HTMLInputElement>) {
    const searchText = eventArgs.target.value;
    const entries = this._service.searchEntries(searchText);
    this.setState({ inputValue: searchText, entries });
  }

  private renderAutocompleteEntries(): JSX.Element[] {
    const hasEntries = this.state.entries && this.state.entries.length > 0;

    if (hasEntries) {
      this.calculatePosition();

      return this.state.entries.map((entry) => this.renderAutocompleteEntry(entry));
    }
  }

  private calculatePosition() {
    const container = this._autocompleteEntryContainer.current;
    const input = this._inputText.current;
    container.style.left = input.style.left;
    container.style.top = input.style.top + input.offsetHeight;
  }

  private renderAutocompleteEntry(entry: AutoCompleteEntry): JSX.Element {
    return <li
      className='autocompleteEntry'
      key={entry.id}
      onClick={this.handleOnClick.bind(this)}>
      {entry.name}
    </li>;
  }

  private handleOnClick(eventArgs: React.MouseEvent<HTMLLIElement>) {
    const value = eventArgs.currentTarget.innerHTML;
    this.setState({ inputValue: value });
  }
}
