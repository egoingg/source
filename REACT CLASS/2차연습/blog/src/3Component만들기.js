/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

//Component(html덩어리)만들기 - html 코딩이 된 함수를 만들고  사용할 곳에 태그형식으로 넣어서 쓰도록하는 기능
    //1. 함수명은 앞글자 대문자로 - Model 이런식으로
    //2. html코딩은 return 소괄호() 안에 한다 -  function Model() { return ( 이부분에 html 코딩)} }
    //3. <Model /> 이런 문법으로 다른곳에 박아서  쓴다.

    //componet 밤위 : 반복되는 html , 자주바뀌는 ui 재랜더링이 잦은 ui, 다른 페이지로 나누고 샢을때
    //단점:  state를 쓸대 복잡

function App() {
  let today = new Date().getDate();
  let [글제목,글변경] = useState(['남자코트추천','다비치안경원','닭갈비맛집']);  // useState(저장할데이터) - state는 저장공간만듬
  let [따봉,따봉변경] = useState(0); 
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
      {/* componet 사용 */}
      <Modal />
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
