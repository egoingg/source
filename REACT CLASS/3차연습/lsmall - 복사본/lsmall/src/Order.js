import React, {useState} from 'react';
import {Table, Button, Form, InputGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import randomNum from './randomNum.js'
import dateTimeFormat from './dateTimeFormat.js'
import './Order.css';

function Order(props) {
    const strBank = '1111-1111-1111(신한은행) shopmall';
    const 성공N = 1;
    const 실패N = 0;

    let history = useHistory()
    let totOrderPrice = 0
    let [objFormInfo, setFormInfo]= useState({orderName:'', tel:'', address:'', bank:strBank})
    let [payOpt,setPayOpt] =  useState(1) // 0: 계좌이체 1: 카드결제


    var IMP = window.IMP; // 생략가능
    IMP.init('imp03270318'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    let onSaveOrderItems = (ranNum)=>{
            console.log('onSaveOrderItems', props.stateTemp, ranNum)
            console.log('templength:', props.stateTemp.length)
            props.dispatch( {type:'주문상품저장',payload: props.stateTemp, orderNum:ranNum })
    }

    let onSaveOrderInfo = (ranNum, objImpRst = {})=>{
        console.log('----', objImpRst )
        console.log('----+++',objFormInfo.orderName)
        props.dispatch( {type:'주문정보저장', payload: { 
                                                        seq:0
                                                        , orderNum: ranNum
                                                        , orderName: objFormInfo.orderName
                                                        , tel: objFormInfo.tel
                                                        , address: objFormInfo.address
                                                        , paied: objImpRst.결과코드 === 1 ? 'Y' : 'N' 
                                                        , totPrice:totOrderPrice
                                                        , date: dateTimeFormat.yyyyMMddhhmmss_dash() 
                                                        , payCode: payOpt
                                                        , cardResultCode:objImpRst.카드승인번호
                                                        , bank:objFormInfo.bank
                                                    }})
    }

    let initCartState = ()=>{
        props.dispatch( {type:'장바구니초기화' })
    } 

    let IMP결제 = (ranNum)=>{
       
        let msg =''
        IMP.request_pay({
          pg : 'inicis', // version 1.1.0부터 지원.
          pay_method : 'card',
          merchant_uid : ranNum,//'merchant_' + new Date().getTime(),
          name : props.stateTemp.length > 0 ?  props.stateTemp[0].name + ' 외 기타' : props.stateTemp[0].name,
          amount : 10,
          buyer_email : 'iamport@siot.do',
          buyer_name : objFormInfo.orderName,
          buyer_tel : objFormInfo.tel,
          buyer_addr : objFormInfo.address,
          buyer_postcode : '',
          m_redirect_url : '/'
      }, function(rsp) {
          if ( rsp.success ) {  //카드결제 성공
              msg = `{
              "결과메시지":"결제가 완료되었습니다."
              ,"고유ID":"${rsp.imp_uid}"
              ,"주문번호":"${rsp.merchant_uid}"
              ,"결제금액":${rsp.paid_amount}
              ,"카드승인번호":${rsp.apply_num}
              ,"결과코드":${성공N}
              }`;

            //결제와 주문 정보 저장
            savePayAndOrderResultInfo(msg)

            //3. result 페이지로 이동
            history.push(`/result/${성공N}/`+ rsp.merchant_uid + '/' + `결제가 완료되었습니다.`)
          } else { //카드결제 실패
            console.log('imp결제')
              msg = `{
              "결과메시지":"결제에 실패하였습니다."
              ,"에러내용":"${rsp.error_msg}"
              ,"결과코드":${실패N}
              }`;

              history.push(`/result/${실패N}/000000/결제에 실패하였습니다. ${rsp.error_msg}`)
          }
          alert(msg);
          return msg;
      });
    
      }
    
    let savePayAndOrderResultInfo = (resultMsg)=>{
        alert(resultMsg);
        let objImpRst =   JSON.parse(resultMsg)

        //1. OrderItems 저장 (temp에 들은것)
        onSaveOrderItems(objImpRst.주문번호)
    
        //2. OrderInfo 저장
        onSaveOrderInfo(objImpRst.주문번호, objImpRst)

        //2. 장바구니 데이터 초기화(삭제)
        initCartState()
    }

    let changeFormInfo = (e, key) => {
        let obj = {...objFormInfo}
        obj[key] = e.target.value 
        setFormInfo(obj)
    }

    let  checkValidity =()=>{
        let isValidCommit = true;

        for (const key in objFormInfo) {
            if (!objFormInfo[key])
            isValidCommit = false
        }
        return isValidCommit;
    }

    let goPay = ()=>{
        //필수 입력사항 체크
        if (checkValidity() === false)
            return

        //결제옵션이 1 계좌이체면(payOpt =0) - 1.주문정보 저장 -> 결과창 이동
        //           2 card결제면(payOpt =1) - 1.카드결제 진행 -2. 결제 (성공) -> 주문정보 저장 -> 결과창 이동
        //                                                      2. 결제 (실패) ->                  결과창 이동

        if (payOpt === 1){  //  카드결제
            let resultMsg =''
            
            //0. 6자리 주문번호 생성
            let ranNum = parseInt(randomNum.authNo(6))

            //1.카드결제 진행 후 성공이면 주문정보 저장함
            resultMsg = IMP결제(ranNum)   
        }
        else if (payOpt === 0) // 계좌이체
        {
            //0. 6자리 주문번호 생성
            let ranNum = parseInt(randomNum.authNo(6))

            //1. OrderItems 저장 (temp에 들은것)
            onSaveOrderItems(ranNum)
            
            //2. OrderInfo 저장
            onSaveOrderInfo(ranNum)

            //2. 장바구니 데이터 초기화(삭제)
            initCartState()

            //3. 주문완료페이지로 이동
            history.push(`/result/${성공N}/`+ ranNum+ '/' + "주문이 완료되었습니다.")
        }
    }
    return (
        <div className='content'>
            <h3>ORDER</h3>
            <div>
                <Table responsive>
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
                    props.stateTemp.map((x,i)=>{
                        totOrderPrice += x.quanPrice
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
        </div>
        <hr></hr>
        <Form>
        <div className="row">
            <div className="col-md-6 left-section">
                <h5>배송 정보</h5>
                <hr></hr>
                    <Form.Group className="mb-3">
                        <Form.Label>수령인명</Form.Label> 
                        <InputGroup hasValidation>
                        {
                             objFormInfo.orderName 
                             ? <Form.Control type="text" required onChange={(e)=>{changeFormInfo(e, 'orderName')}} />
                             :<Form.Control type="text" required isInvalid onChange={(e)=>{changeFormInfo(e, 'orderName')}} />
                        }
                        <Form.Control.Feedback type="invalid">
                        수령인명을 입력하세요.
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>연락처</Form.Label>
                        <InputGroup hasValidation>
                        {
                             objFormInfo.tel
                             ?<Form.Control type="text" placeholder="010-0000-0000" required onChange={(e)=>{changeFormInfo(e, 'tel')}} />
                             :<Form.Control type="text" placeholder="010-0000-0000" required isInvalid onChange={(e)=>{changeFormInfo(e, 'tel')}} />
                        }
                        <Form.Control.Feedback type="invalid">
                        연락처를 입력하세요.
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>주소</Form.Label>
                        <InputGroup hasValidation>
                        {
                             objFormInfo.address 
                             ? <Form.Control type="text" required onChange={(e)=>{changeFormInfo(e, 'address')}} />
                             : <Form.Control type="text" required isInvalid onChange={(e)=>{changeFormInfo(e, 'address')}} />
                        }
                        <Form.Control.Feedback type="invalid">
                        주소를 입력하세요.
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                <h5>결제수단</h5>
                <hr></hr>
                <div>
                    <input type="radio"  id="radioDefault2" name ="radioPay" value = "카드결제" checked= {payOpt === 1 ? true : false} 
                    onChange={(e)=>{ setPayOpt(e.target.value === '카드결제' ? 1 : 0) 
                                        objFormInfo.bank = ''}}/>
                    <label for="radioDefault2">
                        카드결제
                    </label>
                </div>
                <div>
                    <input type="radio"  id="radioDefault1" name="radioPay"  value = "무통장입금" checked= {payOpt === 0 ? true : false} 
                    onChange={(e)=>{ setPayOpt(e.target.value === '무통장입금' ? 0 : 1) 
                                        objFormInfo.bank = strBank}}/>
                    <label for="radioDefault1">
                        무통장 입금
                    </label>
                    <p>{strBank}</p>
                </div>
            </div>
            <div className="col-md-6 right-section" >
                <h5>최종결제 금액</h5>
                <hr></hr>
                <p id ='totPrice'>{totOrderPrice.toLocaleString()} 원 </p>
                <p>총 상품금액 {totOrderPrice.toLocaleString()} 원 + 배송비 0 </p>
                <Button className="btn btn-success" size="lg" type ="button" onClick={ goPay }>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;결제하기 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> 
            </div>
        </div>
        </Form>
    </div>
    )
}

function makeProps(store){
    return { 
        stateTemp : store.reducerTemp,
        stateOrderItems : store.reducerOrderItems,
        stateOrderInfo : store.reducerOrderInfo,
        stateCart : store.reducerCart
    }
}

export default connect(makeProps)(Order);
