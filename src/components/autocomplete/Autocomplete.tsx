import * as React from 'react';
import IAutocompleteDataSource from './IAutocompleteDataSource';
import { AutocompleteService } from './AutocompleteService';
import AutoCompleteEntry from './autocompleteEntry/AutocompleteEntry';
import './Autocomplete.css';
import { ArgumentUtility } from '../../core/Arguments/ArgumentUtility';
import AutoCompleteEntryControl from './autocompleteEntry/AutocompleteEntryControl';
import { IAutoCompleteEntryParent } from './IAutoCompleteEntryParent';

export default class Autocomplete
  extends React.Component<{ dataSource: IAutocompleteDataSource }, { inputValue: { text: string, id: string }, entries: AutoCompleteEntry[] }>
  implements IAutoCompleteEntryParent {

  public _inputText: React.RefObject<HTMLInputElement>;
  private _service: AutocompleteService;
  private _autocompleteEntryContainer: React.RefObject<HTMLUListElement>;

  constructor(props: { dataSource: IAutocompleteDataSource }) {
    super(props);
    ArgumentUtility.checkDefined('props.dataSource', props.dataSource);
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
        onChange={this.oninputChange.bind(this)}
        value={this.state.inputValue.text}
        data-selected-id={this.state.inputValue.id}
        className='autocompleteInput'
        id='autocompleteInput'
        onKeyDown={this.handleKeyDown.bind(this)} />

      <ul
        className='autocompleteEntryContainer'
        ref={this._autocompleteEntryContainer}>

        {this.renderAutocompleteEntries()}
      </ul>
    </div >;
  }

  public onEntrySelected(entry: AutoCompleteEntry): void {
    this.setState({ inputValue: { id: entry.id, text: entry.name }, entries: new Array<AutoCompleteEntry>() });
  }

  public onEscapePressed(): void {
    this.setState({ entries: new Array<AutoCompleteEntry>() });
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    const eventKey = event.key.toUpperCase();

    console.log(`eventyKey = ${eventKey}`);

    if (eventKey === 'ESCAPE') {
      this.onEscapePressed();
    }
    else if (eventKey === 'RETURN') {
      this.onReturnPressed();
    }
    else if (eventKey === 'ARROWDOWN') {
      this.onArrowDownPressed();
    }
  }

  public onArrowDownPressed(): void {
    if (!this.hasEntriesFound()) {
      return;
    }

    this.focusNextElement();
  }

  private focusNextElement(): void {
    let element: HTMLLIElement
    element = document.querySelector('li.autocompleteEntry:focus');

    if (!element) {
      element = document.querySelector('li.autocompleteEntry');
    }
    else {
      element = document.querySelector('li.autocompleteEntry:focus~li.autocompleteEntry');

      if (!element)
        return;
    }

    element.focus();
  }


  private onReturnPressed(): void {
    this._service.addEntry(this._inputText.current.value);
  }

  private oninputChange(eventArgs: React.ChangeEvent<HTMLInputElement>) {
    const searchText = eventArgs.target.value;
    const entries = this._service.searchEntries(searchText);
    this.setState({ inputValue: { text: searchText, id: '' }, entries });
  }

  private renderAutocompleteEntries(): JSX.Element[] {
    if (this.hasEntriesFound()) {
      this.calculatePosition();
      this._autocompleteEntryContainer.current.style.display = 'block';
      return this.state.entries.map((currentEntry) => <AutoCompleteEntryControl key={currentEntry.id} entry={currentEntry} parent={this} />);
    } else {
      if (this._autocompleteEntryContainer.current) {
        this._autocompleteEntryContainer.current.style.display = 'none';
      }
    }
  }

  private hasEntriesFound(): boolean {
    return this.state.entries && this.state.entries.length > 0;
  }

  private calculatePosition() {
    const container = this._autocompleteEntryContainer.current;
    const input = this._inputText.current;
    container.style.left = input.style.left;
    container.style.top = input.style.top + input.offsetHeight;
  }
}
