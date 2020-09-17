import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Signup.css';
import google from '../../../src/images/Icon/google.png';
import fb from '../../../src/images/Icon/fb.png';       
const Login = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',

    })

    const handleBlur = (event) => {
        console.log(event.target.name, event.target.value)
        let isFormValid =true;
        if(event.target.name === 'email'){
          isFormValid = /\S+@\S+\.\S+/.test(event.target.value); 
          
        }
        if(event.target.name==='password'){
          isFormValid = event.target.value.length>5 && /\d{1}/.test(event.target.value);
        }
        console.log(isFormValid)
        if (isFormValid){
          const newUserInfo= {...user};
          newUserInfo[event.target.name]= event.target.value;
          setUser(newUserInfo);
        }
        console.log(user);
    }
    const handleSubmit=(e) => {
        

    }
    return (
        <div id="page">
            
        <div id="login">
            <Form onSubmit={handleSubmit}>
                <h3 className="highlight">Create an account</h3>
                <br />
                <Form.Group >
                    
                    <Form.Control type="text" name='firstName' onBlur={handleBlur} placeholder="First name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control type="text" name='lastName' onBlur={handleBlur} placeholder="Last Email" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control type="email" onBlur={handleBlur} name="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    
                    <Form.Control type="password" name='password' onBlur={handleBlur} placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" name='password' onBlur={handleBlur} placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="warning" type="submit">
                    <h5>Create an account</h5>
                </Button> <br /> 
                <p className="highlight">Already have an account <a href='/login'> Login</a></p>
                
                </Form>
            </div>
            <div id="anotherProcess">
                <p>Or</p>
                <a href='/loginManager'>
                    <div className="google">
                        <img src={google} alt="Google"></img>
                        <h5 className="highlight">Login with Google</h5>
                    </div>
                </a>
                <a href='/loginManager'>
                    <div className="fb">
                        <img src={fb} alt="Facebook"></img>
                        <h5 className="highlight">Login with Facebook</h5>
                    </div>
                </a>
            </div>
        </div>
    );
};
export default Login;
