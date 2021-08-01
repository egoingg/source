import React, {useState} from 'react'
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';

function OrderList(props) {

      // orderinfo 최신내역부터 보이게 역순으로 정렬시키기
    props.stateOrderInfo.sort((a,b)=> b.seq - a.seq)

    let getInitOrderNum = ()=>{
        let number = ''
        if (props.stateOrderInfo.length > 0)
            number = props.stateOrderInfo[0].orderNum
        
        console.log(number)
        return number
    }

    let [selOrderNum, setSelOrderNum] = useState(getInitOrderNum()) //orderlist에서 selected 주문번호

    return (
        <div className= "content" >
            <h3>ORDER LIST</h3>
           
            <Orders stateOrderInfo = {props.stateOrderInfo}  setSelOrderNum = {setSelOrderNum} />
            {
               props.stateOrderInfo.length === 0  
               ? null
               :<OrderDetail orderInfo = {props.stateOrderInfo} orderItems = {props.stateOrderItems} selOrderNum = {selOrderNum} />
            }
        
        </div>
    )
}


function Orders(props){
    return(
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
              props.stateOrderInfo.length === 0 
                ? <tr><td colSpan="3">데이터가 존재하지 않습니다.</td></tr>
                :  props.stateOrderInfo.map((x,i)=>{
                      return (
                          <tr key={x+i} 
                          
                              onClick = {()=>{ props.setSelOrderNum(x.orderNum)  }}> {/* selected 주문번호 변경 */}
                              <td>{x.date}</td>
                              <td>{x.orderNum}</td> 
                              {/* <td><div><img  class="img-thumbnail" src={'https://jungyooree.github.io/item' + (parseInt(x.id) + 1) + '.jpg' } width='40px'/><span>{x.name}</span></div></td>
      */}
                              </tr>
                          )
                      })
              }
                  
              </tbody>
          </Table>
      </div> 
    )
}

//ORDER LIST 상세 Modal
function OrderDetail(props) {

    let selOrderNum = props.selOrderNum;
    console.log('selOrderNum', selOrderNum)
    let matchedInfo =props.orderInfo.find((x)=> { return x.orderNum === selOrderNum })
    let matchedItems =props.orderItems.filter((x)=> { return x.orderNum === selOrderNum })

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
                        ? <p>무통장 입금: {matchedInfo.bank} 결제완료여부: {matchedInfo.paied === 'Y' ? '결제완료' : '입금대기중'}</p>
                        : <p>카드결제 승인번호: {matchedInfo.cardResultCode} 결제완료여부: {matchedInfo.paied === 'Y' ? '결제완료' : '미결제'}</p>
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