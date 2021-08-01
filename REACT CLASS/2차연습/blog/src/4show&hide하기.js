/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//글제목을 클릭하면 Modal component 보이게 하기 (모달상태를 state 변수에 저장해 놓고 불러시 쓰면 됨)

function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  
  let [따봉,따봉변경] = useState(0); 
  let [모달창상태,모달창상태변경] = useState(false); // 모달창 상태를 state에 저장하는 변수 선언
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <button onClick={ ()=>{ 
                              let newarray = [...글제목]; 
                              newarray[0] = '여자코트추천'; 
                              글변경(newarray) ;   
                        }}>버튼</button>
      <div className ="list">
        {/* 제목을 클릭하면 모달창상태를 수정한다. / 현재상태의 반대로 수정한다 */}
        <h4 onClick={ ()=> { 모달창상태변경( !모달창상태 ) }}>{ 글제목[0] } 
            <span onClick={ () => { 따봉변경(따봉++) }}> 👍 </span> {따봉}
        </h4>       
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
      {/* 모달상태 값에 따라 Modal창이 보이게 또는 안보이게 한다. */
           모달창상태
           ? <Modal />
           :null
      }

    </div>
  );
}

//componet 만들기
function Modal(){
    return(
        //return()안에 있는건 div태그 하나로 묵어야함
        //div 쓰지 않고 목는 방법 <> </>
        <> 
        <div className ="modal">
            <h3>상세페이지</h3>
            <h4>글제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
      </div>
      </>
    )
}

export default App;
