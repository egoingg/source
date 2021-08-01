import { db} from '../index.js';
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";

let getOrderInfo = (orderNum) => {
    //로드 from db 
    var arrObj = []
    var arrObj1 = []
    var result = []

    console.log(orderNum)
    async function getInfoFromDb(){
                                    db.collection('orderinfo').get().then((결과)=>{
                                        결과.forEach((row)=>{
                                            
                                            if (row.data().orderNum == orderNum){
                                                //주문번호에 히당하는 정보
                                                arrObj.push(row.data())
                                                console.log('444',arrObj)
                                            }
                                                


                                        })
                                        //props.dispatch( {type:'주문정보초기화', payload: arrObj})
                                    })
                                // console.log('저장전selOrderNum', selOrderNum)
                                // setSelOrderNum(getInitOrderNum())
                                // console.log('저장후selOrderNum', selOrderNum)
    }
    
    getInfoFromDb().then(function(){
                                    db.collection('orderitems').get().then((결과)=>{
                                        결과.forEach((row)=>{
                                            if (row.data().orderNum == orderNum) //해당 주문번호의 정보만 추출
                                                arrObj1.push(row.data())
                                        })
                                        //props.dispatch( {type:'주문상품초기화', payload: arrObj1})
                                    })
    })
    console.log(arrObj)

    return arrObj;
}

export default getOrderInfo;