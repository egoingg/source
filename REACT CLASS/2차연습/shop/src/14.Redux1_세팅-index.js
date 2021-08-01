import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; // 1. BroowserRouder 태그 import

import {Provider} from 'react-redux'; // step1 :리덕스 세팅S1 : import {Provider}
import { createStore } from 'redux';
let store = createStore( ()=> { return [{ id:0, name:'멋진신발', quan:2 }] });  // step3 : creatStore안에 state 저장  

//2. <App>를 <BrowserRouter>로 묶기
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Provider store ={store}> {/*  // step2 :리덕스 세팅2 : <Provider>로 감싸기 /  step4 :<Provider> 에 props 전송 */}
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
