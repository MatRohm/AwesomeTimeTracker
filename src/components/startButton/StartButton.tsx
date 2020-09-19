import React from 'react';
import './StartButton.css';

export class StartButton
  extends React.Component {

  public render() {
    return <div className="StartContainer" onClick={this.StartTracking}>
      <div className="OuterCircle">
        <div className="InnerTriangle"> </div>
      </div>
    </div >;
  }

  public StartTracking() {
    console.log("DREH DEN SWAG AUF!")
  }
}