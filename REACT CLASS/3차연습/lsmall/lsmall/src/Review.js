import React, {useState} from 'react'
import { InputGroup, Form, Button,ToggleButtonGroup,ToggleButton} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { db, storage} from './index.js';
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";
import { useParams } from 'react-router-dom';
import dateTimeFormat from './dateTimeFormat.js'

function Review(props) {
    let {id, name, size, orderNum} = useParams()
    const history = useHistory()
    const [inputContent, setInputContent] = useState('')
    const [inputFile, setInputFile] = useState('')
    const [score, setScore] = useState(['★', '☆','☆','☆','☆']);
    const [starChecks, setChecks] = useState([false, false,false,false,false]);

    const handleSaveDb = (url)=>{
        //, 상품id,내용,이미지,, score,uid,uname ,날짜 
        let obj = { id:id
                , content:inputContent
                , img:url
                , score:score
                , name:name
                , size:size
                , uid: props.user ? props.user.uid : ''
                , uname: props.user ? props.user.displayName : ''
                , date: dateTimeFormat.yyyyMMddhhmmss_dash() //new Date()
        }
      
        props.dispatch({type:'리뷰정보저장', payload:obj})
        props.dispatch({type:'업데이트_리뷰작성여부', payload:{orderNum:orderNum, id:id}})//  orderInfoItems 의 isReview 를 true로 업데이트
    }

    const handleSave = () => {
        let file = inputFile
        let storageRef = storage.ref()
        let 저장할경로 = storageRef.child('image/' + file.name)
        let 업로드작업 = 저장할경로.put(file)
    
        if (file){ //파일이 있으면 : 파일업로드 하고 -> 디비 저장
            업로드작업.on( 'state_changed', 
                            // 변화시 동작하는 함수 
                            null, 
                            //에러시 동작하는 함수
                            (error) => {
                                console.error('실패사유는', error);
                                alert(error)
                                return
                            }, 
                            // 업로드 성공시 동작하는 함수
                            () => {
                                    업로드작업.snapshot.ref.getDownloadURL().then((url) => {
                                        // 파일 업로드가 성공하면 리뷰 정보를 디비에 저장
                                        handleSaveDb(url)
                                });
                            }
            );
        }else{ //파일 없으면 : 파일 업로드 X -> 디비 저장
            handleSaveDb('')
        }

        history.push('/')
    }

    const handleRating = (e) => {

        const tg = e.target

        if (tg.value == '1'){
            if (tg.checked){
                setScore(['★','☆','☆','☆','☆'])
                setChecks([true, false, false, false, false])
            }
            else{
                setScore(['★','☆','☆','☆','☆'])
                setChecks([true, false, false, false, false])
            }
        }
        else if (tg.value == '2'){
            if (e.target.checked){

                setScore(['★','★','☆','☆','☆'])
                setChecks([true, true, false, false, false])
            }
            else{
                setScore(['★','☆','☆','☆','☆'])
                setChecks([true, false, false, false, false])
            }
        }
        else if (tg.value == '3'){
                if (e.target.checked){
                    setScore(['★','★','★','☆','☆'])
                    setChecks([true, true, true, false, false])
                }
                else{
                    setScore(['★','★','☆','☆','☆'])
                    setChecks([true, true, false, false, false])
                }
        }
        else if (tg.value == '4'){
            if (e.target.checked){
                setScore(['★','★','★','★','☆'])
                setChecks([true, true, true, true, false])
            }
            else{
                setScore(['★','★','★','☆','☆'])
                setChecks([true, true, true, false, false])
            }
        }
        else if (tg.value == '5'){
            if (e.target.checked){
                setScore(['★','★','★','★','★'])
                setChecks([true, true, true, true, true])
            }
            else{
                setScore(['★','★','★','★','☆'])
                setChecks([true, true, true, true, false])
            }
        }
    }

    return (
        <div className='content'>
            <h4>별점과 이용경험을 남겨주세요.</h4>
            <Form.Label htmlFor="basic-url"></Form.Label>
                    <input type="checkbox" name="rating" id="rating1" value="1" title="1점"   checked= {starChecks[0]}  style={{display:'none'}} onClick={handleRating}/>
                    <label for="rating1">{score[0]}</label>
                    <input type="checkbox" name="rating" id="rating2" value="2"  title="2점"  checked= {starChecks[1]}  style={{display:'none'}} onClick={handleRating}/>
                    <label for="rating2">{score[1]}</label>
                    <input type="checkbox" name="rating" id="rating3" value="3"  title="3점"  checked= {starChecks[2]}  style={{display:'none'}} onClick={handleRating}/>
                    <label for="rating3">{score[2]}</label>
                    <input type="checkbox" name="rating" id="rating4" value="4"  title="4점"  checked= {starChecks[3]}  style={{display:'none'}} onClick={handleRating}/>
                    <label for="rating4">{score[3]}</label>
                    <input type="checkbox" name="rating" id="rating5" value="5"  title="5점"  checked= {starChecks[4]} style={{display:'none'}} onClick={handleRating}/>
                    <label for="rating5" >{score[4]}</label>
               

            <InputGroup>
                <InputGroup.Text>별점 후기 남기기</InputGroup.Text>
                <Form.Control as="textarea" rows={3} onChange = { (e)=> { setInputContent(e.target.value)} } />
            </InputGroup>           

            <Form.Group controlId="formFile" className="mb-3">
                {/* <Button onClick= { setScore( score++)}>점수</Button> */}
                <Form.Control type="file" onChange = { (e)=> { setInputFile(e.target.files[0])}} />
            </Form.Group>
            <Button className="btn btn-success" size="lg" type ="button" onClick= {handleSave}>등록</Button> 


        </div>
    )
}

function makeProps(store){
    return {
        stateReview : store.reducerReview,
    }
}

export default connect(makeProps)(Review);
