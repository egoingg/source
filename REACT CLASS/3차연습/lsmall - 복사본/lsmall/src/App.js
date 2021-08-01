/* eslint-disable*/ 
import {Navbar,Container, Nav, Button,Jumbotron,Card } from 'react-bootstrap';
import React, {useState, lazy, Suspense} from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import products from './data/products.js';
import Main from './Main.js';
//import Detail from './Detail.js';
let Detail = lazy( ()=>{ return import('./Detail.js') } ); // lazy loading
import Cart from './Cart.js';
import Order from './Order.js';
import Result from './Result.js';
import Footer from './Footer';
import OrderList from './OrderList.js';
import './App.css';

function App() {

  let [items, setItems] = useState(products)
  let [stock, setStock] = useState([10,20,30])
  let [cntClickMore,setCntClickMore] = useState(0) //더보기버튼 누룬 횟수
  let [recentIds, setRecentIds] = useState([]) // 최근본 상품 id


  return (
    <div className="App" style={{paddingBottom: 70}}>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand as = {Link} to ='/'>LSmall</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as = {Link} to ='/'>Home</Nav.Link>
          <Nav.Link as = {Link} to ='/cart'>Cart</Nav.Link>
          <Nav.Link as = {Link} to ='/orderList'>Order List</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <Switch> {/* Switch :경로중복 방지..하나만 보여준다 */}
        <Route exact path='/'>  {/* Route :페이지 나누기 */}
          <Main items = {items} setItems ={setItems} cntClickMore = {cntClickMore} setCntClickMore={setCntClickMore}/>
        </Route>
        <Route path='/detail/:id'>
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <Detail items = {items} stock = {stock}  setRecentIds = {setRecentIds} />
          </Suspense>
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/order'>
          <Order />
        </Route>
        <Route path='/result/:resultCode/:orderNum/:msg'>
          <Result />
        </Route>
        <Route path='/orderList'>
          <OrderList />
        </Route>
      </Switch>
      <RecentViewer items = {items} setRecentIds= {setRecentIds}/>{/* 최근본상품 viewer */}
      <Footer />
    </div>
  );
}

function RecentViewer (props){
  let history = useHistory()
  let arrHtml =[]

  let str = localStorage.getItem('Recent');
  if (!str) return null

  let arr = JSON.parse(str)
  if (arr.length === 0) return null

  console.log('arr',arr)
  console.log('props.items',props.items)


  arrHtml =   arr.map((id)=>{
            let matchedItem = props.items.find((item)=> { return parseInt(item.id) === parseInt(id) })
            console.log('matchedItem',matchedItem)
            return(
              matchedItem 
              ? 
                <div key={id} onClick={()=>{history.push('/detail/'+ matchedItem.id)}} style={{ cursor:'pointer'}}>
                  <div><img src={'https://jungyooree.github.io/item' + (parseInt(matchedItem.id) + 1) + '.jpg'} width="100%" /></div>
                  <div><p>{matchedItem.title}</p></div>
                </div>
              : null
            )
          })

let closeBar = ()=>{
  //최근본상품 지우기
  localStorage.removeItem('Recent')
  props.setRecentIds([])
}
 console.log('arrHtml',arrHtml)
  return (  
          arrHtml.length > 0
          ?
          <div className = 'RecentItemsBar'>
           <p className='title'>최근 본 상품 <span style={{ cursor:'pointer'}} onClick = { closeBar }>X</span></p>
           {arrHtml}
           </div>
          :
          null
  )
}

export default App;
