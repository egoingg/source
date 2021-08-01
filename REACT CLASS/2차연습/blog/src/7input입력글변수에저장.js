/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//=============================================================================================================
//사용자가 입력한 글을 변수에 저장하는 법
//input에 입력된 값 저장 공간 만들기
//input의 onChange 이벤트리스너에서 입력하는 값을 받아 올 수있다. (e.tartget.value를 사용하여 받음)
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
    {/* input에 입력되는 값을 받아 올 수있다 */}
    <input onChange = { (e)=>{ console.log( e.target.value ) } }/> 
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
