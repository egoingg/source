import React from 'react';
import {Table} from 'react-bootstrap';
import {connect} from 'react-redux';

function Cart(props){

    function TableRow(){
        let arrNew = []

        console.log(props.state)
       props.state.forEach((x) => {
        arrNew.push(
                    <tr>
                        <td>{x.id}</td>
                        <td>{x.name}</td>
                        <td>{x.quan}</td>
                        <td><button onClick = { ()=>{ props.dispatch({type:'증가', payload:x.id })} }>+</button><button onClick = {()=>{ props.dispatch( {type:'감소', payload:x.id })}}>-</button></td>
                    </tr>
            )
       });
        return arrNew
    }

  return (
    <div>
      <Table responsive>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경</th>
        </tr>
        {/* <tr>
          <td>1</td>
          <td>{props.state[0].name}</td>
          <td>{props.state[0].quan}</td>
          <td></td>
        </tr> */}
       { TableRow()}

        {
            props.stateAlert === true 
            ?   <div className="my-alert2">
                    <p>지금 구매하시면 20% 할인</p>
                    <button onClick =  { ()=>{ props.dispatch({type:'닫기'})} }>닫기</button>
                </div>
            :   null
        }
      

      </Table>
    </div>
  )
}

function state를props화(store) {
    return {
        state : store.reducer,
        stateAlert : store.reducerAlert
    }
}

export default connect(state를props화)(Cart);