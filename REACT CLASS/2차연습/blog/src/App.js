/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//=============================================================================================================
//input에 입력한 글 발행하기
//1. input change 이벤트 - input입력값 state에 저장
//2. 저장버튼 click 이벤트 - input state 값  글제목 state에 저장
//unshift : 배열 맨엪에 추가
//================================================================================================================

function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  
  let [따봉,따봉변경] = useState(0); 
  let [모달창상태,모달창상태변경] = useState(false); 
  let [선택한idx,선택한idx변경] = useState(0); 
  let [input입력값, input입력값변경] = useState(''); //input에 입력된 값 저장 공간


  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      {
        글제목.map( (글, idx)=>{
            return (
                    <div className ="list" key={idx}>
                        <h4 onClick={ ()=> {    
                            모달창상태변경( !모달창상태 )  
                            선택한idx변경(idx)
                        }}>{ 글 } 
                            <span onClick={ () => { 따봉변경(따봉++) }}> 👍 </span> {따봉}
                        </h4>       
                        <p>{today}</p>
                    </div>
            )
        })
      }
      {/* 글발행 입력창 */}
      <div className="publish">
          <h5>글발행</h5>
          <input onChange = { (e)=>{ input입력값변경(e.target.value)  } }/> {/* input입력값 state에 저장 */}
          <button onClick = { ()=>{ {/* input state 값  글제목 state에 저장 */}
                                    let newArray = [...글제목]
                                    newArray.unshift(input입력값)
                                    글변경(newArray)
           } } >저장</button>
      </div>

      <Modal 글제목={글제목} 선택한idx={선택한idx}/> 
    </div>
  );
}

function Modal(props){ 
    return(
        <div className ="modal">
            <h3>상세페이지</h3>
            <h4>{props.글제목[props.선택한idx]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
      </div>
    )
}

export default App;
