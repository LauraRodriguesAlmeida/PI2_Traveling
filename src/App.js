import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from 'react-router-dom';
import { AppTheme } from './contexts/theme';


function App() {

  return (
      <AppTheme>
         <BrowserRouter>
            <ToastContainer autoClose={1500} />
         </BrowserRouter>
      </AppTheme>
  );
}

export default App;