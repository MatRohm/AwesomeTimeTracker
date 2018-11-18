import * as React from 'react';
import { CurrentWorkItemService, serviceInstance } from './CurrentWorkItemService';

export default class CurrentWorkItem extends React.Component {
  public service: CurrentWorkItemService;

  constructor() {
    super(null);
    this.service = serviceInstance;
  }

  public render() {
    return <div>
      <span>Current Item: </span> <input type='text' onInput={e => this.service.GetWorkItems(e.currentTarget.value)}></input>
    </div >;
  }
}
