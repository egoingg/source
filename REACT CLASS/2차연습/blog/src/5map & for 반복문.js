/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//반복문 사용하여 화면구현
//방법1. map 함수  - {} 안에 구현
//방법2. for 함수 - 함수로 빼서 구현 (함수만들기 -> for문 생성 -> array에 ui html코드 작성 -> 함수 호출 ( ui 들어갈 부분에서 함수 호출)


function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  
  let [따봉,따봉변경] = useState(0); 
  let [모달창상태,모달창상태변경] = useState(false); 

  //2. STEP1 : for 함수 사용--------------------------------------------------------------------------
  function 반복된UI만들기함수(){

    let uiArray = []; //빈 ARRAY 만들기
    for (var i =0; i < 글제목.length; i++)
    {
        uiArray.push( //ARRAY에 HTML PUSH
                    <div className ="list">
                        <h4 onClick={ ()=> { 모달창상태변경( !모달창상태 ) }}>{ 글제목[i] } 
                            <span onClick={ () => { 따봉변경(따봉++) }}> 👍 </span> {따봉}
                        </h4>       
                        <p>{today}</p>
                    </div>
        )
    }

    return uiArray; // ARRAY를 퉤 밷어냄
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      {
        //1.map 함수 사용 ------------------------------------------------------------------------
        //반복되는 ui 간단하게 구현
        글제목.map( (글)=>{
            //반복될 ui
            return (
                    <div className ="list">
                        <h4 onClick={ ()=> { 모달창상태변경( !모달창상태 ) }}>{ 글 } 
                            <span onClick={ () => { 따봉변경(따봉++) }}> 👍 </span> {따봉}
                        </h4>       
                        <p>{today}</p>
                    </div>
            )
        })
      }
      {
        //2. STEP2: 함수 호출----------------------------------------------------------------------------------
        반복된UI만들기함수()
      }
      {/* 모달상태 값에 따라 Modal창이 보이게 또는 안보이게 한다. */
           모달창상태
           ? <Modal />
           :null
      }

    </div>
  );
}

function Modal(){
    return(
        <div className ="modal">
            <h3>상세페이지</h3>
            <h4>글제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
      </div>
    )
}

export default App;
