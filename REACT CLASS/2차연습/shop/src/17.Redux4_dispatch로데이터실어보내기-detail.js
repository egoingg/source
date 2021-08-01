import React, { useContext, useEffect, useState } from "react"; //step1
import {useHistory, useParams} from 'react-router-dom'; //  useParams 훅 import
import { Nav } from 'react-bootstrap';
import {재고context} from './App.js';
import { connect } from "react-redux";

//======================================================================================
//제목: 주문하기 버튼 클랙했을때  redux 방식으로 수정 요청하기 ( cart 데이터 추가요청이고 index.js로요청)
//dispatch()로 수정요청할때 데이터를 실어 보낼수 있음
//step1: store데이터를 props화 하는 함수 선언
//
//step2: export 구문 수정 => export default connect() 이용하여서
//import { connect } from "react-redux";
//step3: 실어보낼 데이터를 dispatch()를 사용하여 작성
//
//======================================================================================

function Detail(props)
{
    let [tab선택,tab선택변경] = useState(0);

    // Detail 컴포넌트가 로드시에만 2초 후에 alert 창 안보이게 하기 - useEffect사용

     //  useEffect( 실행할콜백함수 ) => useEffect(  setTimeout( 실행할콜백함수 , 초)  )
    let [alert창상태,alert창상태변경] = useState(true); 
     useEffect( ()=>{
         let timer = setTimeout( ()=>{alert창상태변경(false)}, 2000)  //2초후에 alert창 상태를 false로 변경(안보이게하려고)
         return ()=> { clearTimeout(timer)} //return  콜백함수 형식은 - detail 컴포넌트가 사자질때 실행함 함수 녛어주면 좋음
        
      }, []) //[] 안에 아무 조건없으니 로드시 한번만 실행됨 , [] 대괄호 자체를 빼면 안쓰면 컴포넌트 업데이트 돨때마다 실행됨
    

    let {id} = useParams(); // 경로 통해 넘어온 파라미터값 받기 obj 형식 {} 으로 남어옴 , 여래개면 {id, id2, id3} 이런 형식
    console.log('id:',id);
    let history = useHistory(); //  useHistory() 훅 사용 - 방문기록 담긴 object 만듬

    let pd = props.data.find( (shoe)=>{ return shoe.id == id  } ); // parameter id 값과 일치하는 id값의 신발이 있으면 추출

    return(
        <div className="container">
        {
            alert창상태 === true
            ?  (<div className="alert">재고가 얼마남지 않았습니다.</div>)
            : null
        }
        <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    
                <h4 className="pt-5">{ pd.title}</h4> {/*  추출헌 값을 사용한다 */}
                <p>{ pd.content}</p>
                <p>{ pd.price}</p>
                <Info 재고= {props.재고}/>
                <button className="btn btn-danger" onClick={ ()=>{
                    props.재고변경([9,10,11]);
                    props.dispatch({type:'cart에항목추가', payload:{ id:pd.id, name:pd.title, quan:1 }});//step3: reducer로 수정요청할때 실어보낼 데이터를 dispatch()를 사용하여 작성
                    history.push('/cart'); {/*  특정경로로 이동 */}
                    }}>주문하기</button> 
                <button className="btn btn-danger" onClick={ ()=>{ 
                    history.goBack(); {/*  history.goBack() */}
                    } }>뒤로가기</button> 
                <button className="btn btn-danger" onClick={ ()=>{ 
                    history.push('/'); {/*  특정경로로 이동 */}
                    } }>HOME</button> 

                <Nav variant="tabs" defaultActiveKey="0">
                    <Nav.Item>
                        <Nav.Link eventKey="0" onClick={ ()=>{ tab선택변경(0) }}>Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="1" onClick={ ()=>{ tab선택변경(1) }}>Option 2</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabComp tab선택 = {tab선택}></TabComp>
            </div>
        </div>
    </div> 
    )
}

function TabComp(props)
{
    if (props.tab선택 === 0){
       return <div>0번째 내용임</div>
    }
    else if (props.tab선택 === 1) {
       return <div>1번째 내용임</div>
    }
}

// function Info(props){
//     return(
//         <p>재고:{props.재고[0]}</p>
//     )
// }

function Info(){
    let 재고 = useContext(재고context); // useContext(범위이름)로 공유된 값 받아오기
    return(
        <p>재고:{재고[0]}</p>
    )
}


//step1: store데이터를 props화 하는 함수 선언
// function만들기
//redux store 데이터 가져와서 props로 변환해주는 함수
function state를props화(state){
    return {
        //함수에서 sotre 데이터를 props로 등록하기 (porps작명)
        // state: state //state라는 이름의 props로 바꿔주세요

        state: state.reducer
        , alert상태값: state.reducer2
    }
}
//step2: export 구문 수정 => export default connect() 이용하여서
export default connect(state를props화)(Detail)
//export default Detail; // export default export함변수명 or  함수명
// export { Detail, Motal } --- 여러개의 변수나 함수 내보내고 싶으면

