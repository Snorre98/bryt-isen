import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
import { AuthContextProvider } from './contextProviders/AuthContextProvider';
import { GlobalContextProvider } from './contextProviders/GlobalContextProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <GlobalContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GlobalContextProvider>
    ,
  </AuthContextProvider>,
);
