import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { SessionProvider } from 'contexts/session';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <SessionProvider>
      <Routes />
    </SessionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
