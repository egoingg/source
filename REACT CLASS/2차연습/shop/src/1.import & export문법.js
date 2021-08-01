import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import data from './data.js'; //import data.js 
import './App.css';

//======================================================================================
//제목:코드가 길어지면 import / export 사용하는법
//step1: export 파일만들기 - data.js파일
//
//step2: export default 내보낼 데이터 작성 - data.js파일에 - 
//
//step3:  import 작명 from 경로 - App.js 파일에 
//
//step4:  가져온 데이터 바인딩 해보기
//======================================================================================

function App() {
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
          <div className='col-md-4'>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt="" width="100%" />
            <h4>{ data[0].title }</h4>
            <p>{ data[0].content } & { data[0].price }</p>
          </div>
          <div className='col-md-4'>
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" alt="" width="100%" />
            <h4>{ data[1].title }</h4>
            <p>{ data[1].content } & { data[1].price }</p>
          </div>
          <div className='col-md-4'>
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" alt="" width="100%" />
            <h4>{ data[2].title }</h4>
            <p>{ data[2].content } & { data[2].price }</p>
          </div>                      
        </div>
      </div>
    </div>
  );
}

export default App;
