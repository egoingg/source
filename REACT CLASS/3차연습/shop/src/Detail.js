import React , {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Container, Button,Nav,Table,ButtonGroup} from 'react-bootstrap';
import './Detail.css'
import { connect } from 'react-redux';

function Detail(props) {
    let history = useHistory()
    let {id} = useParams()
    let [selSize, setSize] = useState(95)

    // url parameter로 받아온 id에 해당하는 item을 props에서 찾아옴
    let matchedItem = props.items.find((item)=> { return parseInt(item.id) === parseInt(id) })
    // console.log('id',id)
    // console.log(props.items)
    // console.log('matchedItem',matchedItem)
    let [alertNotice,setAlertNotice] =  useState(true)
    let [selectedTab, setSelectedTab] = useState(0)

    useEffect(() => {
    let timer =  setTimeout(() => { setAlertNotice( false ) }, 2000); //처음 detail 컴포넌트 랜더링 되고나서 2초 후에 alert창 사라지게
    return () => { clearTimeout(timer) } // detail 컴포넌트 사라질때 실행할 코드
    }, [])

    let onSelectedTab = (x) =>{ 
        setSelectedTab(x)
        
    }

    return (
    <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={'https://jungyooree.github.io/item' + (parseInt(matchedItem.id) + 1) + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{matchedItem.title}</h4>
            <p>{matchedItem.content}</p>
            <p>{matchedItem.price.toLocaleString()}원</p>
            <div>사이즈:
            <ButtonGroup size="sm">
            {
                matchedItem.size.map((val)=>{ return <Button onClick= {()=>{ setSize(val)}}>{val}</Button>})
            }
            </ButtonGroup>
            </div><br/>
            <button className="btn btn-danger" onClick={ ()=>{ 
                                                                props.dispatch( {type:'장바구니담기', payload:{id:matchedItem.id, name:matchedItem.title, quan:1, size:selSize}})
                                                                history.push('/cart')
                                                            }}>주문하기</button> 
            <button className="btn btn-danger" onClick={()=>{ history.goBack()}}>뒤로가기</button> 
            <button className="btn btn-danger" onClick={()=>{ history.push('/')}}>홈가기</button> 
            <Stock stock={props.stock} /> 
            {
                alertNotice === true
                ? ( 
                    <div className ='alert-notice'>
                    <p>재고수량이 얼마 남지 않았습니다.</p>
                    </div>
                )
                : null
            }
          </div>
        </div>

        <div className="row">
            <div className="col-md-6">
                <Nav className ='mt-2' variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={ ()=>{ onSelectedTab(0) }} >상품정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"  onClick={ ()=>{ onSelectedTab(1) }}>배송안내</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
        <TabContent selectedTab = {selectedTab} matchedItem = {matchedItem}/>
    </div> 
    )
}

function Stock(props) {
    return (
        <div>
           재고수량 {props.stock[0]}
        </div>
    )
}

function TabContent(props){
    if (props.selectedTab === 0)
    return(
        <div>
            {/* {props.matchedItem.info} */}
            <Table striped bordered hover variant="dark">
              <thead>
                  <tr>
                  <th>제품소재</th>
                  <th>겉감 : 폴리에스터100% / 안감 : 폴리에스터100%</th>
                  </tr>
              </thead>
              <tbody >
                  <tr>
                  <td>색상</td>
                  <td>BLUE</td>
                  </tr>
                  <tr>
                  <td>치수 (단위 : cm)</td>
                  <td>Jacob</td>
                  </tr>
                  <tr>
                  <td>제조사</td>
                  <td colSpan="2">Larry the Bird</td>
                  </tr>
              </tbody>
              </Table>
        </div>
    )
    else if (props.selectedTab === 1)
    return(
        <div>
        <p class="text-left">
            배송비:일반 상품은 1,000원 이상 결제 시 배송비가 무료입니다.
            1,000원 미만 결제 시 배송비 2,500원은 고객님 부답입니다.
            제주도/도서산간 지역:제주도는 기본 배송비 + 2,500원
            도서산간 지역은 기본 배송비 +5,000원의 추가 배송비(항공/도션료) 부담
            일부 도서산간 지역은 배송이 불가하거나 배송기간이 길어질 수 있습니다.
            결제 완료 후 영업일 기준 2~5일 이내에 배송이 됩니다.(금요일 오후, 주말/공휴일 결제 건은 3~6일 이내 배송)
            브랜드 및 품종이 다른 경우 개별(별도 포장)로 배송될 수 있습니다.
        </p>
    </div>
    )
    else
        return null

}

function makeProps(store){
    return {
        state : store.reducerCart
    }
}

export default connect(makeProps)(Detail)