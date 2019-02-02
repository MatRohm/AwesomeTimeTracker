import * as React from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { Shoes } from './Shoes';

export default class CurrentWorkitem extends React.Component {

  public render() {
    return <div>
      <Autocomplete dataSource={new Shoes()} />
    </div >;
  }
}
