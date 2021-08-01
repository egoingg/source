import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import items from './data.js'; //import data.js 
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'; 
import Detail from './Detail.js'; 
import axios from 'axios';// step2:  axios import
import Cart from './Cart.js';

//======================================================================================
//제목:비동식 함수 set함수의 오류 해결법
//useEffect 사용으로 해결

//state 변경함수는 async 함수기 때문에 완료되기까지 시간이 오래걸리면 제쳐두고 다음 코드를 실행하는 문제로 오류발생
//state가 변경되면 이 코드 실행해주세요 라는 방식으로 변경해야함

//======================================================================================
export let 재고context = React.createContext(); // React.createContext()로 범위 생성 , detail에서도 쓰려고 export 함


function App() {

  let [data,data변경] = useState(items);  //data state 만들기
  let [재고, 재고변경] = useState([10,11,12]);

  let[count, setcount] = useState(0);
  let [age,setage] = useState(20);

  //step2: count 변경되면 실행해 달라넌 조건으로 useEffect안에 실행코드 작성
  //특정 state(count가 변경될때)가 변경될때먼 어던행위 실행하고 싶을때------------------------------------------
  useEffect( ()=>{  
    if ( count != 0 && count < 3 ){ //3. useEffect는 페이지 로딩시 꼭 한번은 실행되으로 그걸 막기의해 count !=0 인 조건을 더 추가함
          setage(age+1);
    }
  }, [count]) // 2. count 변경되면 실행해 주셈.. 이뜻임
//-----------------------------------------------------------------------------------------------------------

  return (
    <div className="App">

     <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* //====================================================================================== */}
      <Switch>
        <Route exact path='/'>
          <div>안녕하세요 전 {age}</div>
          <Button onClick={ ()=>{ 
                                  setcount(count+1);//step1: count를 변경
                                  }}>누르면 한살더먹기</Button>
            <Jumbotron className="background">
                <h1>20% season off</h1>
                <p>
                This is a simple hero unit, a simple jumbotron-style component for calling
                extra attention to featured content or information.
                </p>
                <p>
                <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
            <div className='container'>
              {/*=======  같은 값을 공유할 html을 <범위.Provider value = {공유원하는값} >으로 감싸기 ========*/}
              <재고context.Provider value={재고}>
                <div className='row'>
                {
                    data.map( (shoe , idx)=>{ 
                        return <Card shoe = {shoe} idx = {idx} key={idx}/> 
                    } )
                }
                </div>
              </재고context.Provider>
              {/*=======  end ===============================================================================*/}
                {/* */}
                <button className="btn btn-danger" onClick={()=>{
                    //axios로 Ajax 요청
                    axios.get('https://codingapple1.github.io/shop/data2.json') //step3:  axios.get(요청URL)
                    .then( (result)=>{ // 요청 성공 했을때..... resutl애 성공결과 담겨 있음
                        console.log('성공:',result.data) //화면구성 데이터는 result.data에 있음

                        //=======더보기 데이터 추가 start
                        // let newArray = [...data]; 
                        // result.data.map((val)=>{ 
                        //     newArray.push(val);
                        // })
                        // data변경(newArray);

                        data변경([...data, ...result.data]);
                  
                        //=======더보기 데이터 추가 End
                    } ) 
                    .catch( ()=>{ // step:5 요청 실패 했을때
                        console.log('실패했어요') 
                    } ) 
                } }>더보기</button> 
            </div>
        </Route>
        {/* //====================================================================================== */}
        <Route path='/detail/:id'> {/* 경로에 파라미터 형식 설정 - /:id 에서 ':id' 의미는 그자리에 아무 글자가 들어갈수 있다. */}
          <재고context.Provider value={재고}>  
            <Detail data = {data} 재고 ={재고} 재고변경={재고변경}/>{/*import 한 component 가죠다 쓰기 */}
          </재고context.Provider>
        </Route> 
        <Route path='/cart'>
          <Cart></Cart>
        </Route>    
      </Switch>
    </div>
  );
}

function Card(props)
{
  let 재고 = useContext(재고context); // useContext(범위이름)로 공유된 값 받아오기
  let history = useHistory(); //useHistory() 훅 사용 - 방문기록 담긴 object 만듬

    return(
        <div className='col-md-4' onClick={()=>{ history.push('/detail/' +props.shoe.id)}}> {/*  메인페이지 <Card> 누르면 페이지 이동시키기 */}
            <img src= {`https://codingapple1.github.io/shop/shoes${props.shoe.id+1}.jpg`} alt="" width="100%" />
            <h4>{ props.shoe.id }</h4>
            <h4>{ props.shoe.title }</h4>
            <p>{ props.shoe.content } & { props.shoe.price }</p>
            <p>남은수량1 :{재고[0]}</p>
            <Test></Test>
            
        </div>
    )
}

function Test(){
  let 재고 = useContext(재고context); // useContext(범위이름)로 공유된 값 받아오기
  return <p>남은수량2 :{재고[0]}</p> // context 공유값 사용
}

export default App;
