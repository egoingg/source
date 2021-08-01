import React from 'react';
import {Table} from 'react-bootstrap'
import { connect } from 'react-redux';//step3:  import { connect } from 'react-redux';


//======================================================================================
//제목: redux - store에 있는 state 쓰려면 세팅
//용도: 깊은 하위컴포넌트들도 props 여러번 전송없이 statef를 직접 갖다쓸스 있음

//제목:
//step1: function만들기
//
//step2:  export default connect(함수명)(Cart)
//
//step3:  import { connect } from 'react-redux';
//
//step4: 함수에서 sotre 데이터를 props로 등록하기 (porps작명)
//
//step5: props자져다 쓰기
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
            <tr>
                <td>{props.state[0].id}</td>
                <td>{props.state[0].name}</td>
                <td>{props.state[0].quan}</td>
                <td></td>
            </tr>
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