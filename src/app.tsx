import * as React from 'react';
import './app.css';
import CurrentWorkitem from './components/currentWorkItem/CurrentWorkitem';
import ReactDOM from 'react-dom';

export class App extends React.Component<{}> {
  public render() {
    return <div className='root' >
      <header className='header'>header!</header>
      <div className='menu'>
        Left pane
        </div>
      <main className='mainContent'>
        <CurrentWorkitem></CurrentWorkitem>
      </main>
      <footer className='footer'>FOOTER!</footer>
    </div >;
  }
}

const containerDiv = document.getElementById('root');
ReactDOM.render(<App />, containerDiv || document.createElement('DIV'));
