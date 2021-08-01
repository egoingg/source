import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

//data - order
let dataCart =  [ {id : 0, name:'오리지널 덴스 후디', quan:1, size:95, price:73700, quanPrice:73700}
                  ,{id : 1, name:'오리지널 덴스 맨투맨', quan:1, size:95, price:63700, quanPrice:63700}
                ]

//data - temp
let dataTemp =  []

//data - order
// let orderItems =  [ {orderNum: 0, id : 0, name:'오리지널 덴스 후디', quan:1, size:95, quanPrice:73700}
//                    ,{orderNum: 0, id : 1, name:'오리지널 덴스 맨투맨', quan:1, size:95, quanPrice:63700}
//                 ]
let orderItems =  []

let orderInfo  =  []

//let orderInfo =  {orderNum: 0, orderName:'김엘사', tel:'1111-111', address:'서울시 서초구 반포동 서래마을', paied:'N', totPrice:137400, date:'2021-12-12'}




function reducerCart(state = dataCart, action) {
  console.log(action.payload)
  let arrNew = [...state]
  let payload = action.payload
  let matchedData =  payload !== undefined && arrNew.find((x)=> { return  parseInt(x.id) === parseInt(payload.id) && parseInt(x.size) === parseInt(payload.size) })

  if (action.type === '수량증가') {
    matchedData.quan++;
    matchedData.quanPrice = parseInt(matchedData.quan) * parseInt(payload.price)
  }else if (action.type === '수량감소') {
   if( matchedData.quan >  1)
    matchedData.quan--;

    
    matchedData.quanPrice = parseInt(matchedData.quan) * parseInt(payload.price)
    console.log('-', matchedData.quan,matchedData.price  )
  }else if (action.type === '삭제') {
    return arrNew.filter((x)=>{ return !(x.id == parseInt(payload.id) && x.size == parseInt(payload.size)) })
  }else if (action.type === '장바구니담기') {
    
    if(matchedData == undefined)
      arrNew.push(payload) //추가
    else
    {
      matchedData.quan++; //같은 아이디가 있으면 quan만 증가 
      matchedData.quanPrice = parseInt(matchedData.quan) *  parseInt(payload.price)
    }
  }else if (action.type === '장바구니초기화') {
    arrNew = []
  }

  return arrNew
}


function reducerTemp(state = dataTemp, action) {
  console.log(action.payload)
  let arrNew = [...state]
  let payload = action.payload
 
  if (action.type === '임시주문') {
    arrNew.push(payload) //추가
    console.log('임시주문', arrNew)
    return arrNew
  }
  else if (action.type === '임시주문초기화') {
    arrNew = []
    console.log('임시주문초기화', arrNew)
    return arrNew
  }
  else{
    return state
  }
}

function reducerOrderItems(state = orderItems, action) {
  console.log(action.payload)
  let arrNew = [...state]
  let payload = action.payload
  let orderNum = action.orderNum

  console.log('orderNum', orderNum)
  console.log('상품payload', payload)
 
  if (action.type === '주문상품저장') {

    console.log('주문상품저장1payload', payload)
    console.log('주문상품저장2orderNum', orderNum)
    console.log('arrNew',arrNew)

    payload.map((obj)=>{
      obj['orderNum'] = orderNum
      arrNew.push(obj)

      console.log('주문상품저장3obj', obj)
    })


     console.log('주문상품저장arrNew', arrNew)
     return arrNew
  }
  else{
    return state
  }
}

function reducerOrderInfo(state = orderInfo, action) {

  let arrNew = [...state]
  let payload = action.payload
  console.log('payload주문정보저장', payload)
  let seq = 0;


 
  if (action.type === '주문정보저장') {

  //seq 따기
  //마지막 state의 seq에서 +1 해서
  //조건 : 1) arrNew.length 가 0 이거너 undefined  이면 1
          //2) else 이면  가장큰 seq +1


  if( arrNew.length === 0 || arrNew.undefined)
    seq =1;
  else {
      //가장 큰 seq +1
    let seqMax = 0
    arrNew.map((x)=>{ if (x.seq >  seqMax) seqMax = x.seq;})

    seq = seqMax + 1;
  } 

        

    payload.seq = seq 
    arrNew.push(payload) //추가
    console.log('주문정보저장arrNew', arrNew)
    return arrNew
  }
  else{
    return state
  }
}




let store = createStore(combineReducers({reducerCart, reducerTemp, reducerOrderItems, reducerOrderInfo}))

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
