import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './routes/LandingPage';
import Main from './routes/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Provider from './provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoadingCircle from './components/loading-circle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <Provider>
        <LoadingCircle/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/texteditor' element={<Main/>}/>
          </Routes>
        </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
