import React, { createContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import Book from './Components/Booking/Booking';
import NotFound from './Components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/LogIn/Login';
import Signup from './Components/Signup/Signup';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Hotel from './Components/Hotel/Hotel';
import GoogleMap from './Components/Map/GoogleMap';



export const UserContext= createContext();

function App() {

  const [loggedInUser, setLoggedInUser]= useState({});
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    {/* <h3 className="highlight">Email: {loggedInUser.email}</h3> */}

    <Router>
      <Switch>
        <Route path="/map">
          <GoogleMap />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <PrivateRoute path="/hotel">
          <Hotel />
        </PrivateRoute>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/booking/:placename">
          <Book />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;