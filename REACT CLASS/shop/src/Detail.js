import axios from 'axios';
import React , { useContext, useEffect, useState } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import {CSSTransition} from 'react-transition-group'
import styled from 'styled-components'
import './Detail.scss';
import {재고context} from './App.js';
import { connect } from 'react-redux';

let 제목 = styled.h4`
font-size:20px; 
color:${props => props.색상} `;

function Detail(props){
    let history = useHistory();
    let {id,title} = useParams();
    let prd = props.pds.find(function( pd) {  return pd.id == id}); //id는 useParams값에서 받아온것임
    let [useAlert, setAlert] = useState(true);
    let [useInput, setInput] = useState('');
    let 재고 = useContext(재고context);
    let [tabNum,setTabNum] = useState(0);
    let [스위치,set스위치] = useState(false);
    //useEffect는 여러개 써도 되고 순서대로 실행됨

    //언제실행되는데?: 1)페이지 등장, 2)업데이트 , 3)사라질때
    //특정 state가 실행될때만 useEffect가 실행되도록 조건 추가할때는 [] 안에 조건을 녛는다 , 
    //[]만쓰고 안에 조건을 녛지 않으면 조건이 없으므로  Detail 등장시 헌번 실행하고 끝남
    useEffect(()=> {
        //-----Detail 페이지가 열린후 실행 (mount될때)

        //detail 컴포넌트 로드시 ajax로 데이터를 가져오고 싶음
        //axios.get();


        //alert창이 2초후에 사라지게
        let timer = setTimeout( () => { setAlert(false)}, 2000);
        console.log('useeffect');


        //-----Datail 페이지가 사라질때 timer 제거 해야함 그래야 에러안남
        return () => { clearTimeout(timer) }
    }, []); //[] 안에 조건없으니까 등장시에만 한번 실행하고 끝납니다.

    useEffect(()=> {
        //Detail 페이지가 사라질때 실행 (unmount될때)
        
        //return function(){ //실행할코드 }
    });

    return (
            <div className="container">
                {useInput}
                <input type="text" onChange = {(e)=> { setInput(e.target.value)}}/>
                <제목 색상={'red'}>제목ㅇㅇㅇ</제목>
                <제목 색상={'blue'}>제목ㅇㅇㅇ</제목>

                {
                    useAlert === true 
                    ?   <div className="my-alert2">
                            <p>마감임박</p>
                        </div>
                    :   null
                }    
            
              <div className="row">
                <div className="col-md-6">
                  <img src={`https://codingapple1.github.io/shop/shoes${Number.parseInt(prd.id)+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                  <h4 className="pt-5">{prd.title}</h4>
                  <p>{prd.content}</p>
                  <p>{prd.price}원</p>
                  <Info 재고 = {재고}/>
                  <button className="btn btn-danger" onClick = { 
                    function(){
                        //재고 변경
                        let newArry =  [...props.재고]//카 
                          newArry = [9,10,11]//변
                          props.재고변경(newArry);//함

                        //props.재고변경([3,4,5, ...props.재고])
                    }
                  }>주문하기</button> 
                  <button className="btn btn-danger" onClick = { ()=>{
                      history.goBack();
                  }}>뒤로가기</button> 
                  <button className="btn btn-danger" onClick = { ()=>{
                      history.push('/');
                  }}>메인으로</button> 

                  <button className="btn btn-primary"  onClick = { ()=>{
                      props.dispatch( { type:'상품추가' ,  
                                        payload:{id:prd.id, name:prd.title, quan:1} }
                                    );
                      history.push('/cart') //* 라우터 함수를 이용해서 /cart로 페이지 강제 이동,  저렇게 라우터 함수를 이용해서 페이지 이동을 시키면 개발환경에서도 초기화가 되지 않습니다. */}
                    
                    }}>cart에담기</button>
                    
                </div>
              </div>

              //버튼을 누른 nav가 보이게 - 0버튼 click하면 div1 보이게 1버튼 click 하면 div1 보이게
              // state 생성 - 버튼 클릭 번호 저장
              //click 이벤트 - stat변경 (누른 버튼 번호 값으로)
              // if 문 에서 state 값이 1이면 div1 elseif 2  div2 이런식
              //if 구문은 function 안에서 작성 가능    
              <Nav variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                  <Nav.Link eventKey="link-0" onClick = { () => { setTabNum(0); set스위치(false)} } >Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1" onClick = { () => { setTabNum(1); set스위치(false)} } >Option 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2" onClick = { () => { setTabNum(2); set스위치(false)} } >Option 2</Nav.Link>
                </Nav.Item>
              </Nav>

              <CSSTransition in={스위치} classNames="wow" timeout={500} set스위치 = {set스위치}>
                <Tab tabNum = {tabNum}/>
              </CSSTransition>
              
              

            </div> 
    )
  }

  function Info(props){
    return(
      <p>재고:{props.재고[0]}</p>
    )
  }

  function Tab(props){
    useEffect(()=>{
      props.set스위치(true);
    });

    if ( props.tabNum === 0){
      return <div>내용0</div>
    }
    else if (props.tabNum === 1){
      return <div>내용1</div>
    }
    else if (props.tabNum === 2){
      return <div>내용2</div>
    }
    else{
      return null;
    }
  }


// index.js에서 redux 감썬  컴포넌트에서 store에 있는 state를 쓰려면
//step1 : function 먼들기
//step2 : export default connect()()
//step3 : 함수에서 store 데이터를 props로 등록하기

function state를props화(store) // redux store 데이터 가져와서 props로 변환해주는 함수
{
    console.log(store)
    return{ 
        //state:store //step3: 함수에서 store 데이터를 props로 등록하기
        state:store.reducer, //step3: 함수에서 store 데이터를 props로 등록하기
        aler열렸니:store.reducer2
    }
}

//export default Detail;
export default connect(state를props화)(Detail) // export default connect (함수명)(Cart)
