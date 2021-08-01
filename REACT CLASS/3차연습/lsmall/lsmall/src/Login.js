import {InputGroup, Form,Button,Card,ListGroup} from 'react-bootstrap';
import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { auth} from './index.js';
import { db} from './index.js';
import "firebase/firestore"; 
import "firebase/storage";
import "firebase/auth";

function Login(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pw, setPw] = useState('')
    const [email_, setEmail_] = useState('')
    const [pw_, setPw_] = useState('')

    const history = useHistory()

    const handleCreateUser = ()=>{auth.createUserWithEmailAndPassword(email, pw).then((result)=>{
        result.user.updateProfile({ displayName: name})
        alert('회원가입성공!')
        history.push('/')
    }).catch((error)=>
        alert(error)
    )} 

    const handleChange = (e)=>{
        if(e.target.id === 'email_new')
        {
            setEmail(e.target.value) 
        }
        else if (e.target.id === 'pw_new')
        {
            setPw(e.target.value) 
        }
        else if (e.target.id === 'name_new')
        {
            setName(e.target.value) 
        }
        else if(e.target.id === 'email')
        {
            setEmail_(e.target.value) 
        }
        else if (e.target.id === 'pw')
        {
            setPw_(e.target.value) 
        }
    }
   
    const handleLogin = ()=>{auth.signInWithEmailAndPassword(email_,pw_).then((result)=>{
        //user 정보 state에 저장
        props.setUser(result.user)
        history.push('/')
    }).catch((error)=>
        alert(error)
    )} 
    return (
        <div className= "contain" >
            <Card className =' mb-5' style={{ width: '100%'}}>
                <Card.Header>회원가입</Card.Header>
                <Card.Body>
                    <InputGroup hasValidation>
                        <ListGroup.Item style={{ width: '100%' }}>
                            <Form.Control type="name" id='name_new' placeholder="name" onChange= { handleChange } />
                        </ListGroup.Item>
                        <ListGroup.Item style={{ width: '100%' }}>
                            <Form.Control type="email" id='email_new' placeholder="email" onChange= { handleChange } />
                        </ListGroup.Item>
                        <ListGroup.Item style={{ width: '100%' }}>
                            <Form.Control controlId="formBasicPassword" type="password" id='pw_new' placeholder="password 6자리 이상"  onChange= { handleChange }  />
                        </ListGroup.Item>
                    </InputGroup>
                    <Button className="btn btn-success mt-3 w-100"  type ="button" onClick={ handleCreateUser }>회원가입</Button>
                </Card.Body>
            </Card>
            <Card className ='m-auto' style={{ width: '100%'}}>
                <Card.Header>로그인</Card.Header>
                <Card.Body>
                    <InputGroup hasValidation>
                        <ListGroup.Item style={{ width: '100%' }}>
                            <Form.Control type="email" id='email' placeholder="email"  onChange= { handleChange } />
                        </ListGroup.Item>
                        <ListGroup.Item style={{ width: '100%' }}>
                            <Form.Control controlId="formBasicPassword" type="password" id='pw' placeholder="password"  onChange= { handleChange }  />
                        </ListGroup.Item>
                    </InputGroup>
                    <Button className="btn btn-success mt-3 w-100"  type ="button" onClick={ handleLogin }>로그인</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

function makeProps(store){
    return { 
        stateOrderItems : store.reducerOrderItems,
        stateOrderInfo : store.reducerOrderInfo
    }
}

export default connect(makeProps)(Login);
