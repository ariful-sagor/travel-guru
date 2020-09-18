import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Login.css';
import google from '../../../src/images/Icon/google.png';
import fb from '../../../src/images/Icon/fb.png';       
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const Login = () => {
    
    const location= useLocation();
    const history = useHistory();

    let {from}= location.state || { from: {pathname:"/hotel"}};

    let isFormValid = true;

    const handleBlur=(event) => {
        if (event.target.name === 'email'){
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);          
        }
        if(event.target.name === 'password'){
            isFormValid= event.target.value.length>5;
        }
        if(isFormValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name]= event.target.value;
            setUser(newUserInfo);
        }
    }
    

    const [user, setUser]= useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
    });
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    



    const handleSubmit=(e)=>{
        if(user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const newUserInfo={...user};
                newUserInfo.error= '';
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch(function(error) {
                const newUserInfo={...user};
                newUserInfo.error= error.message;
                setUser(newUserInfo);
                
              });
        }
        e.preventDefault();
    }

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleLogin = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then(res=>{
            const {displayName, email}= res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });

    }
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbLogin = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(res=>{
            const {displayName, email}= res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

          });
    }


 
    return (
        <div id="page">
            
        <div id="login">
            <Form >
                <h3 className="highlight">Login</h3>
                <br />
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control name="email" onBlur={handleBlur} type="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    
                    <Form.Control name='password' onBlur={handleBlur} type="password" placeholder="Password" />
                </Form.Group>
                <Row>
                    <Col className="highlight">
                        <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                    </Col>
                    <Col></Col>
                    <Col className="highlight">
                    <a href="#forgot">Forgot Password</a>
                    </Col>

                </Row>
                <Button variant="warning" type="submit" onClick={handleSubmit}>
                    <h5>Login</h5>
                </Button>
                <p  className="highlight" >Don't have an account? <a name='newUser' href="/signup" >Create an account</a></p>
                </Form>
                
            </div>
            <h3 className="highlight">{user.error}</h3>

            <div id="anotherProcess">
                <p>Or</p>
                <a onClick={handleGoogleLogin}>
                    <div className="google">
                        <img src={google} alt="Google"></img>
                        <h5 className="highlight" >Login with Google</h5>
                    </div>
                </a>
                <a onClick={handleFbLogin}>
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
