import React from 'react';
import { createRoot } from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WalletProvider } from './hook/walletContext';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider> 
      <App />
    </WalletProvider>
  </React.StrictMode>
);

reportWebVitals();