import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import items from './data.js'; //import data.js 
import './App.css';
import { useState } from 'react';
import {Link, Route, Switch} from 'react-router-dom'; // step1: router 컴포넌트 import

//======================================================================================
//제목: route  세팅하고 페이지 나누기
//step1:    router 컴포넌트 import
//  
//step2:   html코드를 <route path='경로' />로 묶교 페이지 경로 지정 - 
//          exact - 경로가 중복되는 것을 방지할때 씀 - 경로가 / 일때와 /detail 일때 각각으로 인식되개 할때 추가
//          ex) <Route exact path='/'>
//step3:    
//
//step4:  

//제목:
//step1: 
//
//step2:  
//
//step3:  
//
//step4:
//======================================================================================

function App() {
  let [data,data변경] = useState(items);  //data state 만들기

  return (
    <div className="App">

     <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
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


      <Route exact path='/'> {/* step2 - html코드를 <route path='경로' />로 묶교 페이지 경로 지정 */}
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
            <div className='row'>
            {
                data.map( (shoe , idx)=>{ 
                    return <Card shoe = {shoe} idx = {idx} key={idx}/> 
                } )
            }
            </div>
        </div>
      </Route>
      <Route path='/detail'>{/* step2 - html코드를 <route path='경로' />로 묶교 페이지 경로 지정 */}
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                    </div>
                    <div className="col-md-6 mt-4">
                    <h4 className="pt-5">상품명</h4>
                    <p>상품설명</p>
                    <p>120000원</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
      </Route>     

    </div>
  );
}

function Card(props)
{
    return(
        <div className='col-md-4'>
            <img src= {`https://codingapple1.github.io/shop/shoes${props.shoe.id+1}.jpg`} alt="" width="100%" />
            <h4>{ props.shoe.id }</h4>
            <h4>{ props.shoe.title }</h4>
            <p>{ props.shoe.content } & { props.shoe.price }</p>
        </div>
    )
}

export default App;
