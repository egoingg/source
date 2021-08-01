import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux';

//state를 한곳에 저장할 공간을 생성한다.


let cartInfo = [{id:'0', name:'스트레이트슬랙스', quan:1}, {id:'1', name:'스트레이트스커트', quan:2}]
let isAlert = true

let store = createStore(combineReducers({reducer, reducerAlert}))

function reducerAlert(state= isAlert, 액션){
  switch (액션.type) {
    case '닫기':
      state = false
        return state
  
    default:
      return state;
  }
}

function reducer(state = cartInfo, 액션){
  let copy = [...state]
  
  let paramId = 액션.payload
  let matched = copy.find((x)=>{ return x.id == paramId })

  switch (액션.type) {
    case '증가':


      matched.quan += 1
      return copy
    case '감소':

      if( matched.quan > 0)
      {
        matched.quan -= 1
      }
      return copy
    case '항목추가':

      //넘어온 아이디에 해당하는게 있나 체크
      let detail = 액션.payload
      let matchedItem = copy.find((x)=>{ return x.id == detail.id  })
      //1. 있으면 수량만 증가
      if (matchedItem){
        matchedItem.quan+=1
      }
      else{
        //copy = [ copy, ...detail]
        console.log('detail', detail)
        copy.push(detail)
      }
      //2. 없으면 추가
     // copy.push(액션.payload)
      return copy
  
    default:
      return state;
  }

}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store = {store}>
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
