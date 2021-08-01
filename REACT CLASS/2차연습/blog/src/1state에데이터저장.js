import logo from './logo.svg';
import './App.css';
import React from 'react'; // react import
import {useState} from 'react'; // useState 함수 사용하려면 import

function App() {
  let [글제목,글변경] = useState(['강남고기맛집','다비치안경원','닭갈비맛집']);  // useState(저장할데이터) - state는 저장공간만듬
  let today = new Date().getDate();
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <div className ="list">
        <h4>{ 글제목[0] }</h4>       {/* {}  중괄호안에 state 변수써서 데이터 바인딩함 */}
        <p>{today}</p>
      </div>
      <div className ="list">
        <h4>{ 글제목[1] }</h4>
        <p>{today}</p>
      </div>
      <div className ="list">
        <h4>{글제목[2]}</h4>
        <p>{today}</p>
      </div>
    </div>
  );
}

export default App;
