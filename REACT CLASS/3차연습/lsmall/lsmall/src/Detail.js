import React , {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Nav, ToggleButton,ToggleButtonGroup} from 'react-bootstrap';
import './Detail.css'
import { connect } from 'react-redux';
//import jumbotron from './img/desc1.jpg'

function Detail(props) {
    let history = useHistory()
    let {id} = useParams()
    let [selSize, setSize] = useState(95)
  
    // url parameter로 받아온 id에 해당하는 item을 props에서 찾아옴
    let matchedItem = props.items.find((item)=> { return parseInt(item.id) === parseInt(id) })
    let [alertNotice,setAlertNotice] =  useState(true)
    let [selectedTab, setSelectedTab] = useState(0)
    let [matchedReviewCnt, setMatchedReviewCnt] = useState(0)

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

        // 4. 그럼 거기에 현재 페이지에 있는 상품번호 (예를 들면 현재 URL에 있는거)를 push
        arr.unshift(matchedItem.id)

        // 그럼 [0,1,1] 이런 식이 되겠. 

        // 5. 중복 숫자를 제거합니다.  Set 자료형 
        let mySet = new Set(arr)
        console.log('mySet',mySet)

        // 6. 중복 제거된 [] 어레이를 다시 localStorage에 저장. 
        localStorage.setItem('Recent', JSON.stringify([...mySet]))
        //7. 최근본 상품 state에 저장
        props.setRecentIds([...mySet])
    }

    return (
    <div className="container">
        <div className="row mt-3">
          <div className="col-md-6">
            <img src={'https://jungyooree.github.io/item' + (parseInt(matchedItem.id) + 1) + '.jpg'} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{matchedItem.title}</h4>
            <p>{matchedItem.content}</p>
            <p>{matchedItem.price.toLocaleString()}원</p>
            <div><label htmlFor="">사이즈:</label>{' '}
            <ToggleButtonGroup type="radio" name="options" defaultValue={matchedItem.size[0]}>
            {
                matchedItem.size.map((val, idx)=>{ 
                    return<ToggleButton id={`tbg-radio-${idx}`} value={val}  onChange={() => setSize(val)}>{val} </ToggleButton>
                })
            }
            </ToggleButtonGroup>
            </div><br/>
            <button className="btn btn-outline-primary" onClick={ ()=>{ 
                                                                props.dispatch( {type:'장바구니담기', payload:{id:matchedItem.id, name:matchedItem.title, quan:1, size:selSize, price:matchedItem.price, quanPrice:matchedItem.price}})
                                                                history.push('/cart')
                                                            }}>장바구니 담기</button>{' '}
            <button className="mr-3 btn btn-primary" onClick={()=>{ history.goBack()}}>뒤로가기</button> 
            {
                alertNotice === true
                ? ( 
                    <div className ='alert-notice'></div>
                )
                : null
            }
          </div>
        </div>

        <div className="row mt-4">
            <div className="col-md-6">
                <Nav fill variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" onClick={ ()=>{ onSelectedTab(0) }} >상품정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2"  onClick={ ()=>{ onSelectedTab(1) }}>구매후기 ({matchedReviewCnt})</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1"  onClick={ ()=>{ onSelectedTab(2) }}>배송안내</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        </div>
        <TabContent selectedTab = {selectedTab} setMatchedReviewCnt = {setMatchedReviewCnt}  stateReview = {props.stateReview} id = {id}/>
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
    let arrHtml=[];
    let matchedReviews = props.stateReview.filter((x)=>{ return x.id === props.id})
    props.setMatchedReviewCnt(matchedReviews.length)

    if (matchedReviews.length === 0) 
    arrHtml = <div><p className="text-center mt-4">후기가 없습니다.</p></div>
    else{
    arrHtml =  matchedReviews.map((x)=>{
        return(
            <div className="row" key={x.seq} style={{ cursor:'pointer'}}>
                <div className="col-md-6 mt-4">
                     <p className="text-left mt-4 mb-4">{x.score}</p>
                     <p className="text-left mt-4 mb-4">{x.content}</p>
                     <p className="text-left mt-4" >{x.uname}</p>
                     {/* <p className="text-left mt-4" >{x.date ? dateTimeFormat.yyyyMMdd_dash(x.date.toDate()) : ''}</p> */}
                     <p className="text-left mt-4" >{x.date.toLocaleString()}</p>
                     <hr />
                 </div>
                 <div className="col-md-6 mt-4">
                     <img src={x.img} style ={{maxWidth:"25%"}} />
                 </div>
            </div>
        )
      })
    }
    if (props.selectedTab === 0)
    return(
        <div className="mt-3">
            {/* <img src={jumbotron} alt="" /> */}
            <img src={'https://jungyooree.github.io/item' + (parseInt(props.id) + 1) + '_desc.jpg'} style ={{maxWidth:"100%"}} />
        </div>
    )
    else if (props.selectedTab ===1)
     return (
        <div>
            { arrHtml}
        </div>
     )
     else if (props.selectedTab === 2)
     return(
         <div className='mt-3'>
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
        state : store.reducerCart,
        stateReview : store.reducerReview,
    }
}

export default connect(makeProps)(Detail)