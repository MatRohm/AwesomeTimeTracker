import * as React from 'react';
import './app.css';
import ReactDOM from 'react-dom/client';
import { AutoComplete } from './components/autocomplete/autcomplete';
import { emitter } from './observables/sample';

const App = () => <div className='root'>
  <header className='header'>header!</header>
  <div className='menu'>
    Left pane
  </div>
  <main className="mainContent">
    MAIN CONTENT!
    <div>
      <AutoComplete name="main-aut" label="a" />
    </div>
  </main>
  <footer className='footer'>FOOTER!</footer>
</div >;

emitter.subscribe((value: string) => console.log('JUHU ' + value));
emitter.next('DEAN');
const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);
root.render(<App />)
