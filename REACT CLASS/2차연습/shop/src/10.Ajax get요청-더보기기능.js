import logo from './logo.svg';
import { Navbar,Nav,NavDropdown,Button,Jumbotron } from 'react-bootstrap';
import items from './data.js'; //import data.js 
import './App.css';
import { useState } from 'react';
import {Link, Route, Switch} from 'react-router-dom'; 
import Detail from './Detail.js'; 
import axios from 'axios';// step2:  axios import

//======================================================================================
//제목: Ajax 요청방법 과 Ajax란
// Ajax란? 서버에 새로로침 없이 요청(get or post)할 수 있게 도와줌
//쓰는 방법: 1 jquery $ajax() ... 2 axios.get() ...3.생자바스크립트의 fetch()

//axios 사용 하고 ....더 보기 버튼 느르면 상품 더보게... ajax 요청으로 상품가죠오기
//step1: axios 설치 
    // yarn add axios
//step2:  axios import
//
//step3:  axios.get(요청URL)
//
//step4:.then(콜백함수) - 성공했을때 result 에 결과값(상품정보등) 담고 있음 
// result.data 에는 object 형식으로 데이터 담겨 있음 , axios가 json 따옴표 stirngg형을 자동으로 따옴표 빼고 object 형식으로 변환해줌
//step5:.catch(콜백함수) - 실패했을때

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
                <div className='row'>
                {
                    data.map( (shoe , idx)=>{ 
                        return <Card shoe = {shoe} idx = {idx} key={idx}/> 
                    } )
                }
                </div>
                {/* */}
                <button className="btn btn-danger" onClick={()=>{
                    //axios로 Ajax 요청
                    axios.get('https://codingapple1.github.io/shop/data2.json') //step3:  axios.get(요청URL)
                    .then( (result)=>{ // step4: 요청 성공 했을때..... resutl애 성공결과 담겨 있음
                        console.log('성공:',result.data) //화면구성 데이터는 result.data에 있음

                        //=======더보기 데이터 추가 start
                        // let newArray = [...data]; 
                        // result.data.map((val)=>{ 
                        //     newArray.push(val);
                        // })
                        // data변경(newArray);
                        
                        //신 문법으로 배열에 object 추가하는법
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
            <Detail data = {data}/>{/*import 한 component 가죠다 쓰기 */}
        </Route>     
      </Switch>
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
