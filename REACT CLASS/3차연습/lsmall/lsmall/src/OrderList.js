import React, {useState, useEffect} from 'react'
import {Table, InputGroup, FormControl, Button} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { db} from './index.js';
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";
import Posts from './Posts.js'
import PostsPagination from './PostsPagination.js'

function OrderList(props) {
    let history = useHistory()
      // orderinfo 최신내역부터 보이게 역순으로 정렬시키기
    props.stateOrderInfo.sort((a,b)=> parseInt(b.orderNum) - parseInt(a.orderNum))

    let [searchOrderNum, setSearchOrderNum] = useState('')
    

    let getInitOrderNum = ()=>{
        let number = ''
        if (props.stateOrderInfo.length > 0)
        {
            number = props.stateOrderInfo[0].orderNum
        }
        return number
    }

    let [selOrderNum, setSelOrderNum] = useState(getInitOrderNum()) //orderlist에서 selected 주문번호

    const handleSearchOrderNum = ()=>{
        history.push(`/searchOrder/${searchOrderNum}`)
    }
    return (
        <div className= "content" >
            <h3>ORDER LIST</h3>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="검색할 주문번호를 입력하세요."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e)=>{ setSearchOrderNum(e.target.value) }}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={handleSearchOrderNum}>
                검색
                </Button>
            </InputGroup>
           
            <Orders stateOrderInfo = {props.stateOrderInfo}  selOrderNum = {selOrderNum} setSelOrderNum = {setSelOrderNum} />
            {
               props.stateOrderInfo && props.stateOrderInfo.length > 0  
               ?<OrderDetail orderInfo = {props.stateOrderInfo} orderItems = {props.stateOrderItems} selOrderNum = {selOrderNum}  setSelOrderNum = {setSelOrderNum} />
               : null
            }
        
        </div>
    )
}


function Orders(props){
    const [currentPage, setCurrentPage] = useState(1)//currentPage는 현재 페이지
    const [postsPerPage] = useState(5)//한 페이지에서 보여줄 post의 수

    const indexOfLastPost = currentPage * postsPerPage //해당 페이지에서 마지막 post의 index 번호
    const indexOfFirstPost = indexOfLastPost - postsPerPage //해당 페이지에서 첫번째 post의 index 번호
    const currentPosts = props.stateOrderInfo.slice(indexOfFirstPost, indexOfLastPost) //currentPosts는 각 페이지에서 보여질 포스트 배열
    
    const totalPosts= props.stateOrderInfo.length //전체 post의 개수
    return(
        <div>
            <Posts currentPosts={currentPosts} setSelOrderNum = {props.setSelOrderNum}/>
            <PostsPagination postsPerPage={postsPerPage} totalPosts={totalPosts} currentPage ={currentPage} setCurrentPage={setCurrentPage} />
        </div> 
    )
}

//ORDER LIST 상세 Modal
function OrderDetail(props) {

    let selOrderNum = props.selOrderNum
    const history = useHistory()
    let matchedInfo =props.orderInfo.find((x)=> { return x.orderNum === selOrderNum })
    let matchedItems =props.orderItems.filter((x)=> { return x.orderNum === selOrderNum })


        
    const handleReview =(id, name, size, orderNum)=>{
        history.push(`/review/${id}/${name}/${size}/${orderNum}`)
    }
    return (
        <div>
            <hr></hr>
            <h5>주문 상세정보</h5>
            
            <div className = 'topDetail'>
                <p><span>주문일시{' '}{matchedInfo.date}</span><span>주문번호{' '}{selOrderNum}</span></p>
                
            </div>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>상품명</th>
                    <th>옵션</th>
                    <th>수량</th>
                    <th>가격</th>
                    <th>후기</th>
                </tr>
                </thead>
                <tbody>

                { 
                     matchedItems.map((x,i)=>{
                        return (
                            <tr key={x+i}>
                                <td><div><img  class="img-thumbnail" src={'https://jungyooree.github.io/item' + (parseInt(x.id) + 1) + '.jpg' } width='60px'/><span>{x.name}</span></div></td>
                                <td>{x.size}</td>
                                <td>{x.quan}</td>
                                <td>{x.quanPrice.toLocaleString()}</td>           
                                <td><Button onClick={()=>{handleReview(x.id, x.name, x.size, x.orderNum)}}  disabled = {x.isReview ? true : false }>{x.isReview ? '완료' : '쓰기' }</Button></td>      
                            </tr>
                        )
                    })
                }
                    
                </tbody>
            </Table>
            <hr></hr>
            <div className="row">
                <div className="col-md-6 left-section">
                    <h5>배송지 정보</h5>
                    <hr></hr>

                    <div className="row">
                        <div className="col-md-6">수령인</div>
                        <div className="col-md-6">{matchedInfo.orderName}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">연락처</div>
                        <div className="col-md-6">{matchedInfo.tel}</div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">배송지</div>
                        <div className="col-md-6">{matchedInfo.address}</div>
                    </div>
                    <h5>결제 수단 정보</h5>
                    <hr></hr>
                    {
                        matchedInfo.payCode === 0
                        ? <p>무통장 입금: {matchedInfo.bank}<br/>결제완료여부: {matchedInfo.paied === 'Y' ? '결제완료' : '입금대기중'}</p>
                        : <p>카드결제 승인번호: {matchedInfo.cardResultCode}<br/>결제완료여부: {matchedInfo.paied === 'Y' ? '결제완료' : '미결제'}</p>
                    }
                </div>
                <div className="col-md-6 right-section" >
                    <h5>결제 금액 정보</h5>
                    <hr></hr>
                    <p id ='totPrice'>{matchedInfo.totPrice.toLocaleString()}원 </p>
                </div>
            </div>
            
        </div>
    )
}

function makeProps(store){
    return { 
        stateOrderItems : store.reducerOrderItems,
        stateOrderInfo : store.reducerOrderInfo
    }
    
}

export default connect(makeProps)(OrderList);