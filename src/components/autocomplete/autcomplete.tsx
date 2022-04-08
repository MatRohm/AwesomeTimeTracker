import React, { useState } from 'react';
import { AutocompleteSource } from './autocompleteSource';

type AutoCompleteProps<T extends AutocompleteEntry> = {
  name: string,
  label?: string,
  autocompleteSource: AutocompleteSource<T>
};

export interface AutocompleteEntry {
  name: string;
}

export const AutoComplete = <T extends AutocompleteEntry>(props: AutoCompleteProps<T>) => {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState<T[]>([]);

  return <span id={'autocomplete-' + props.name +'-container'} className="autcomplete-container">
    {props.label ? <label>{props.label} </label> : ''}
    
    <input type="text" id={'autocompete-' + props.name + '-textbox'} value={text} className="autocomplete-textbox" onChange={event => {
      const value = event.target.value;
      const entries = props.autocompleteSource.search(value);

      if(value == '') {
        setEntries([]);
      }
      else{
        setEntries(entries);
      }

      setText(value);
    }
    } />

    {entries.length > 0 && <ul>{entries.map(entry => <li>{entry.name}</li>)}</ul>}
  </span>;
};