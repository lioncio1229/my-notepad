import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './routes/LandingPage';
import Main from './routes/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Provider from './provider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/texteditor",
    element: <Main/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
      <RouterProvider router={router} />
  </Provider>
);
