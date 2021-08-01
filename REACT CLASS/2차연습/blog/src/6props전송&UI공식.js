/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//자식컴포넌트 부모컴포턴트가 가진 state 쓰려면 props로 전송해줘야 함
    //step1. <자식컴포넌트 작명={전송할state명} />
    //step2. 자식컴포넌트에서 props 파라미터 입력후 사용 - function 자식컴포넌트(props)

//=============================================================================================================
//uI만드는 법칙
//1.UI아 관련돤 중요 정보들을  STATE로 저정해 놓고
//2.STATE에 따라시 UI가 수정되게 만들면 됩니다.
//각각 선택한 글 정보를 detail 창에 보이게 하는법 - 몇 번째 제목 눌렀는지 상태정보를 state에 저장 (글제목 클릭 이벤트에서 상태 저장)
//================================================================================================================

function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  
  let [따봉,따봉변경] = useState(0); 
  let [모달창상태,모달창상태변경] = useState(false); 
  let [선택한idx,선택한idx변경] = useState(0); //몇 번째 제목 눌렀는지 state 생성


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
                            선택한idx변경(idx)  /*몇 번째 제목 눌렀는지 상태정보를 state에 저장 */
                        }}>{ 글 } 
                            <span onClick={ () => { 따봉변경(따봉++) }}> 👍 </span> {따봉}
                        </h4>       
                        <p>{today}</p>
                    </div>
            )
        })
      }
      {/* 모달상태 값에 따라 Modal창이 보이게 또는 안보이게 한다. */
           모달창상태 === true
           ? <Modal 글제목={글제목} 선택한idx={선택한idx}/> //step1. <자식컴포넌트 작명={전송할state명} />
           : null
      }

    </div>
  );
}

function Modal(props){ //step2. 자식컴포넌트에서 props 파라미터 입력후 사용 - function 자식컴포넌트(props)
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
