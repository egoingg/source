/* eslint-disable*/ 
import {Navbar,Container, Nav, Spinner } from 'react-bootstrap';
import React, {useState, lazy, Suspense, useEffect} from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import products from './data/products.js';
import Main from './Main.js';
//import Detail from './Detail.js';
let Detail = lazy( ()=>{ return import('./Detail.js') } ); // lazy loading
import Cart from './Cart.js';
import Order from './Order.js';
import Result from './Result.js';
import Footer from './Footer';
import OrderList from './OrderList.js';
import SearchOrder from './SearchOrder.js';
import './App.css';
import {db, storage, auth} from './index.js'
import Login from './Login.js'
import Review from './Review.js'
import ReviewList from './ReviewList.js'
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";

function App(props) {

  let [items, setItems] = useState(products)
  let [stock, setStock] = useState([10,20,30])
  let [cntClickMore,setCntClickMore] = useState(0) //더보기버튼 누룬 횟수
  let [recentIds, setRecentIds] = useState([]) // 최근본 상품 id
  let [user, setUser] = useState(); //로그인된 user 정보
  let history = useHistory()

  const handleGetReview =()=>{
    let arrObj = [];

    // get db 
    db.collection('review').get().then((결과) => {
      결과.forEach((row) => {
        arrObj.push(row.data());
      });
      // state save db 값
      props.dispatch({ type: '리뷰정보초기화', payload: arrObj });
    });
  }

  const handleGetUserOrderInfo = (user)=>{
    //디비에서 내 주문정보 읽어오기

    // state 초기값 로드 from db 
    let arrObj = []
    let arrObj1 = []

  
    db.collection('orderinfo').where('uid', '==', user.uid).get().then((결과)=>{ //내 주문 정보 해당건 추출
      결과.forEach((row)=>{
              arrObj.push(row.data())
      })
      
      props.dispatch( {type:'주문정보초기화', payload: arrObj})
    })

    db.collection('orderitems').where('uid', '==', user.uid).get().then((결과)=>{
      결과.forEach((row)=>{
              arrObj1.push(row.data())
      })

      props.dispatch( {type:'주문상품초기화', payload: arrObj1})
    })
  }
  
  const handleGetUserCartInfo = (user)=>{
    //디비에서 내 Cart정보 읽어오기

    let arrObj =[]
    db.collection('cart').where('uid', '==', user.uid)
    //db.collection('cart').where('uid', '==', auth.currentUser.uid)
        .get()
        .then((결과)=>{
                        결과.forEach((row)=>{
                            arrObj.push(row.data())
                        })

                        //state에 저장
                        props.dispatch({type:'장바구니초기값전달', payload:arrObj})
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        })
  }

  useEffect(() => {
    
    //로그인 / 로그아웃/ 새로로침 ...시 발생하는 이벤트
    auth.onAuthStateChanged((user)=>{
      setUser(user)

      if (user) //로그인 일때
      {
        // state 초기값 로드 from db 
        handleGetUserOrderInfo(user)
        handleGetUserCartInfo(user)
      }
      else //로그아웃 일때
      {
        initStateOrder() // 로그아웃 할때 Order state를 초기화 - 비어 있게 만듬 (비회원 상태일때는 비워 놓아야함)
        initStateCart()  // 로그아웃 할때 cart state를 초기화 - 비어 있게 만듬 (비회원 상태일때는 비워 놓아야함)
      }

    })

    // state 초기값 로드 from db 
    handleGetReview()
    return () => {
    }
  }, [])

  const initStateOrder =()=>{
    props.dispatch( {type:'주문정보초기화', payload: []})
    props.dispatch( {type:'주문상품초기화', payload: []})
  }

  const initStateCart =()=>{
    props.dispatch( {type:'장바구니초기화디비삭제안함', payload: []})
  }

  const handleOut = ()=>{auth.signOut().then((result)=>{
    //user 정보 state에 제거
    setUser(undefined)

    history.push('/')
  })}  

  return (
    <div className="App" style={{paddingBottom: 70}}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
        <Navbar.Brand as = {Link} to ='/'>LSmall</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {user
              ? 
                <Nav className="me-auto">
                <Nav.Link as = {Link} to ='/'>HOME</Nav.Link>
                <Nav.Link as = {Link} to ='/cart'>CART(🛒{props.stateCart.length})</Nav.Link>
                <Nav.Link as = {Link} to ='/orderList'>ORDER LIST</Nav.Link>
                <Navbar.Text>👤{user.displayName}</Navbar.Text>
                <Nav.Link  onClick={handleOut}> LOGOUT</Nav.Link>
                </Nav>
              : 
                <Nav className="me-auto">
                <Nav.Link as = {Link} to ='/'>HOME</Nav.Link>
                <Nav.Link as = {Link} to ='/cart'>CART(🛒{props.stateCart.length})</Nav.Link>
                <Nav.Link as = {Link} to ='/orderList'>ORDER LIST</Nav.Link>
                <Nav.Link  as = {Link} to ='/login'>LOGIN</Nav.Link>
                </Nav>
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch> {/* Switch :경로중복 방지..하나만 보여준다 */}
        <Route exact path='/'>  {/* Route :페이지 나누기 */}
          <Main items = {items} setItems ={setItems} cntClickMore = {cntClickMore} setCntClickMore={setCntClickMore}/>
          <ReviewList items = {items}/>
        </Route>
        <Route path='/detail/:id'>
          <Suspense fallback={<div><Spinner animation="border" /></div>}>
            <Detail items = {items} stock = {stock}  setRecentIds = {setRecentIds} />
          </Suspense>
        </Route>
        <Route path='/cart'>
          <Cart  user={user} />
        </Route>
        <Route path='/order'>
          <Order user={user} />
        </Route>
        <Route path='/result/:resultCode/:orderNum/:msg'>
          <Result />
        </Route>
        <Route path='/orderList'>
          <OrderList user={user}  />
        </Route>
        <Route path='/login'>
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route path='/searchOrder/:orderNum'>
          <SearchOrder />
        </Route>
        <Route path='/review/:id/:name/:size/:orderNum'>
          <Review user={user} />
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

  arrHtml =   arr.map((id)=>{
            let matchedItem = props.items.find((item)=> { return parseInt(item.id) === parseInt(id) })
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

//export default App;
function makeProps(store){
  return { 
      stateOrderItems : store.reducerOrderItems,
      stateOrderInfo : store.reducerOrderInfo,
      stateCart : store.reducerCart,
  }
  
}

export default connect(makeProps)(App);
