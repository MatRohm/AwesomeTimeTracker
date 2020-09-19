import * as React from 'react';
import Autocomplete from '../autocomplete/Autocomplete';
import { Shoes } from './Shoes';
import { StartButton } from '../startButton/StartButton';
import './CurrentWorkitem.css';

export default class CurrentWorkitem extends React.Component {

  public render() {
    return <div className="currentWorkItemContainer">
      <Autocomplete dataSource={new Shoes()} />
      <StartButton></StartButton>
    </div >;
  }
}
