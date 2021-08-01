import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import items from './data.js'; //import data.js 
import './App.css';
import React, { useContext, useState } from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom'; 
import Detail from './Detail.js'; 
import axios from 'axios';// step2:  axios import
import Cart from './Cart.js';

//======================================================================================
//제목:장바구니 기능 완성하기

//step1:  메인페이지 <Card> 누르면 페이지 이동시키기
//페이지 이동은 history.push() 사용 - 연결하려는 컴포넌트에서 onclick 해서 쓰지말고  최초 html 구문에서 history.push() 써야함
//==========useHistory() 훅 사용 - 방문기록 담긴 object 만듬=========

//step2:  장바구니 페이지 +/- 버튼 완성하기
// cart.js - 수량 변경 시킬때 dispatch ... payload에 변경할 id 를 실어 보낸다.
//step3:  
//index.js - cart.js의 payload에 실어 보낸 데이터를 받이서 수량을 수정한디
//step4:
//======================================================================================
export let 재고context = React.createContext(); // React.createContext()로 범위 생성 , detail에서도 쓰려고 export 함


function App() {

  let [data,data변경] = useState(items);  //data state 만들기
  let [재고, 재고변경] = useState([10,11,12]);

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
  let history = useHistory(); // step1-1: useHistory() 훅 사용 - 방문기록 담긴 object 만듬

    return(
        <div className='col-md-4' onClick={()=>{ history.push('/detail/' +props.shoe.id)}}> {/* //step1-2:  메인페이지 <Card> 누르면 페이지 이동시키기 */}
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
