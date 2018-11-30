import * as React from 'react';
import IAutocompleteDataSource from './IAutocompleteDataSource';
import { AutocompleteService } from './AutocompleteService';
import AutoCompleteEntry from './AutoCompleteEntry';
import { ReactComponentWrapper } from '../currentWorkItem/ReactComponentWrapper';
import './Autocomplete.css';

export default class Autocomplete extends React.Component<{ dataSource: IAutocompleteDataSource }, { inputValue: string, entries: AutoCompleteEntry[] }> {
  private _service: AutocompleteService;

  constructor(props: { dataSource: IAutocompleteDataSource }) {
    super(props);
    console.log('props', props);
    this._service = new AutocompleteService(props.dataSource);
    this.state = {
      inputValue: '',
      entries: []
    };
  }

  public render() {
    return <div className='autocompleteContainer'>
      <label htmlFor='autocomplete' className='autocompleteLabel'>Label: </label>
      <input type='text' placeholder='Start typing text...' onInput={e => this.searchEntries(e.currentTarget.value)} value={this.state.inputValue} onChange={(e) => {
        this.setState({
          inputValue: e.currentTarget.value
        });
      }} className='autocompleteInput' id='autocompleteInput' />
      <ul className='autocompleteEntryContainer'>
        {this.renderAutocompleteEntries()}
      </ul>
    </div>;
  }

  private searchEntries(filterText: string) {
    const entries = this._service.searchEntries(filterText);
    this.setState({ entries });
  }

  private renderAutocompleteEntries(): JSX.Element[] {
    const hasEntries = this.state.entries && this.state.entries.length > 0;

    if (hasEntries) {
      return this.state.entries.map((entry) => this.renderAutocompleteEntry(entry));
    }
  }

  private renderAutocompleteEntry(entry: AutoCompleteEntry): JSX.Element {
    return <li className='autocompleteEntry' key={entry.id} onClick={e => this.setState({ inputValue: e.currentTarget.innerHTML, entries: [] })}>{entry.name}</li>;
  }
}
