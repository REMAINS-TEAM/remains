import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// var for mobile browsers
document.documentElement.style.setProperty(
  '--vh',
  window.innerHeight * 0.01 + 'px',
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
