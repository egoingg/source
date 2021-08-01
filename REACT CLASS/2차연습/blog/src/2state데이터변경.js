/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import


function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  // useState(저장할데이터) - state는 저장공간만듬
  let [따봉,따봉변경] = useState(0); // 따봉변경(대체할 데이터)
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <button onClick={ ()=>{ //state 변경하기
                              let newarray = [...글제목];  // 카피 - array or object
                              newarray[0] = '여자코트추천'; //변경 - 값
                              글변경(newarray) ;    //함수에 넣기 - 변경함수에 new 값 넣기
                        }}>버튼</button>
      <div className ="list">
          {/*  onClick = { 클릭될때 함수 } */}
          {/*  onClick = { ()=>{실행할내용} } */}
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉++) }}>👍</span> {따봉}</h4>       
        <p>{today}</p>
      </div>
      <div className ="list">
        <h4>{ 글제목[1] }</h4>
        <p>{today}</p>
      </div>
      <div className ="list">
        <h4>{ 글제목[2] }</h4>
        <p>{today}</p>
      </div>
    </div>
  );
}

export default App;
