import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {connect} from 'react-redux';

function Detail(props) {
    const history = useHistory()
    let { paramID } = useParams()
    let [isAlert, setAlert] = useState(true)
    let [selTabNum, setSelTabNum] = useState(0)

    const shoes = props.shoes

    paramID = 0

    let matched = shoes.find((shes) => {
       return shes.id == paramID
    })


    useEffect(()=>{
        //페이지 로딩되면 2c초 있다가 Alert 닫히게
        let timer = setTimeout(() => {
            setAlert(false)
        }, 2000);

        console.log("안녕")

        return (()=>{
            clearTimeout(timer)
        })
    }, [])

    return (
        <div className="container">
            {
                isAlert 
                ?<Alert/>
                :null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${paramID + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{matched.title}</h4>
                    <p>{matched.content}</p>
                    <p>{matched.price}</p>
                    <button className="btn btn-danger" onClick={ ()=>{ props.dispatch({ type:'항목추가', payload:matched })
                                                                        history.push('/cart')
                                                                        }}>주문하기</button>
                    <button className="btn btn-danger" onClick = { ()=>{ history.goBack()}}>뒤로가기</button>
                </div>
                <재고 재고={props.재고} />
            </div>
            
            <div className='TabGroup'>
                <button onClick = {()=>{ setSelTabNum(0) }}>상품tab</button>
                <button onClick = {()=>{ setSelTabNum(1) }}>배송tab</button>
                <button onClick = {()=>{ setSelTabNum(2) }}>후기tab</button>

                <TabInfo selTabNum = {selTabNum}/>
            </div>
        </div> 
    )
}

function TabInfo(props){
    const tabHtml = {
        0 : <div>상품tab</div>,
        1 : <div>배송tab</div>,
        2 : <div>후기tab</div>
    }

    return tabHtml[props.selTabNum]
//     switch (props.selTabNum) {
//         case 0:
//             return <div>상품tab</div>
//         case 1:
//             return <div>배송tab</div>  
//         case 2:
//             return <div>후기tab</div> 
//         default:
//             return null;
//     }
}




function Alert() {
    return(
        <div>재고가 얼마 남지 않앗습니다.</div>
    )
}

function 재고(props) {
    return(
        <div>재고는? {props.재고[0]}</div>
    )
}



function state를props화(store) {
    return {
        state : store.reducer,
    }
}

export default connect(state를props화)(Detail);
