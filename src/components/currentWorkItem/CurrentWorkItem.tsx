import * as React from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { Shoes } from './Shoes';
import IDataSource from '../autocomplete/IDataSource';
import { ReactComponentWrapper } from './ReactComponentWrapper';

export default class CurrentWorkItem extends React.Component {

  public render() {

    const autoCompleteDataSource: IDataSource = new Shoes();
    console.log('autoCompleteDataSource', autoCompleteDataSource);

    return <div>
      <span>Current Item: </span> <Autocomplete {...new ReactComponentWrapper<IDataSource>(autoCompleteDataSource)}></Autocomplete>
    </div >;
  }
}
