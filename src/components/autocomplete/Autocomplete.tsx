import * as React from 'react';
import IDataSource from './IDataSource';
import { AutocompleteService } from './AutocompleteService';
import AutoCompleteEntry from './AutoCompleteEntry';
import { ReactComponentWrapper } from '../currentWorkItem/ReactComponentWrapper';

export default class Autocomplete extends React.Component<ReactComponentWrapper<IDataSource>, { inputValue: string, entries: AutoCompleteEntry[] }> {
  private _service: AutocompleteService;

  constructor(props: ReactComponentWrapper<IDataSource>) {
    super(props);
    console.log('props', props);
    this._service = new AutocompleteService(props.wrappedObject);
    this.state = {
      inputValue: '',
      entries: []
    };
  }

  public render() {
    return <div>
      <input type='text' placeholder='Start typing text...' onInput={e => this.searchEntries(e.currentTarget.value)} value={this.state.inputValue} onChange={(e) => {
        this.setState({
          inputValue: e.currentTarget.value
        });
      }} />
      <ul>
        {this.renderAutocompleteEntries()}
      </ul>
    </div>;
  }

  private searchEntries(filterText: string) {
    const entries = this._service.searchEntries(filterText);
    this.setState({ entries });
  }

  private renderAutocompleteEntries(): JSX.Element[] {
    if (this.state.entries && this.state.entries.length > 0) {
      return this.state.entries.map((entry) => <li key={entry.id}
        onClick={(e) => {
          this.setState({
            inputValue: e.currentTarget.innerHTML
          });

        }}
      >{entry.name}</li>);
    }

  }
}
