import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './theme.css';
import App from './App.tsx';

import { ServiceProvider } from './src/core/index.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ServiceProvider>
      <Router>
        <App />
      </Router>
    </ServiceProvider>
  </React.StrictMode>
);