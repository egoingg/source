
/* eslint-disable */

import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import { ToIndex } from 'es-abstract/es2018';
import { isDoExpression } from '@babel/types';
function App() {
  let posts = '강남고기 맛집'


  let st = {color:'red', fontSize:'10px'}
  let [글제목들,글변경] = useState( [ 
                                      {이름:'쌀국구밋집', 따봉개수:0} ,
                                      {이름:'잔치국구밋집', 따봉개수:0} ,
                                      {이름:'김치국구밋집', 따봉개수:0} ,
                                    ])
  let [is모달장보이기,setIs모달장보이기] = useState(false)
  let [누른제목번호,set누른제목번호] = useState(0)
  let [input, setInput] = useState('')

  let 따봉증가 = (idx)=>{
    //카, 변, 함
    let 글제목들new = [...글제목들]
    글제목들new[idx].따봉개수 += 1
    글변경(글제목들new)
  }

  let 첫번째글제목바꾸기 = (idx) =>{
        //카, 변, 함
        let 글제목들new = [...글제목들]
        글제목들new[idx].이름 = '여자코트추천'
        글변경(글제목들new)
  }

  let 모달창보이기 = (idx) =>{
    setIs모달장보이기(true)

    set누른제목번호(idx)
  }

  //html생성기
  function html생성기(){
    let arr = []

    for (const key in 글제목들) {
      console.log( 'key', key)
      console.log('글제목들[key]:', 글제목들[key])
        const element = 글제목들[key];
      
    }

    for (const iterator of 글제목들) {
      console.log( 'iterator', iterator)
    }
    

    글제목들.forEach((글제목, idx) => {
      arr.push(
        <div className='list' key={idx}>
            <h3 onClick = {() => {모달창보이기(idx)}
        
            
            }>{ 글제목.이름 }<span onClick={() =>따봉증가(idx)}>하트</span>{글제목.따봉개수}</h3>
            <p>2월 17알 발행</p>
            <hr/>
        </div>   
      )
    })
    return arr
  }

  return (
    <div className="App">
      <div className ='black-nav' >
        <div style={ st}>개발 Blog</div>
      </div>
      <button onClick = { ()=>{첫번째글제목바꾸기(0)} }>글제목변경</button>

      <input type="text" onChange = { (e) => { setInput(e.target.value) }}/>
      {input}
      {html생성기()}


      <div className='publish'>
        <input onChange = { (e)=>{
          setInput(e.target.value)
        }}/>
        <button onClick = {()=>{
          let arrnew = [...글제목들]
          arrnew.push( {이름:input, 따봉개수:0} )
          글변경(arrnew)


        }}>저장</button>
      </div>

      { (is모달장보이기) 
      ? <Modal 글제목들= {글제목들} 누른제목번호 = {누른제목번호} /> 
      : null 
      }
    </div>
  );
}

function Modal(props){
  return(
    <div className='modal'>
      <h2>{props.글제목들[props.누른제목번호].이름}</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

export default App;
