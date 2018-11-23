import * as React from 'react';
import { serviceInstance } from './CurrentWorkItemService';

export default class CurrentWorkItem extends React.Component {

  public render() {
    return <div>
      <span>Current Item: </span> <input type='text' onInput={e => serviceInstance.GetWorkItems(e.currentTarget.value)}></input>
    </div >;
  }
}
