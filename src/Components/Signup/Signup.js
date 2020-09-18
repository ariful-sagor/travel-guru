import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as firebase from "firebase/app";
import 'firebase/auth';

import './Signup.css';
import google from '../../../src/images/Icon/google.png';
import fb from '../../../src/images/Icon/fb.png';   
import firebaseConfig from '../LogIn/firebase.config';



// firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser]= useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
    });

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
        console.log(user)
    }
    // const [newUser, setNewUser]= useState(false);

    const handleSubmit=(e)=>{
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res=>{
                const newUserInfo={...user};
                newUserInfo.error= '';
                setUser(newUserInfo);
                updateUserName(user.name);
            })
            .catch(function(error) {
                const newUserInfo={...user};
                newUserInfo.error= error.message;
                setUser(newUserInfo);;
              });

        }
        e.preventDefault();
    }
    const updateUserName= name=>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name,
        
        }).then(function() {
        console.log('user updated')
        }).catch(function(error) {
        console.log(error);
        });
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
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            // ...
          });
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
                        <Form.Control type="password" onBlur={handleBlur} placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="warning" type="submit">
                        <h5>Create an account</h5>
                    </Button> <br /> 
                    <p className="highlight">Already have an account <a href='/login'> Login</a></p>   
                </Form>
                {/* <h4 className="highlight">{user.error}</h4> */}
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
}
export default Login;
