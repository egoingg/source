import React from "react";
import {useHistory, useParams} from 'react-router-dom'; // step2: useParams 훅 import

//======================================================================================
//제목: url parameter로 상세페이지 여러개 만들기
// detail/0 or detail/1 or detail/2
//step1:  경로에 파라미터 형식 설정 
//<Route path='/detail/:id'> {/* /:id 에서 ':id' 의미는 그자리에 아무 글자가 들어갈수 있다. */}
//
//step2:  detail.js 파일에서 경로 통해 넘어온 파라미터값 받을 useParams() 함수 로 paramter 값ㅂ 추출
//
//step3:  detail.js 파일에서 추출헌  parameter중에 id 값을 사용한다
//
//step4:

//제목:
//step1: 
//
//step2:  
//
//step3:  
//
//step4:
//======================================================================================

function Detail(props)
{
    let {id} = useParams(); // step2: 경로 통해 넘어온 파라미터값 받기 obj 형식 {} 으로 남어옴 , 여래개면 {id, id2, id3} 이런 형식
    console.log('id:',id);
    let history = useHistory(); //  useHistory() 훅 사용 - 방문기록 담긴 object 만듬

    let pd = props.data.find( (shoe)=>{ return shoe.id == id  } ); // step3: parameter id 값과 일치하는 id값의 신발이 있으면 추출

    return(
        <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    
                <h4 className="pt-5">{ pd.title}</h4> {/* step3:    추출헌 값을 사용한다 */}
                <p>{ pd.content}</p>{/* step3:    추출헌 값을 사용한다 */}
                <p>{ pd.price}</p>{/* step3:    추출헌 값을 사용한다 */}
                <button className="btn btn-danger">주문하기</button> 
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

export default Detail; // export default export함변수명 or  함수명
// export { Detail, Motal } --- 여러개의 변수나 함수 내보내고 싶으면