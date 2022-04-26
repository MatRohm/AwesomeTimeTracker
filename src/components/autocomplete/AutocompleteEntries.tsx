import React from 'react';
import { AutocompleteEntry } from './Autcomplete';

export type AutoCompleteEntriesProps = {
  entries: AutocompleteEntry[];
};

export const AutoCompleteEntries = (props: AutoCompleteEntriesProps): JSX.Element => {
  return props.entries?.length ? (
    <ul>
      {props.entries.map(entry => <li key={entry.name}>{entry.name}</li>)}
    </ul>
  ) : (<></>);
};