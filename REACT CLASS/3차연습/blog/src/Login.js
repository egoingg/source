import {InputGroup, Form,Button,FloatingLabel} from 'react-bootstrap';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { auth} from './index.js';
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
        console.log(result.uid)
        result.user.updateProfile({ displayName: name})
    })}

    const handleLogin = ()=>{auth.signInWithEmailAndPassword(email_,pw_).then((result)=>{

        //user 정보 state에 저장
        props.setUser(result.user)
        console.log('result.user',result.user)
        history.push('/')
    }).catch((error)=>
        alert(error)
    )} 

    const handleChange = (e)=>{
        console.log('e', e, e.target,  e.target.id)
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

    return (
        <div>
             <InputGroup hasValidation>
                <Form.Control type="name" id='name_new' placeholder="name" className="mb-3" onChange= { handleChange } />
                <Form.Control type="email" id='email_new' placeholder="email" className="mb-3" onChange= { handleChange } />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" id='pw_new' placeholder="password"  className="mb-3" onChange= { handleChange }  />
                </Form.Group>
            </InputGroup>
            <Button className="btn btn-success"  type ="button" onClick={ handleCreateUser }>회원가입</Button>

            <InputGroup hasValidation>
                <Form.Control type="email" id='email' placeholder="email" className="mb-3" onChange= { handleChange } />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" id='pw' placeholder="password"  className="mb-3" onChange= { handleChange }  />
                </Form.Group>
            </InputGroup>
            <Button className="btn btn-success"  type ="button" onClick={ handleLogin }>로그인</Button>
        </div>
    )
}

export default Login
