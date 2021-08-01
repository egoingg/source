import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'; // 1. BroowserRouder 태그 import

import {Provider} from 'react-redux'; // 1 :리덕스 세팅S1 : import {Provider}
import { combineReducers, createStore } from 'redux';//step4: import  combineReducers 되었는지 확인

//======================================================================================
//제목: dispatch()로 수정요청할때 데이터를 실어 보낼수 있음
// dispatch( {type:어쩌구, payload:보낼데이터})
//step1: Detail.js 에서 실어보낼 데이터를 dispatch()를 사용하여 작성
//reducer의 액션 파라미터는 dispatch할때 보낸 object 입니다.
//step2:  전송한 데이터를 쓰려면 액션.payload
//
//step3:  
//
//step4:
//======================================================================================
//redux에선 state 데이터의 수정방법을 미리 정의

let 초기값alert = true;// 추가할 state 초기값을 선언한다.

let 초기값cartstate =  [
                   { id:0, name:'멋진신발', quan:2 }
                  // ,{ id:1, name:'예쁜신발', quan:1 }
                  // ,{ id:2, name:'운동화', quan:3 }

                ]

function reducer2(state = 초기값alert, 액션){//  reducer2함수를 하나 더 생성한다.
  if(액션.type === 'alert닫기'){
    state = !state;
    return state;
  }
  else{
    return state
  }
}

function reducer(state = 초기값cartstate, 액션){// 함수 reducer 만들기
  
  if(액션.type === 'cart에항목추가'){
    //같은 상품 없으면 추가..있으면 수량만증가

    let copy = [...state]
    let findIdx = copy.findIndex( (shoe)=>{ if (shoe.id === 액션.payload.id) return shoe }) //step2:  전송한 데이터를 쓰려면 액션.payload

    if (findIdx >= 0)
    {
      copy[findIdx].quan++;
    }
    else
    {
      console.log('idx:', findIdx)
      copy.push(액션.payload)
      return copy;
    }
    return copy;

  }
  else if(액션.type === '수량증가'){
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

// reducer를 createStore()에 집어 넣는다.

let store = createStore(combineReducers({reducer, reducer2})) //step3:  reducer들을 combine해서 쓴다 - combineReducers( {reducer, reducer2})
//let store = createStore(reducer) // reducer에서 state를 퉤 한거 받음
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
