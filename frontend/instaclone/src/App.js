import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactNotifications from 'react-notifications-component';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <ReactNotifications />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
