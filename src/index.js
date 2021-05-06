import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SessionProvider } from 'contexts/session';
import { StrategyProvider } from 'contexts/strategy';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';

const history = createBrowserHistory();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
