import React from "react";
import {useHistory} from 'react-router-dom'; // step1: useHistory 훅 import

//======================================================================================
//제목: Route로 페이지 이동하는 버튼 만들기2 - history
//step1: step1: useHistory 훅 import
//
//step2: step2: useHistory() 훅 선언 - 방문기록 담긴 object 만듬
//      let history = useHistory()
//step3:  useHistory() 훅 사용
//     onClick={ ()=>{ history.goBack(); }
//     onClick={ ()=>{ history.push('/'); } /*  특정경로로 이동 */
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

function Detail()
{
    let history = useHistory(); // step2: useHistory() 훅 사용 - 방문기록 담긴 object 만듬
    return(
        <div className="container">
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">상품명</h4>
                <p>상품설명</p>
                <p>120000원</p>
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