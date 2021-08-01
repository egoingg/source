import React, { useEffect, useState } from 'react';
import {Form,Navbar,Container,Nav,Button } from 'react-bootstrap'; 
import { Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {db, storage, auth} from './index.js'
import Login from './Login.js'
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";

function App() {
  
  // let arrObj = []
  // let loadBoard = (() => {
  //     db.collection('board').get().then((결과)=>{
    
  //     결과.forEach((row)=>{
  //       arrObj.push(row.data())
  //     })
  //   })

  //   return arrObj
  // })

  let saveBoard = (() => {
    db.collection('board').add()
  })
  /////////////////////////////////////////////

  //let title = '강남 휘트니스'
  let [title,setTitle] = useState(['서초', '강남','강북'])
  let [thumbsUp,setthumbsUp] = useState([0,0,0])
  let [modal,setModal] = useState(false)
  let [index,setIndex] = useState(0)
  let [inputTitle, setInputTitle] = useState('')
  let [inputContent, setInputContent] = useState('')
  let [inputFile, setInputFile] = useState('')
  let [board,setBoard] = useState([]);
  let [user, setUser] = useState({});

  useEffect(() => {

    // state 초기값 로드 from db 

    // board 정보
      let arrObj = []
  
      db.collection('board').get().then((결과)=>{
        결과.forEach((row)=>{
          arrObj.push(row.data())
        })

        setBoard(arrObj)
        })

      // login user 정보
      auth.onAuthStateChanged((user)=>{
        setUser(user)
        
      })
    return () => {
    }
  }, [])

/**
 *  yyyyMMdd 포맷으로 반환
 */
 function getFormatDate(date){
  var year = date.getFullYear();              //yyyy
  var month = (1 + date.getMonth());          //M
  month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
  var day = date.getDate();                   //d
  day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
  return  year + '/' + month + '/' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

  let date = new Date();
  date = getFormatDate(date);

  let onThumbsUp = (i) => {
    console.log('1111', i)
    let thumbsUpNew = [...thumbsUp]
    thumbsUpNew[i] = thumbsUpNew[i]+1
    setthumbsUp(thumbsUpNew)
  }

  let onTitleModify = ()=>{
    let titleNew = [...title]
    titleNew[0] = '여자추천코트'
    setTitle(titleNew)
  }

  let onSort = ()=>{
    let titleNew = [...title]
    let a = titleNew.sort()
    console.log(a)
    setTitle(a)
  }

  let onShowModal = (i)=>{
    setModal(true)

    setIndex(i)
  }

  let onPulish = () => {
   let arr =[...board]

     //1파일 업로드
     let file = inputFile
     console.log('file', file)
     let storageRef = storage.ref()
     let 저장할경로 = storageRef.child('image/' + file.name)
     let 업로드작업 = 저장할경로.put(file)

     업로드작업.on( 'state_changed', 
    // 변화시 동작하는 함수 
    null, 
    //에러시 동작하는 함수
    (error) => {
      console.error('실패사유는', error);
      alert(error)
      return
    }, 
    // 성공시 동작하는 함수
    () => {
        업로드작업.snapshot.ref.getDownloadURL().then((url) => {
          console.log('업로드된 경로는', url);

          
        let obj = { title:inputTitle
                    , content:inputContent
                    , date:''
                    , img:url
                    , uid: user ? user.uid : ''
                    , name: user ? user.displayName : ''
                  }

        console.log('obj', obj)
      //2 db board에 저장
        db.collection('board').add(obj).then((result)=>{
          console.log(result.id)
          
          //3 db 저장 성공하면  state에 저장
          arr.unshift(obj)
          setBoard(arr)

        }).catch((err)=>{
          alert(err)
        })

          });
        }
    );

    let thumbsUpNew = [...thumbsUp]
    thumbsUpNew.unshift(0)
    setthumbsUp(thumbsUpNew)
  }

  const handleOut = ()=>{auth.signOut().then((result)=>{
    //user 정보 state에 제거
    setUser(undefined)
})}  

  function list() {
    let arr = []
    console.log( ' user...',user )
    for (let i = 0; i < board.length; i++) {
      arr.push(
        <div className='list' key = {board[i].title + i}>
        <h3 onClick={ () => { onShowModal(i)} }>{board[i].title} <span onClick={ () => { onThumbsUp(i)} } style = { {cursor: 'pointer'}}>👍</span>{thumbsUp[i]} </h3>
        <p>날짜</p>
        <Form.Control as="textarea" rows={3} value={board[i].content}/>
        <hr />
        <p>{board[i].name}</p>
        {
          //현재 로그인된 uid와 작성자 uid가 같으면 수정 버튼 보여준다.
        
          user && user.uid === board[i].uid 
          ? <Button className="btn btn-success"  type ="button" >수정</Button>
          : null
        }
        
        </div>
      )

    }

    return arr
  }

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as = {Link} to ='/'>개발블로그</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              {user
              ? 
               
               <Nav className="me-auto">
                <span>{user.displayName}</span>
               <Nav.Link  as = {Link} to ='/' onClick={handleOut}>로그아웃</Nav.Link>
             </Nav>
              : 
              <Nav className="me-auto">
              <Nav.Link  as = {Link} to ='/login'>로그인</Nav.Link>
              <Nav.Link  as = {Link} to ='/login'>회원가입</Nav.Link>
            </Nav>
              }

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='content'>
      <Switch> {/* Switch :경로중복 방지..하나만 보여준다 */}
        <Route path='/login'>
          <Login user={user} setUser={setUser}/>
        </Route>
        <Route exact path='/'>
          <div className='publish'>
            {/* <input type='text'  /> */}
            <Form.Control type="text" placeholder="제목" onChange = { (e)=> { setInputTitle(e.target.value)} } />
            <Form.Control as="textarea" placeholder="내용" rows={3} onChange = { (e)=> { setInputContent(e.target.value)} } />
            <Form.Control type="file" onChange = { (e)=> { setInputFile(e.target.files[0])}} />
            {/* <textarea  cols="30" rows="10" onChange = { (e)=> { setInputContent(e.target.value)} } />
            <input type="file" id="image"  onChange = { (e)=> { setInputFile(e.target.files[0])}}></input> */}
            <button onClick= {onPulish}>저장</button>
          </div>

          <button onClick={ onTitleModify }>1번글 수정</button>
          <button onClick={ onSort }>글정렬</button>
        
          {
            list()
          }


          {
            modal === true
            ? <Modal title = {title} index ={index}/>
            : null
          }


        </Route>
      </Switch>
      </div>
      
    </div>
  );
}

function Modal(props) {
  return (
    <div className='Modal'>
      <h4>{props.title[props.index]}</h4>
      <p>날짜</p>
      <p>내용</p>
    </div>
  )
}


export default App;
