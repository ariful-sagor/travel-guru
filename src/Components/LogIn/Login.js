import React, { useContext, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Button, Col, Form, Row } from 'react-bootstrap';
import './Login.css';
import google from '../../../src/images/Icon/google.png';
import fb from '../../../src/images/Icon/fb.png';       
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    const history= useHistory();
    const location= useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    
    const [user, setUser] = useState({
        isSignedIn: false,
        name:'',
        email:'',

    })
    
    const handleGoogleLogin=() => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            const {displayName, email} = result.user;
            const signedInUser= {name: displayName, email};
            history.replace(from);
            console.log(user);
          })
          .then(res=>{
            const {displayName, email}= res.user;
            const signedInUser ={
                isSignedIn:true,
                name: displayName,
                email: email,
            }
            setUser(signedInUser);
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
    }
    
    const handleFbLogin=() => {

    }
    return (
        <div id="page">
            
        <div id="login">
            <Form >
                <h3 className="highlight">Login</h3>
                <br />
                <Form.Group controlId="formBasicEmail">
                    
                    <Form.Control type="email" placeholder="Username or Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    
                    <Form.Control type="password" placeholder="Password" />
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
                <Button variant="warning" type="submit">
                    <h5>Login</h5>
                </Button>
                <p className="highlight">Don't have an account? <a href='/signup' >Create an account</a></p>
                </Form>
            </div>
            <div id="anotherProcess">
                <p>Or</p>
                <a  onClick={handleGoogleLogin}>
                    <div className="google">
                        <img src={google} alt="Google"></img>
                        <h5 className="highlight" >Login with Google</h5>
                    </div>
                </a>
                <a  onClick={handleFbLogin}>
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
