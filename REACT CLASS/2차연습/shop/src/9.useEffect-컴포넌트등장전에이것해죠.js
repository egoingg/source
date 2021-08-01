import React, { useEffect, useState } from "react"; //step1
import {useHistory, useParams} from 'react-router-dom'; //  useParams 훅 import

//======================================================================================
//제목: function 컴포넌트에서 사용하는 useEffect 훅 (컴포넌트의 인생 중간중간 Hook을 걸 수 있다.“Detail 컴포넌트 등장 전에 이것좀 해줘” )
//step1: 1. 근데 미리 페이지 상단에서 useEffect를 import 해오신 후
//
//step2:  2. useEffect() 를 사용하셔야합니다.
//
//step3: 3. 그리고 안에 콜백함수를 집어넣습니다. 
//
//step4: 4. 콜백함수 안에는 Detail 컴포넌트가 첫 등장하고나서 실행하고싶은 코드가 있으면 적어주면 됩니다.

//useEffect() 내의 코드의 실행조건
//– 컴포넌트가 첫 등장해서 로딩이 끝난 후에 (전문용어로 mount 끝났을 때)
//– 컴포넌트가 재렌더링 되고난 후 때 (전문용어로 update 되고난 후에)
//이제 Detail 컴포넌트 로드시나 업데이트시 뭔가 코드실행하고 싶은게 있으면 여기다 다 적으면 되겠죠?
//
//
//중요1 =>>>>>>컴포넌트 등장시 한번 실행하고 끝나게 하려면  [] 안에 조건을 넣지마,, 이건 트릭
//useEffect( 콜백함수, [] )

//중요2 =>>>>>>컴포넌트 등장시 한번 실행하고 업데이트 일어날때 마다 실행하고 싶으면  [] 안에 조건을 넣어
//useEffect( 콜백함수, [alert창상태] ) 이런식으로 alert창상태가 재랜더링(업데이트) 될때 마다 실행됨

//그리고 [] 대괄호 자체를 아예 빼고 안쓰면 컴포넌트 업데이트 될때마다 실행돰

//중요3 : useEffct 에서 return 쓰면 컴포넌트가 사라질때 실행할 코드를 실행한다. - timer해제도 return 여기서 하면 되겠지

//======================================================================================

function Detail(props)
{
    // Detail 컴포넌트가 로드시에만 2초 후에 alert 창 안보이게 하기 - useEffect사용

     // step2: useEffect( 실행할콜백함수 ) => useEffect(  setTimeout( 실행할콜백함수 , 초)  )
    let [alert창상태,alert창상태변경] = useState(true); 
     useEffect( ()=>{
         let timer = setTimeout( ()=>{alert창상태변경(false)}, 2000)  //2초후에 alert창 상태를 false로 변경(안보이게하려고)
         return ()=> { clearTimeout(timer)} //return  콜백함수 형식은 - detail 컴포넌트가 사자질때 실행함 함수 녛어주면 좋음
        
      }, []) //[] 안에 아무 조건없으니 로드시 한번만 실행됨 , [] 대괄호 자체를 빼면 안쓰면 컴포넌트 업데이트 돨때마다 실행안됨
    

    let {id} = useParams(); // 경로 통해 넘어온 파라미터값 받기 obj 형식 {} 으로 남어옴 , 여래개면 {id, id2, id3} 이런 형식
    console.log('id:',id);
    let history = useHistory(); //  useHistory() 훅 사용 - 방문기록 담긴 object 만듬

    let pd = props.data.find( (shoe)=>{ return shoe.id == id  } ); // parameter id 값과 일치하는 id값의 신발이 있으면 추출

    return(
        <div className="container">
        {
            alert창상태 === true
            ?  (<div className="alert">재고가 얼마남지 않았습니다.</div>)
            : null
        }
        <div className="row">
            <div className="col-md-6">
                <img src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    
                <h4 className="pt-5">{ pd.title}</h4> {/*  추출헌 값을 사용한다 */}
                <p>{ pd.content}</p>
                <p>{ pd.price}</p>
                <button className="btn btn-danger">주문하기</button> 
                <button className="btn btn-danger" onClick={ ()=>{ 
                    history.goBack(); {/*  history.goBack() */}
                    } }>뒤로가기</button> 
                 <button className="btn btn-danger" onClick={ ()=>{ 
                    history.push('/'); {/*  특정경로로 이동 */}
                    } }>HOME</button> 
            </div>
        </div>
    </div> 
    )
}

export default Detail; // export default export함변수명 or  함수명
// export { Detail, Motal } --- 여러개의 변수나 함수 내보내고 싶으면