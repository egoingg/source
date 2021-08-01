import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Container, NavDropdown, Nav  } from 'react-bootstrap';
import React , { useEffect, useState,lazy, Suspense, memo } from 'react';
import data from './data.js';
import { Route, Link, Switch, useHistory } from 'react-router-dom'
//import Detail from './Detail.js'

import axios from 'axios'
import Cart from './Cart.js'
let Detail = lazy( ()=>{ return import('./Detail.js') } );
var count = 0

function App() {
  const [shoes, setShoes] =  useState(data)
  const [isLoading, setisLoading] = useState(false)
  const [재고, set재고] = useState([10,9,8])

  //let [count, setCount] = useState(0);
  //var count = 0
  let [age, setAge] = useState(20);

  // useEffect(() => {
  //   if(count === 0)
  //   return 

  //   if ( count < 3 ) {
  //     setAge(age+1);
  //   }
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [count])

  //함빈푸리
  function cardArr(){
    let arr = []
    
    shoes.forEach((shoe, i) => { 
      arr.push(<Card shoe = {shoe} key = {i}/>)
    });

    return arr
  }
  return (
  <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to = '/'>Home</Nav.Link>
              <Nav.Link as={Link} to = "/Detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
    </Navbar>
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button onClick={()=>{
          count= count+1
           if ( count < 3 ) {
             console.log('count', count)
             setAge(age+1);
           }
        }

      }>누르면한살먹기</button>
    </div>
    <Parent 이름='존박' 나이='20' />
    <Switch>
      <Route exact path='/'>
        <div className="container">
            <div className="row">
              {
                cardArr()
              }
              <button className="btn btn-danger" onClick = { ()=>{ 
                //axios로 get 요청하기

                //로딩중 보이게
                setisLoading(true)

                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{ 
                 
                  //로딩중 안보이게
                  setisLoading(false)

                  let arrNew = [...shoes]
                  result.data.map((x)=>{
                    arrNew.push(x)
                  })
                  
                  setShoes(arrNew)
                })
                .catch((err)=>{ throw new Error (err)
                  //로딩중 안보이게
                  setisLoading(false)
                })
              }}>{ isLoading ? '로딩중...' : '더보기'} </button>
            </div>
        </div>
      </Route>
      <Route path ='/detail/:id'>
        <Suspense fallback={ <div>로딩중입니다~!</div> }>
            <Detail shoes = {shoes} 재고 = {재고} set재고 = {set재고}/>
        </Suspense>
      </Route>
      <Route path='/cart'>
        <Cart/>
      </Route>
     
      </Switch>
  </div>
  );
}

function Card(props)
{
  const history = useHistory()

  return(
    <div className="col-md-4" onClick = {()=>{ history.push('/detail/' + props.shoe.id)}}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.shoe.id +1}.jpg`} width="100%" />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
    </div>
  )
}


function Parent(props){
  return (
    <div>
      <Child1 이름={props.이름} />
      <Child2 나이={props.나이} />
    </div>
  )
}

function Child1(){
  useEffect( ()=>{ console.log('렌더링됨1') } );
  return <div>1111</div>
}
let Child2 = memo(function(){
  useEffect( ()=>{ console.log('렌더링됨2') } );
  return <div>2222</div>
})

export default App;
