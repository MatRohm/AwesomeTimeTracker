import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IUser, User } from './typescript/domain/User';
import UserComponent from './typescript/UI/UserComponent';

import './app.css';

const mainContentStyle = {
  gridArea: 'mainContent',
  backgroundColor: 'orange'
};
const menuStyle = {
  gridArea: 'menu',
  backgroundColor: 'green',
};


const headerStyle = {
  gridArea: 'header',
  backgroundColor: 'grey'
};
const footer = {
  gridArea: 'footer'
};

const user: IUser = new User('YOLO', 1234);

ReactDOM.render(
  <div className="root">
    <header style={headerStyle}>header!</header>
    <div style={menuStyle}>
      Left pane
        </div>
    <main style={mainContentStyle}>
      <UserComponent {...user} ></UserComponent>
    </main>
    <footer style={footer}>FOOTER!</footer>
  </div>,
  document.getElementById('root'),
);
