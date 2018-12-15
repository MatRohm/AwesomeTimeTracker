import * as React from 'react';
import IAutocompleteDataSource from './IAutocompleteDataSource';
import { AutocompleteService } from './AutocompleteService';
import AutoCompleteEntry from './AutoCompleteEntry';
import './Autocomplete.css';
import { ArgumentUtility } from '../../shared/Arguments/ArgumentUtility';

export default class Autocomplete extends React.Component<{ dataSource: IAutocompleteDataSource }, { inputValue: { text: string, id: string }, entries: AutoCompleteEntry[] }> {
  public _inputText: React.RefObject<HTMLInputElement>;
  private _service: AutocompleteService;
  private _autocompleteEntryContainer: React.RefObject<HTMLUListElement>;

  constructor(props: { dataSource: IAutocompleteDataSource }) {
    super(props);
    ArgumentUtility.CheckDefined('props.dataSource', props.dataSource);
    this._service = new AutocompleteService(props.dataSource);
    this.state = {
      inputValue: { text: '', id: '' },
      entries: []
    };

    this._autocompleteEntryContainer = React.createRef();
    this._inputText = React.createRef();
  }

  public componentDidMount() {
    this._autocompleteEntryContainer.current.style.display = 'none';
  }

  public render() {
    return <div className='autocompleteContainer'>

      <input
        ref={this._inputText}
        type='text'
        placeholder='Start typing text...'
        onChange={this.onChange.bind(this)}
        value={this.state.inputValue.text}
        data-item-id={this.state.inputValue.id}
        className='autocompleteInput'
        id='autocompleteInput' />

      <ul
        className='autocompleteEntryContainer'
        ref={this._autocompleteEntryContainer}>

        {this.renderAutocompleteEntries()}
      </ul>
    </div >;
  }

  private onChange(eventArgs: React.ChangeEvent<HTMLInputElement>) {
    const searchText = eventArgs.target.value;
    const entries = this._service.searchEntries(searchText);
    this.setState({ inputValue: { text: searchText, id: '' }, entries });
  }

  private renderAutocompleteEntries(): JSX.Element[] {
    const hasEntries = this.state.entries && this.state.entries.length > 0;

    if (hasEntries) {
      this.calculatePosition();
      this._autocompleteEntryContainer.current.style.display = 'block';
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
      onClick={this.onClick.bind(this)}
      data-item-id={entry.id}>

      {entry.name}
    </li>;
  }

  private onClick(eventArgs: React.MouseEvent<HTMLLIElement>) {
    const text = eventArgs.currentTarget.innerHTML;
    const id = eventArgs.currentTarget.getAttribute('data-item-id');

    this._autocompleteEntryContainer.current.style.display = 'none';
    this.setState({ inputValue: { text, id }, entries: [] });
  }
}
