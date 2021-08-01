import React from 'react'
import {Table} from 'react-bootstrap';

function Posts(props) {
    return (
        <div>
            <Table bordered hover>
            <thead>
            <tr>
                <th>주문일</th>
                <th>주문번호</th>
                {/* <th>주문상품</th> */}
            </tr>
            </thead>
            <tbody>
            { 
                props.currentPosts.length === 0 
                    ? <tr><td colSpan="3">데이터가 존재하지 않습니다.</td></tr>
                    :  
                    props.currentPosts.map((x,i)=>{
                        return (
                            <tr key={x+i} 
                            
                                onClick = {()=>{ props.setSelOrderNum(x.orderNum)  }}> {/* selected 주문번호 변경 */}
                                <td>{x.date}</td>
                                <td>{x.orderNum}</td> 
                                </tr>
                            )
                    })
                }
                    
                </tbody>
            </Table>
        </div>
    )
}

export default Posts
