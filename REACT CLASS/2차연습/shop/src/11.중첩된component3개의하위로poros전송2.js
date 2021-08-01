import React, { useEffect, useState } from "react"; //step1
import {useHistory, useParams} from 'react-router-dom'; //  useParams 훅 import

//======================================================================================
//======================================================================================

function Detail(props)
{
    // Detail 컴포넌트가 로드시에만 2초 후에 alert 창 안보이게 하기 - useEffect사용

     // step2: useEffect( 실행할콜백함수 ) => useEffect(  setTimeout( 실행할콜백함수 , 초)  )
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
                    }}>주문하기</button> 
                <button className="btn btn-danger" onClick={ ()=>{ 
                    history.goBack(); {/*  history.goBack() */}
                    } }>뒤로가기</button> 
                 <button className="btn btn-danger" onClick={ ()=>{ 
                    history.push('/'); {/*  특정경로로 이동 */}
                    } }>HOME</button> 
            </div>
        </div>
    </div> 
    )
}

function Info(props){
    return(
        <p>재고:{props.재고[0]}</p>
    )
}

export default Detail; // export default export함변수명 or  함수명
// export { Detail, Motal } --- 여러개의 변수나 함수 내보내고 싶으면