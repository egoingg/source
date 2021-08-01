import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './5.Router-페이지이동Link.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; // 1. BroowserRouder 태그 import

//2. <App>를 <BrowserRouter>로 묶기
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
