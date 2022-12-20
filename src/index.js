import React from 'react';
import ReactDOM from 'react-dom/client';
import Provider from './provider';
import LandingPage from './routes/LandingPage';
import Main from './routes/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      {/* <Main /> */}
      <LandingPage />
    </Provider>
  </React.StrictMode>
);
