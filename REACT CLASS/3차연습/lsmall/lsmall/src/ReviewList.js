import React from 'react'
import { connect } from 'react-redux';
import { Table} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function ReviewList(props) {
    const history = useHistory()
    
    // 최신내역부터 보이게 역순으로 정렬시키기
    props.stateReview.sort((a,b)=> b.seq - a.seq)

    const gotoDetail = (id) =>{
        let matchedItem = props.items.find((item)=> { return parseInt(item.id) === parseInt(id) })

        if(!matchedItem){
            alert('구매 후기에 해당하는 상품이 상품목록에 존재 하지 않습니다.')
            return
        }
        history.push('/detail/' + id)
        window.scrollTo(0,0)
    }
    return (
        <div className='container'>
            <Table sizesize="sm" className="text-left" >
                <thead>
                    <tr>
                    <th colSpan='3' className="text-center">구매후기</th>
                    </tr>
                </thead>
                <tbody>
             {
                props.stateReview.map((x, idx)=>{ 
                    if (idx < 10) // 10줄 까지만 보이게
                    return (
                    <tr className="text-left" >
                     <td colSpan="2" className="text-left"  style={{cursor:'pointer'}} onClick={()=>gotoDetail(x.id)}>[{x.score}]      {x.content}</td>
                    <td colSpan="1" className="text-left" style={{cursor:'pointer'}} onClick={()=>gotoDetail(x.id)}>{x.name} {x.size} </td>
                    </tr>)
                })
            }
                </tbody>
            </Table>
        </div>
    )
}

function makeProps(store){
    return {
        stateReview : store.reducerReview,
    }
}

export default connect(makeProps)(ReviewList)
