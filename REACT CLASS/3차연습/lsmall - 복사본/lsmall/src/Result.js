import React, {useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './Result.css'

function Result() {
    let {resultCode, orderNum, msg} = useParams()
    let history = useHistory();

    useEffect(() => {
        //주문 , 결제 성공할때만
        console.log('resultCode',resultCode)

        if (resultCode != 1) return;
        
        let time = setTimeout(()=>{  history.push('/orderList')}, 3000)
        return () => {
            clearTimeout(time)
        }
    }, [])
    return (
        <div className='content'>
            <div className = 'result'>
                <div><p>{msg}</p></div>
                {
                    
                    resultCode == 1
                    ?
                        <div>
                            <p>주문번호:{orderNum}</p>
                            <p className="bold">잠시후 주문리스트로 이동합니다...</p>
                        </div>
                    : null
                }
                
            </div>
        </div>
    )
}

export default Result
