import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; // 1. BroowserRouder 태그 import

import {Provider} from 'react-redux'; // 1 :리덕스 세팅S1 : import {Provider}
import { createStore } from 'redux';

//======================================================================================
//제목: redux에서의 수정
//용도: redux에선 state 데이터의 수정방법을 미리 정의 -reducer
//왜쓰냐:데이터 삐꾸나면 어디서 그런지 찾기기 쉬워서(수정한곳에서찾으면됨) 데이터 관리가 용이함 

//제목:
//step1: 함수 reducer 만들기 - 수정하는 방법정의하고 state를 퉤 뱉는 함수
//수정액션에 따라 데이터를 수정하고 수정된 데이터 퉤하고 액션이 없으면 초기값state를 퉤한다.

//step2:  reducer를 createStore()에 집어 넣는다.
//
//step3:  cart.js에서 수정 요청('수량증가') 구문 생성
//props.dispatch(객체형식({}))  =  props.dispatch({ type:'수정문구' })

//step4: 
//
//step5: 
//======================================================================================
//redux에선 state 데이터의 수정방법을 미리 정의

let 초기값state =  [
                   { id:0, name:'멋진신발', quan:2 }
                  ,{ id:1, name:'예쁜신발', quan:1 }
                  ,{ id:2, name:'운동화', quan:3 }

                ]
function reducer(state = 초기값state, 액션){//step1: 함수 reducer 만들기
  if(액션.type === '수량증가'){
    let copy = [...state]
    copy[0].quan++;
    return copy;
  }
  else if(액션.type === '수량감소'){
    let copy = [...state]
    copy[0].quan > 0 && copy[0].quan--;
    return copy;
  }
  else{
    return state
  }

}

//step2:  reducer를 createStore()에 집어 넣는다.
let store = createStore(reducer) // reducer에서 state를 퉤 한거 받음
//let store = createStore( ()=> { return [{ id:0, name:'멋진신발', quan:2 },{ id:1, name:'예쁜신발', quan:1 },{ id:2, name:'운동화', quan:3 }] });  // step3 : creatStore안에 state 저장  

//2. <App>를 <BrowserRouter>로 묶기
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Provider store ={store}> {/*  //2 :리덕스 세팅2 : <Provider>로 감싸기 /  step4 :<Provider> 에 props 전송 */}
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
