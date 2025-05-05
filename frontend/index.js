import React from 'react';
import ReactDOM from 'react-dom/client'; // modern React 18+ API
import App from './App'; // Import your App component
import './index.css'; // Optional: Your global CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
