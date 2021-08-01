import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import items from './data.js'; //import data.js 
import './App.css';
import { useState } from 'react';
import {Link, Route, Switch} from 'react-router-dom'; 
import Detail from './Detail.js'; 

//======================================================================================
//제목: Route로 페이지 이동하는 버튼 만들기 - Link
//step1: <Navbar> 안의 버튼에 href 지우고
//
//step2:  <Link to="경로">버튼</Link>
//      ex) <Link to="/detail">Detail</Link>
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
        
          <Nav.Link ><Link to="/">Home</Link></Nav.Link>{/* //step2:  <Link to="경로">버튼</Link> */}
          <Nav.Link ><Link to="/detail">Detail</Link></Nav.Link>{/* //step2:  <Link to="경로">버튼</Link> */}
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
            <div className='row'>
            {
                data.map( (shoe , idx)=>{ 
                    return <Card shoe = {shoe} idx = {idx} key={idx}/> 
                } )
            }
            </div>
        </div>
      </Route>
      {/* //====================================================================================== */}
      <Route path='/detail'>
        <Detail />{/* step3:import 한 component 가죠다 쓰기 */}
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
