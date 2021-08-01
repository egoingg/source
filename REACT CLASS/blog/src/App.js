import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [title , 제목변경함수] =  useState(['강남맛집','강북맛집', '경기맛집1']);
  let stl = { fontSize:'15px', color:'blue' };
  console.log(제목변경함수);

  let [cnt,cntft] = useState([0,0,0]);
  let [toggle,toggleft] = useState(false);

  function addCnt(i){
    var newcnt = [...cnt]
    newcnt[i]++;
    cntft(newcnt);
  }

  function 제목바꾸기(){
    let newArr = [...title];
    newArr[0] = '여자코트추천';
    제목변경함수(newArr);
  }

  function 반복ui(){
    var arr = [];

    for(var i =0; i < 3; i++)
    {
      arr.push(
                <div className="list">
                  <h4 onClick={ () =>{toggleft(!toggle)} }>{title[i]} <span onClick = { ()=>{ addCnt(i)} }>👍</span>{ cnt[i] }</h4>
                  <p>2021/04/05</p>
                  <hr />
                </div>
              );
    }
    return arr


  }

  return (
    <div className="App">
      <button onClick = { 제목바꾸기 } >state값변경</button><br></br>
      <button onClick = { () => {toggleft(!toggle)} } >Modal창보기(창의상태값도state값에저장해서써야함)</button>

      <div className="blackNav">
        <h4 style = { stl }>블로그제목</h4>
      </div>

      {
        toggle
        ? <Modal /> 
        : null
      }
      

      {
        반복ui()
      }

      <div className="list">
        <h4>{title[0]} <span onClick = { addCnt }>👍</span>{ cnt[0] }</h4>
        <p>2021/04/05</p>
        <hr />
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>2021/04/05</p>
        <hr />
      </div>
      <div className="list">
        <h4 onClick={ () =>{toggleft(!toggle)} }>{title[2]}</h4>
        <p>2021/04/05</p>
        <hr />
      </div>


      
    </div>
  );
}

function Modal(){
  return(
    <>
    <div>
       <h4>aaa</h4>
        <p>2021/04/05</p>
    </div>
    </>
  )
}

export default App;
