import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import { SessionProvider } from 'contexts/session';
import { SnackbarProvider } from 'notistack';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'right'}} autoHideDuration={3000}>
        <Router history={history}>
          <Routes />
        </Router>
      </SnackbarProvider>
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
