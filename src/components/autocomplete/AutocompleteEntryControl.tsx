import React from 'react';
import AutoCompleteEntry from './AutoCompleteEntry';
import { IAutoCompleteEntryParent } from './IAutoCompleteEntryParent';

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
    if (event.key.toUpperCase() === 'ESCAPE') {
      this.props.parent.onEscapePressed();
    }
  }
}
