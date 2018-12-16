import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './app.css';
import CurrentWorkitem from './components/currentWorkItem/CurrentWorkItem';

ReactDOM.render(
  <div className='root'>
    <header className='header'>header!</header>
    <div className='menu'>
      Left pane
        </div>
    <main className='mainContent'>
      <CurrentWorkitem></CurrentWorkitem>
    </main>
    <footer className='footer'>FOOTER!</footer>
  </div>,
  document.getElementById('root'),
);
