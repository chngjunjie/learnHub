import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Application initialization started');

// Ensure DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, rendering app');
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App rendered successfully');
  } else {
    console.error('Root element not found! Check your HTML file');
  }
});
