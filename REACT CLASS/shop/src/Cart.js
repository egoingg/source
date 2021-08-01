import React  from 'react';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';

function Cart(props){  //step4 : props로 뱓기
    return (
        <div>
            <Table responsive="md">
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>수량</th>
                        <th>수량변경</th>
                    </tr>
                </thead>
                <tbody>
                {
                        props.state.map((value)=>{        {/*  step5 : props 이용*/}
                            return (
                                <tr>
                                    <td>{value.name}</td>
                                    <td>{value.quan}</td>
                                    <td>
                                        <button onClick = {()=>{props.dispatch( {type:'수량증가', payload:value.id})}}>+</button>
                                        <button onClick = {()=>{props.dispatch({type:'수량감소', payload:value.id})}}>-</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                 props.aler열렸니===true 
                 ? (
                    <div className="my-alert2">
                        <p>지금 구매하시면 할인 20%</p>
                        <button onClick={ ()=>{  props.dispatch({type:'닫기'}) }}>닫기</button>
                    </div>
                 )
                 :null
            }
          
        </div>
 

        
      


    )
}



// index.js에서 redux 감썬  컴포넌트에서 store에 있는 state를 쓰려면
//step1 : function 먼들기
//step2 : export default connect()()
//step3 : 함수에서 store 데이터를 props로 등록하기

function state를props화(store) // redux store 데이터 가져와서 props로 변환해주는 함수
{
    console.log(store)
    return{ 
        //state:store //step3: 함수에서 store 데이터를 props로 등록하기
        state:store.reducer, //step3: 함수에서 store 데이터를 props로 등록하기
        aler열렸니:store.reducer2
    }
}

export default connect (state를props화)(Cart) // export default connect (함수명)(Cart)
//export default Cart;