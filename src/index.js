import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './routes/LandingPage';
import Main from './routes/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from './provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/texteditor' element={<Main/>}/>
        </Routes>
      </BrowserRouter>
  </Provider>
);
