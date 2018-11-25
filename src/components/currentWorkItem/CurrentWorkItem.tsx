import * as React from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { Shoes } from './Shoes';
import IAutocompleteDataSource from '../autocomplete/IAutocompleteDataSource';
import { ReactComponentWrapper } from './ReactComponentWrapper';

export default class CurrentWorkItem extends React.Component {

  public render() {

    const autoCompleteDataSource: IAutocompleteDataSource = new Shoes();
    console.log('autoCompleteDataSource', autoCompleteDataSource);

    return <div>
      <span>Current Item: </span> <Autocomplete {...new ReactComponentWrapper<IAutocompleteDataSource>(autoCompleteDataSource)}></Autocomplete>
    </div >;
  }
}
