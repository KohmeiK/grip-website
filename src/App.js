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
import AdminSettingsContainer from './AdminSettingsContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './PrivateRoute'

function App(){
    return(
      <Router>
        <NavBar/>
        <Switch>
          <PrivateRoute path="/setting">
            <Setting/>
          </PrivateRoute>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/apply">
            <ApplyContainer />
          </PrivateRoute>
          <PrivateRoute path="/company">
            <CompanyForm />
          </PrivateRoute>
          <PrivateRoute path="/upload">
            <UploadFrom />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <AdminSettingsContainer/>
          </PrivateRoute>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/">
            <LandingCarousel/>
          </Route>
        </Switch>
      </Router>
    );
}

export default App;
