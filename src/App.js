import React, { useState, useEffect} from 'react';
import './App.css';
import NavBar from './NavBar.js'
import LandingCarousel from './LandingCarousel.js'
import UploadFrom from './UploadForm.js'
import ApplyContainer from './ApplyContainer'
import CompanyForm from './CompanyForm'
import Login from './Login'
import Signup from "./Signup"
import Test from './Test'
import Setting from './Setting'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App(){
    return(
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/setting">
            <Setting/>
          </Route>
          <Route path="/test">
            <Test/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/apply">
            <ApplyContainer />
          </Route>
          <Route path="/company">
            <CompanyForm />
          </Route>
          <Route path="/upload">
            <UploadFrom />
          </Route>
          <Route path="/">
            <LandingCarousel/>
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
