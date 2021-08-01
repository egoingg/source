import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import {Table,Spinner} from 'react-bootstrap'
import { db} from './index.js';
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";

function SearchOrder() {
    let {orderNum} = useParams()
    let [orderInfo, setOrderInfo] = useState([])
    let [orderItems, setOrderItems] = useState([])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
    
        function 디비읽기(){
            setIsLoading(true)

            let arrObj = []
            db.collection('orderinfo').get().then((결과)=>{
                                                결과.forEach((row)=>{
                                                    
                                                    if (row.data().orderNum == orderNum){
                                                        //주문번호에 히당하는 정보
                                                        
                                                        arrObj.push(row.data())
                                                    }
                                                })
                
                                                setOrderInfo(arrObj)//props.dispatch( {type:'주문정보초기화', payload: arrObj})
                                            })
        
            let arrObj1 = []
            db.collection('orderitems').get().then((결과)=>{

                                                결과.forEach((row)=>{
                                                    if (row.data().orderNum == orderNum) //해당 주문번호의 정보만 추출
                                                    {
                                                        arrObj1.push(row.data())
                                                    }
                                                })
                                                
                                                setOrderItems(arrObj1)//props.dispatch( {type:'주문상품초기화', payload: arrObj1});
                                                setIsLoading(false)
                                            })
        }
        디비읽기();
        return () => {
            
        }
    }, [])

    return (
        <div className= "content">
          {
              orderInfo.length === 0
                ? <p>{ isLoading ? <Spinner animation="border" /> : '검색된 데이터가 없습니다.' }</p>
                : <OrderDetail orderInfo={orderInfo} orderItems={orderItems}/>
          }
        </div>
    )
}

function OrderDetail(props)
{
    let matchedInfo = props.orderInfo[0]
    let matchedItems = props.orderItems

    return(
        <div>
            <div className = 'topDetail'>
                <p><span>주문일시{' '}{matchedInfo.date}</span><span>주문번호{' '}{matchedInfo.orderNum}</span></p>
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

export default SearchOrder
