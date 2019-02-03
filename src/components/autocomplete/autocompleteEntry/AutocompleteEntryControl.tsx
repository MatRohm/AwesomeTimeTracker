import React from 'react';
import AutoCompleteEntry from './AutocompleteEntry';
import { IAutoCompleteEntryParent } from '../IAutoCompleteEntryParent';
import './AutocompleteEntry.css';
import { ArgumentUtility } from '../../../core/Arguments/ArgumentUtility';

export default class AutoCompleteEntryControl extends React.Component<{ entry: AutoCompleteEntry, parent: IAutoCompleteEntryParent }> {
  constructor(props: { entry: AutoCompleteEntry, parent: IAutoCompleteEntryParent }) {
    super(props);
  }

  public render(): JSX.Element {
    return <li
      className='autocompleteEntry'
      key={this.props.entry.id}
      onClick={this.onClick.bind(this)}
      tabIndex={1}
      data-selected-id={this.props.entry.id}
      onKeyDown={this.handleKeyDown.bind(this)}>
      {this.props.entry.name}
    </li >;
  }

  private onClick(eventArgs: React.MouseEvent<HTMLLIElement>) {
    this.props.parent.onEntrySelected(this.props.entry);
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    ArgumentUtility.checkDefined('event', event);
    ArgumentUtility.checkDefined('event.key', event.key);

    const key = event.key.toUpperCase();

    if (key === 'ESCAPE') {
      this.props.parent.onEscapePressed();
    }

    if (key === 'ENTER') {
      this.props.parent.onEntrySelected(this.props.entry);
    }
  }
}
