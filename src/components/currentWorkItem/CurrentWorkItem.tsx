import * as React from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { Shoes } from './Shoes';
import IAutocompleteDataSource from '../autocomplete/IAutocompleteDataSource';

export default class CurrentWorkItem extends React.Component {

  public render() {

    const autoCompleteDataSource: IAutocompleteDataSource = new Shoes();
    console.log('autoCompleteDataSource', autoCompleteDataSource);

    return <div>
      <Autocomplete dataSource={new Shoes()} />
    </div >;
  }
}
