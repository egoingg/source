import React from 'react';
import {Table, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
              <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>사이즈</th>
                    <th>수량</th>
                    <th>변경</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>

                { 
                    props.state.map((x,i)=>{
                        return (
                            <tr key={x+i}>
                                <td>{x.id}</td>
                                <td><div><img  class="img-thumbnail" src={'https://jungyooree.github.io/item' + (parseInt(x.id) + 1) + '.jpg' } width='40px'/><span>{x.name}</span></div></td>
                                <td>{x.size}</td>
                                <td>{x.quan}</td>
                                <td>
                                    <Button variant="outline-dark" onClick={ ()=>{ props.dispatch( {type:'수량증가', payload:{id:x.id, size:x.size}} ) }}>+</Button>&nbsp;
                                    <Button variant="outline-dark" onClick={ ()=>{ props.dispatch( {type:'수량감소', payload:{id:x.id, size:x.size}} ) }}>-</Button>
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
        </div>
    )
}

function makeProps(store){
    return { 
        state : store.reducerCart
    }
    
}

export default connect(makeProps)(Cart);
