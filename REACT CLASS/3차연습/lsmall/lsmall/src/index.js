import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

//======firebase 설정 추가 start======================
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCAmifWCds15m0fESERq_aJQl-kIpnWl00",
  authDomain: "lsmall.firebaseapp.com",
  projectId: "lsmall",
  storageBucket: "lsmall.appspot.com",
  messagingSenderId: "956208111491",
  appId: "1:956208111491:web:2a0980ace1108a488860b6"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
export {db , storage, auth}
//======firebase 설정 추가 End=========================

let dataCart =  []
let dataTemp =  []
let orderItems =  []
let orderInfo  =  []
let reviews  =  []

// let dataCart =  [ {id : 0, name:'오리지널 덴스 후디', quan:1, size:95, price:73700, quanPrice:73700}
//                 ,{id : 1, name:'오리지널 덴스 맨투맨', quan:1, size:95, price:63700, quanPrice:63700}
//               ]

// let orderItems =  [ {orderNum: 0, id : 0, name:'오리지널 덴스 후디', quan:1, size:95, quanPrice:73700}
//                    ,{orderNum: 0, id : 1, name:'오리지널 덴스 맨투맨', quan:1, size:95, quanPrice:63700}
//                 ]

//let orderInfo =  {orderNum: 0, orderName:'김엘사', tel:'1111-111', address:'서울시 서초구 반포동 서래마을', paied:'N', totPrice:137400, date:'2021-12-12'}

function reducerCart(state = dataCart, action) {
  let arrNew = [...state]
  let payload = action.payload
  let matchedData =  payload !== undefined && arrNew.find((x)=> { return  parseInt(x.id) === parseInt(payload.id) && parseInt(x.size) === parseInt(payload.size) })

  // 로그인 상태이면 
  // 장바구니 변경 상황이 발생하면 무조건 이전 my 장바구니 데이터는 
  // db에서 먼저 삭제
  if (auth.currentUser) 
    DelDbByAction(action, arrNew);

  if (action.type === '수량증가') {
    matchedData.quan++;
    matchedData.quanPrice = parseInt(matchedData.quan) * parseInt(payload.price)

  }else if (action.type === '수량감소') {
   if( matchedData.quan >  1)
    matchedData.quan--;
    matchedData.quanPrice = parseInt(matchedData.quan) * parseInt(payload.price)
  }else if (action.type === '삭제') {
    let arrNewOne = arrNew.filter((x)=>{ return !(x.id == parseInt(payload.id) && x.size == parseInt(payload.size)) })
    arrNew = arrNewOne
  }else if (action.type === '장바구니담기') {
    
    if(matchedData == undefined){
      arrNew.push(payload) //추가
    }
    else
    {
      matchedData.quan++; //같은 아이디가 있으면 quan만 증가 
      matchedData.quanPrice = parseInt(matchedData.quan) *  parseInt(payload.price)
    }
  }else if (action.type === '장바구니초기화') {
    arrNew = []
  }else if (action.type === '장바구니초기화디비삭제안함') {
  arrNew = []
  }
  else if (action.type === '장바구니초기값전달') {
    let payloadNew  = [...payload]
    return payloadNew

  }

  //----------------------
  //로그인 상태이면 db 재 저장
  if (auth.currentUser) 
    AddDbByAction(action, arrNew);

  return arrNew

  function AddDbByAction(action, arrNew) {
    if (action.type === '수량증가'
      || action.type === '수량감소'
      || action.type === '삭제'
      || action.type === '장바구니담기') {
      let seq = 0;
      arrNew.map((obj) => {
        seq = seq + 1;
        let code = auth.currentUser.uid + seq;
        obj['uid'] = auth.currentUser.uid;
        obj['seq'] = seq;
        obj['code'] = code;

        //2 db board에 저장
        db.collection('cart').doc(code).set(obj)
        .catch((err) => {
          alert(err);
          return {};
        });
      });
    }
  }

  function DelDbByAction(action, arrNew) {
    if (action.type === '수량증가'
      || action.type === '수량감소'
      || action.type === '삭제'
      || action.type === '장바구니담기'
      || action.type === '장바구니초기화') {
        arrNew.map((obj) => {
        const res = db.collection('cart').doc(obj.code).delete();
      });
    }
  }
}

function reducerTemp(state = dataTemp, action) {
  let arrNew = [...state]
  let payload = action.payload
 
  if (action.type === '임시주문') {
    arrNew.push(payload) //추가
    return arrNew
  }
  else if (action.type === '임시주문초기화') {
    arrNew = []
    return arrNew
  }
  else{
    return state
  }
}

function reducerOrderItems(state = orderItems, action) {
  let arrNew = [...state]
  let payload = action.payload
  let orderNum = action.orderNum
  let uid = action.uid
 
  if (action.type === '주문상품저장') {
      payload.map((obj)=>{
        let docId = orderNum +'_' + obj.id

                            obj['orderNum'] = orderNum
                            obj['uid'] = uid
                            obj['isReview'] = false
                            obj['docId'] = docId

                            //2 db board에 저장
                            db.collection('orderitems').doc(docId).set(obj).then((result)=>{ // orderitems의 doc의 코드 조합 = orderNum + '_' id(상품)                             
                              //3 db 저장 성공하면  state에 저장
                              arrNew.push(obj)
                          
                              }).catch((err)=>{
                                alert(err)
                                return {}
                              })
      })

     return arrNew
  }
  else if (action.type === '주문상품초기화') {
    return payload;
  }
  else if (action.type === '업데이트_리뷰작성여부'){

    let docId =  payload.orderNum +'_' + payload.id
    let matchedData =  arrNew.find((x)=> { return  x.docId === docId  })

    if (!matchedData)
    return state

    //state 변경
    matchedData.isReview = true


      db.collection('orderitems').doc(docId).update({isReview: true})
      .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

  
      return state
  }
  else{
    return state
  }
}

function reducerOrderInfo(state = orderInfo, action) {
  //let arrNew = [...state]
  let arrNew = []
  let payload = action.payload

  let seq = 0;

  if (action.type === '주문정보저장') {
    arrNew = [...state]

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

    //2 db board에 저장
    db.collection('orderinfo').doc(payload.orderNum).set(payload).then((result)=>{
    
    //3 db 저장 성공하면  state에 저장
    arrNew.push(payload) //추가

    }).catch((err)=>{
      alert(err)
      return {}
    })
    return arrNew
  }
  else if (action.type === '주문정보초기화') {
    return payload;
  }
  else{
    return state
  }
}

const getSeqMax =(arrNew)=>{
  let seq = 0

  if( arrNew.length === 0 || arrNew.undefined)
    seq =1;
  else {
      //가장 큰 seq +1
    let seqMax = 0
    arrNew.map((x)=>{ if (x.seq >  seqMax) seqMax = x.seq;})

    seq = seqMax + 1;
  } 

  return seq 
}

function reducerReview(state = reviews, action) {
   let arrNew = []
   let payload = action.payload
 
   if (action.type === '리뷰정보저장') {
     arrNew = [...state]
     payload.seq = getSeqMax(arrNew) 
     arrNew.push(payload) //추가
    
     //2 db board에 저장
     db.collection('review').add(payload)
     .catch((err)=>{
        alert(err)
        return {}
     })
     return arrNew
   }
   else if (action.type === '리뷰정보초기화') {
     return payload;
   }
   else{
     return state
   }
 }

let store = createStore(combineReducers({ reducerCart
                                          , reducerTemp
                                          , reducerOrderItems
                                          , reducerOrderInfo
                                          , reducerReview
                                        }))

                                 
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
