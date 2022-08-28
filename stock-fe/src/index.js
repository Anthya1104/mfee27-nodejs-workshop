import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 新版react   <React.StrictMode></React.StrictMode> 會渲染兩次
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
