import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'tailwindcss/tailwind.css'; 

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
