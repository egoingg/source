/* eslint-disable*/ 
import {Navbar,Container, Nav, Button,Jumbotron,Card } from 'react-bootstrap';
import React, {useState, lazy, Suspense} from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import products from './data/products.js';
import Main from './Main.js';
//import Detail from './Detail.js';
let Detail = lazy( ()=>{ return import('./Detail.js') } ); // lazy loading
import Cart from './Cart.js';
import Footer from './Footer';
import './App.css';

function App() {
  let [items, setItems] = useState(products)
  let [stock, setStock] = useState([10,20,30])
  let [cntClickMore,setCntClickMore] = useState(0) //더보기버튼 누룬 횟수

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as = {Link} to ='/'>LSNmall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as = {Link} to ='/'>Home</Nav.Link>
          <Nav.Link as = {Link} to ='/cart'>Cart</Nav.Link>
          <Nav.Link as = {Link} to ='/detail/0'>Detail</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Switch> {/* Switch :경로중복 방지..하나만 보여준다 */}
        <Route exact path='/'>  {/* Route :페이지 나누기 */}
          <Main items = {items} setItems ={setItems} cntClickMore = {cntClickMore} setCntClickMore={setCntClickMore}/>
        </Route>
        <Route path='/detail/:id'>
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <Detail items = {items} stock = {stock} />
          </Suspense>
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
