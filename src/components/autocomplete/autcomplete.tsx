import React from 'react';
import { AutoCompleteEntries } from './autocompleteEntries';
import { AutocompleteSource } from './autocompleteSource';

type AutoCompleteProps = {
  name: string,
  label?: string,
  autocompleteSource: AutocompleteSource
};

export interface AutocompleteEntry {
  name: string;
}

export const AutoComplete = (props: AutoCompleteProps): JSX.Element => {
  const [text, setText] = React.useState<string>('');
  const [entries, setEntries] = React.useState<AutocompleteEntry[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setText(value);
    if(value == '') {
      setEntries([]);
    }
    else{
      const entriesFound = props.autocompleteSource.search(value);
      setEntries(entriesFound);
    }
  };

  return( 
    <span 
      id={'autocomplete-' + props.name + '-container'} 
      className="autcomplete-container">

      {props.label ? <label data-testid='autocomplete-label'>{props.label}</label> : ''}
    
      <input 
        type="text" 
        id={'autocomplete-' + props.name + '-textbox'} 
        value={text} 
        data-testid="autocomplete-input" 
        className="autocomplete-input" 
        onChange={onChange} />

      <AutoCompleteEntries entries={entries}/>
    </span>
  );
};
