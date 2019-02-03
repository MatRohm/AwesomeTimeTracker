import { IAutoCompleteEntryParent } from '../../../../components/autocomplete/IAutoCompleteEntryParent';
import { ReactWrapper, mount } from 'enzyme';
import AutoCompleteEntry from '../../../../components/autocomplete/autocompleteEntry/AutocompleteEntry';
import React from 'react';
import AutoCompleteEntryControl from '../../../../components/autocomplete/autocompleteEntry/AutocompleteEntryControl';
import Event from '../../../Event';

export class AutoCompleteEntryControlTestHelper {
  // tslint:disable-next-line:no-any
  private _autocomplete: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  constructor(entry: AutoCompleteEntry, parent: IAutoCompleteEntryParent) {
    this._autocomplete = mount(<AutoCompleteEntryControl entry={entry} parent={parent} />);
  }
  public enter(): void {
    this._autocomplete.simulate(Event.keyDown, { key: 'Enter' });
  }
  public click(): void {
    this._autocomplete.simulate(Event.click);
  }

  public tryUnmount(): void {
    if (this._autocomplete) {
      this._autocomplete.unmount();
    }
  }
}
