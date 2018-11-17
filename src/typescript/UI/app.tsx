import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IUser, User } from '../domain/User';
import UserComponent from './UserComponent';

const mainContentStyle = {
  gridArea: 'mainContent',
  backgroundColor: 'orange'
};
const menuStyle = {
  gridArea: 'menu',
  backgroundColor: 'green',
};
const rootStyle = {
  display: 'grid',
  gridTemplateColumns: '20% auto',
  gridTemplateRows: '20% auto 10%',
  gridTemplateAreas: 'header header menu mainContent footer footer',
};

const headerStyle = {
  gridArea: 'header',
  backgroundColor: 'grey'
};
const footer = {
  gridArea: 'footer'
};

const user: IUser = new User('YOLO', 123);

ReactDOM.render(
  <div style={rootStyle}>
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
