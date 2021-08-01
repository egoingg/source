import React from 'react';
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux';//step3:  import { connect } from 'react-redux';


//======================================================================================
//제목: props.dispatch({}) - reducer 에 수량변경 요청 사항 발송하기

//======================================================================================

function Cart(props)
{
    return(
        <Table responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경</th>
            </tr>
            </thead>
            <tbody>
            {
                props.state.map( (shoe)=> { 
                    return (
                        <tr>
                            <td>{shoe.id}</td>
                            <td>{shoe.name}</td>
                            <td>{shoe.quan}</td>
                            {/* 제목: props.dispatch({}) - reducer 에 수량변경 요청 사항 발송하기 */}
                            <td><button onClick={()=>{ props.dispatch({type:'수량증가'})}}>+</button>
                                <button onClick={()=>{ props.dispatch({type:'수량감소'})}}>-</button>
                            </td>
                        </tr>
                    )
                })    
            }
           
        </tbody>
      </Table>
    )
}

//step1: function만들기
//redux store 데이터 가져와서 props로 변환해주는 함수
function state를props화(state){
    return {
        //step4: 함수에서 sotre 데이터를 props로 등록하기 (porps작명)
        state: state //state라는 이름의 props로 바꿔주세요
    }
}

//step2:  export default connect(함수명)(Cart)
export default connect(state를props화)(Cart)
//export default Cart; 