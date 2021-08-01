import React, {useEffect} from 'react';
import {Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Cart(props) {
    let history = useHistory()
    let totOrderPrice = 0;

    useEffect(() => {
             //임시주문 state 초기화 / 페이지 로드시 초기화
             console.log('8888888')
             props.dispatch({type:'임시주문초기화'})
             console.log('초기화후temp cnt:',props.stateTemp.length)
    }, [])

    return (
        <div className='content'>
            <h3>CART</h3>
              <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>사이즈</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>변경</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>

                { 

                    props.stateCart.length === 0 
                    ? <tr><td colSpan="7">장바구니가 비었습니다.</td></tr>
                    :   props.stateCart.map((x,i)=>{
                            totOrderPrice += x.quanPrice
                            return (
                                <tr key={x+i}>
                                    <td>{x.id}</td>
                                    <td><div><img  class="img-thumbnail" src={'https://jungyooree.github.io/item' + (parseInt(x.id) + 1) + '.jpg' } width='40px'/><span>{x.name}</span></div></td>
                                    <td>{x.size}</td>
                                    <td>{x.quan}</td>
                                    <td>{x.quanPrice.toLocaleString()}</td>
                                    <td>
                                        <Button variant="outline-dark" onClick={ ()=>{ props.dispatch( {type:'수량증가', payload:{id:x.id, size:x.size, price:x.price}} ) }}>+</Button>&nbsp;
                                        <Button variant="outline-dark" onClick={ ()=>{ props.dispatch( {type:'수량감소', payload:{id:x.id, size:x.size, price:x.price}} ) }}>-</Button>
                                    </td>          
                                    <td>
                                        <Button variant="dark" onClick={ ()=>{ props.dispatch( {type:'삭제', payload:{id:x.id, size:x.size}} ) }}>x</Button>
                                    </td>             
                                </tr>
                            )
                        })
                }
                    
                </tbody>
            </Table>
            <hr></hr>
            <div className="row">
                <div className="col-md-6 mt-4">
                    <p>총 상품금액 {totOrderPrice.toLocaleString()} 원 + 배송비 0 </p>
                </div>
                <div className="col-md-6  mt-4">
                    <p>총 주문금액 {totOrderPrice.toLocaleString()} 원 </p>
                </div>
            </div>
            <div >
                
                    <button className="btn btn-primary" size="lg" onClick={()=>{ history.push('/') }}>쇼핑계속하기</button>{' '} 
                    {props.stateCart.length === 0 
                    ? null
                    : <button className="btn btn-success" size="lg" onClick={()=>{
                            //임시주문 state 초기화
                            //props.dispatch({type:'임시주문초기화'})

                            //cart  정보를  임시주문 state에 저장
                            props.stateCart.map((obj)=>{
                                props.dispatch({type:'임시주문', payload:obj })
                            })
                            history.push('/Order')
                        }}>주문하기</button> 
                    }
            </div>

        </div>
    )
}

function makeProps(store){
    return { 
        stateCart : store.reducerCart,
        stateTemp : store.reducerTemp
    }
    
}

export default connect(makeProps)(Cart);
