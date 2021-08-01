import React , {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Container, Button,Nav,Table,ButtonGroup} from 'react-bootstrap';
import './Detail.css'
import { connect } from 'react-redux';
import jumbotron from './img/desc1.jpg'

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
        onAddRecentItems() //최근본 상품 구현을 위해 localStorage에 상품id 저장
        return () => { clearTimeout(timer) } // detail 컴포넌트 사라질때 실행할 코드
    }, [])

    let onSelectedTab = (x) =>{ 
        setSelectedTab(x)
    }

    let onAddRecentItems = () =>{ 
        // 1. 누가 Detail.js 페이지에 들어가면 

        // 2. localStorage에 있는 데이터를 꺼냅니다. 
        let items = localStorage.getItem('Recent')
        //console.log(items.size)
        let arr = []
        let maxSize = 3

        //  if (items !== null )
        //      if( JSON.parse(items).length >= maxSize)
        //      return

        //localStorage에 이미 값이 있으면  그 값을 arr로 변환
        if (items){
            // 3. 그럼 [0,1] 이런게 담긴 어레이가 나오겠죠.
            arr = JSON.parse(items)

            if( arr.length >= maxSize)
               arr.pop()
        }
        else
        {
            arr = []
        }

        // 4. 그럼 거기에 현재 페이지에 있는 상품번호 (예를 들면 현재 URL에 있는거)를 push합니다.
        arr.unshift(matchedItem.id)

        // 그럼 [0,1,1] 이런 식이 되겠죠. 

        // 5. 중복 숫자를 제거합니다.  Set 자료형 
        let mySet = new Set(arr)
        console.log('mySet',mySet)

        // 6. 중복 제거된 [] 어레이를 다시 localStorage에 저장합니다. 
        localStorage.setItem('Recent', JSON.stringify([...mySet]))
        //7. 최근본 상품 state에 저장
        props.setRecentIds([...mySet])
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
            <div><label htmlFor="">사이즈:</label>{' '}
            <ButtonGroup size="sm">
            {
                matchedItem.size.map((val)=>{ return <Button onClick= {()=>{ setSize(val)}}>{val}</Button>})
            }
            </ButtonGroup>
            </div><br/>
            <button className="btn btn-outline-primary" onClick={ ()=>{ 
                                                                props.dispatch( {type:'장바구니담기', payload:{id:matchedItem.id, name:matchedItem.title, quan:1, size:selSize, price:matchedItem.price, quanPrice:matchedItem.price}})
                                                                history.push('/cart')
                                                            }}>장바구니</button>{' '}
            <button className="mr-3 btn btn-primary" onClick={()=>{ history.goBack()}}>뒤로가기</button> 
            <Stock stock={props.stock} /> 
            {
                alertNotice === true
                ? ( 
                    <div className ='alert-notice'></div>
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
            <img src={jumbotron} alt="" />
            {/* {props.matchedItem.info} */}
            {/* <Table striped bordered hover variant="dark">
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
              </Table> */}
        </div>
    )
    else if (props.selectedTab === 1)
    return(
        <div>
        <p class="text-left">
            배송비:일반 상품은 1,000원 이상 결제 시 배송비가 무료입니다.<br/>
            1,000원 미만 결제 시 배송비 2,500원은 고객님 부담입니다.<br/>
            제주도/도서산간 지역:제주도는 기본 배송비 + 2,500원<br/>
            도서산간 지역은 기본 배송비 +5,000원의 추가 배송비(항공/도션료) 부담<br/>
            일부 도서산간 지역은 배송이 불가하거나 배송기간이 길어질 수 있습니다.<br/>
            결제 완료 후 영업일 기준 2~5일 이내에 배송이 됩니다.(금요일 오후, 주말/공휴일 결제 건은 3~6일 이내 배송)<br/>
            브랜드 및 품종이 다른 경우 개별(별도 포장)로 배송될 수 있습니다.<br/>
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