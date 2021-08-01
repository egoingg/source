import logo from './logo.svg';
import { Navbar , Nav, NavDropdown,Form, FormControl, Button, Jumbotron } from 'react-bootstrap';
import React , { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Route, Link, Switch} from 'react-router-dom';
import axios from 'axios'; // ajax 요청할수 있는 라이브러리 , 먼저 설치 하고 import 해야함 (설치구문...은 yarn add axios)
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import Cart from './Cart.js';

//createContext 작성 위치는 App() 벗어나서 위에 
export let 재고context = React.createContext();

function App() {
  let [shoes,setShoes] = useState(Data); 
  let [useIsLoading, setIsLoading] = useState(false);
  let [재고,재고변경] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link><Link to='/'>Home</Link></Nav.Link>
            <Nav.Link><Link to='/detail'>Detail</Link></Nav.Link>
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

      <Switch> {/*선택 하나만 해라, 경로가 공통되는 부분이 잇는 router가 있으면 제일 위에거 보여줌 */}
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          
          <div className="container">
            <재고context.Provider value={재고} >
                <div className="row">
                {
                  shoes.map( function(a, i){
                      return (<Product pds = {shoes} pd = {a} idx = {i}  />)
                  })
                }
                </div>
            </재고context.Provider>
            <Button className="btn btn-primary" onClick = {() => {
              // 버튼 누르면 서버에 데이터 요청 , get 방식은 보통 데이터 읽기 요청할때 씀 , ajax 쓰면 새로고침없이 데이터를 받아올수 있다. 그게 ajex스는 이유임 
              
              //로딩창 show
              setIsLoading(true);
             
              //axios.post('서버url', {id:'ellie', pw:'dreamcoding'}); // 서버로 몰래 새로고침 안되고 데이터 전송하고 싶을때 사용 / axios.post('서버url', '보낼 데이터');
              
              //1. axios.get(데이터요청할 url) , get 요청은 브라우저 url 창에 입력해도 요청하는 거임.
              axios.get("https://codingapple1.github.io/shop/data2.json") //get 함수로 url 페이지로 요청
              .then( (result)=> { // then 요청이 성공시 실행, 그냥 콜백함수 녛어서 실행함 내용 써줌, axios쓰면 json을 object로 알아서 바꿔서 넘겨줌

                //로딩창 no show
                setIsLoading(false);

                  console.log(result.data);

                  //get 성공하면 받은 데이터를 화면에 뿌리게.. 하려면 그냥 state 값만 변경하면 자동으로 업데이트 되겟지
                  let newShoes = [...shoes];
                  console.log(newShoes);
                  //newShoes.concat(result.data);
                  newShoes.push(...result.data);
                  console.log(newShoes);
                  setShoes(newShoes);

                 // setShoes([...shoes , ...result.data]); //...은 [] 를 벗긴다. [ {},{}]  => {},{}
              } ) 
              .catch( (err)=> { 
                console.log(`실패했어요: ${err}`);
                //로딩창 no show
                setIsLoading(false);
              
              } )// catch 요청 실패시 실행
            }
            }>더보기</Button>

              
            { 
              //로딩창 보이기 유무
              useIsLoading === true? <LoadingData />:null 
            } 

          </div>

      </Route>
        <Route path="/detail/:id">
          <재고context.Provider value={재고}>
                <Detail pds = {shoes} 재고 = {재고} 재고변경 = {재고변경}/>
          </재고context.Provider>
        </Route> 
        <Route path="/cart"> 
            <Cart />
        </Route>
        <Route path="/:id"> {/*모든 문자라는 경로를 의미 */}
            <div>아무거나 보여주세요</div>
        </Route>
      </Switch>
    </div>
  );
}

function Product(props){
  console.log(props.pd.id);
  let num = Number.parseInt(props.pd.id) +1;
  let imgpath = `https://codingapple1.github.io/shop/shoes${num}.jpg`;
  console.log(imgpath);

  let 재고 = useContext(재고context);
  let history = useHistory();

  return(
    <div className="col-md-4" onClick = { () => { history.push('/detail/' + props.pd.id)}}>
              <img src={imgpath} alt=""/>
              <h4>{props.pd.title}</h4>
              <p>{props.pd.content} & {props.pd.price}</p>

              <p>재고:{재고[props.idx]}</p>
    </div>
  );
}

function LoadingData(){
  return(
          <div>
              <p>데이터 로딩중...</p>
          </div>
  );
}



 
export default App;
