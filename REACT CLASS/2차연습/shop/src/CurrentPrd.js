import React from "react"; //step1
import './CurrentPrd.css';


function CurrentPrd(props)
{
    let a = props.currPrd
    let newarry = JSON.parse(a) //json string ->배열로 변환 
    console.log('currentprd:',newarry)

    let matchedArry = []

    for (const id of newarry) {
       let find = props.data.find((shoe)=>{
            return shoe.id == id
        })

        matchedArry.push(find)
    }

    console.log('matchedArry:',matchedArry)



    return(
            <div className="container_CurrentPrd">
                <h4>최근본상품</h4>
                {
                 matchedArry.map((shoe)=>{ 
                    return (
                        <div>
                            <p>{shoe.title}</p>
                            <p><img src={`https://codingapple1.github.io/shop/shoes${Number(shoe.id)+1}.jpg`} width="50%" /></p>
                            <p>{shoe.price}</p> 
                        </div>
                    )

                 })  
                          
                        
                      
                    }
                
             
            </div>
    )
}
export default CurrentPrd;