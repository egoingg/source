import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//data - cart

let dataCart =  [ {id : 0, name:'오리지널 덴스 후디', quan:1, size:95}
                  ,{id : 1, name:'오리지널 덴스 맨투맨', quan:1, size:95}
                ]

function reducerCart(data = dataCart, action) {
  console.log(action.payload)
  let arrNew = [...data]
  let payload = action.payload
  let matchedData =  payload !== undefined && arrNew.find((x)=> { return  parseInt(x.id) === parseInt(payload.id) && parseInt(x.size) === parseInt(payload.size) })

  if (action.type === '수량증가') {
    matchedData.quan++;
  }else if (action.type === '수량감소') {
    matchedData.quan >  1 && matchedData.quan--;
  }else if (action.type === '삭제') {
    return arrNew.filter((x)=>{ return !(x.id == parseInt(payload.id) && x.size == parseInt(payload.size)) })
  }else if (action.type === '장바구니담기') {
    
    if(matchedData == undefined)
      arrNew.push(payload) //추가
    else
      matchedData.quan++; //같은 아이디가 있으면 quan만 증가 
  }
  return arrNew
}


let store = createStore(combineReducers({reducerCart}))


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
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
