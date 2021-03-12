import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import { SessionProvider } from 'contexts/session';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
