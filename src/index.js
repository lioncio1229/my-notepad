import React from 'react';
import ReactDOM from 'react-dom/client';
import Provider from './provider';
import Main from './routes/main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Main />
    </Provider>
  </React.StrictMode>
);
