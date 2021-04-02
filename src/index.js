import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import { SessionProvider } from 'contexts/session';
import { StrategyProvider } from 'contexts/strategy';
import { SnackbarProvider } from 'notistack';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}>
      <SessionProvider>
        <StrategyProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </StrategyProvider>
      </SessionProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
