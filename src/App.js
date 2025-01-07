import React from 'react';
import GlobalStyle from './styles/global';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import AuthProvider  from './contexts/auth';
import { AppTheme } from './contexts/theme';


function App() {

  return (
      <AppTheme>
      <AuthProvider>
         <BrowserRouter>
            <GlobalStyle />
            <ToastContainer autoClose={1500} />

            <Routes />
         </BrowserRouter>
      </AuthProvider>
      </AppTheme>
  );
}

export default App;