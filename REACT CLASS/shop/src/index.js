import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';// step1. import {Provider} - redux 세팅 : props 없이 모든 컴포넌트가 state를 갖다쓰기 가능
import { combineReducers, createStore } from 'redux';

let alert초기값 = true;
let 초기값 = [  {id:4, name:'멋진신발', quan:1},
                {id:5, name:'런닝화', quan:1},
                {id:6, name:'농구화', quan:1} 
             ]; //초기값
//let store = createStore(()=>{return state}); //step3: state 만들기 : createStore()안에 state 저장

function reducer(state = 초기값, 액션) //넘어오는 state값이 없으면 초기값 으로 세팅
{
  console.log (액션.payload);


  if (액션.type === '상품추가'){
    //payload된 즉  장바구니에 추가할 상품이 장바구니에 이미 존재하는지 체크 
     // - 이미 있음 true -> 수량만 증가 시킴  
     // -      없음 false -> 상품 push
     let copy = [...state]
     let findone = copy.find((value)=> { return value.id === 액션.payload.id })
    if (findone !== undefined ){
        findone.quan++;
    }
    else{
      copy.push(액션.payload); //dispatch 에서 데이터 실어옴
    }

    return copy;
  }
  else if (액션.type === '수량증가'){
    let copy = [...state]
    let findone = copy.find((value)=> { return value.id === 액션.payload })

    if (findone !== undefined ){
      findone.quan++;
  }

    return copy;
  }
  else if (액션.type === '수량감소'){
    let copy = [...state]
    let findone = copy.find((value)=> { return value.id === 액션.payload.id })

    if (findone !== undefined ){
      findone.quan >= 1 && findone.quan--;
    }
    
    return copy;
  }
  else{
    return state;
  }
}

function reducer2(state = alert초기값, 액션)
{
  if (액션.type == '닫기')
    return state = false;

  return state;
}

//let store = createStore(reducer); //step3: state 만들기 : reducer 함수에서 state 값을 밷어냄
let store = createStore(combineReducers( {reducer, reducer2}) );  //reduder가 1개 이상일때 combineReducer에 쓴다

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*   step2. <Provider>로 감싸기 - 감싼 애들은 props 없이 state 공유 가능, */}
      {/*   step4: provider에 props 전송 */}
      <Provider store={store}>
        <App />     {/* <App> 컴포넌트를 index.html 파일에 박아주세요 라는 뜻 */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
