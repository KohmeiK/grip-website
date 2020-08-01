import React, { useState, useEffect} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NavBar from './Nav/NavBar.js'
import LandingCarousel from './Home/LandingCarousel.js'

import UploadFrom from './User/UploadForm.js'
import SettingsContainer from './User/SettingsContainer.js'

import Applications from './Applications/Applications'

import ApplyContainer from './Apply/ApplyContainer'

import MyJobs from './Company/MyJobs'

import Login from './Signup/Login'
import Signup from "./Signup/Signup"

import CompanyCreationContainer from './Admin/CompanyCreationContainer'
import AdminSettingsContainer from './Admin/AdminSettingsContainer'

import NeedAdmin from './Route/NeedAdmin'
import NeedCompany from './Route/NeedCompany'
import PrivateRoute from './Route/PrivateRoute'
import PrivateAdminRoute from './Route/PrivateAdminRoute'
import PrivateCompanyRoute from './Route/PrivateCompanyRoute'


function App(){
    return(
      <Router>
        <NavBar/>
        <Switch>
          <PrivateRoute path="/setting"> <SettingsContainer/> </PrivateRoute>
          <PrivateRoute path="/apply"> <ApplyContainer /> </PrivateRoute>
          <PrivateRoute path="/upload"> <UploadFrom /> </PrivateRoute>
          <PrivateRoute path="/applications"> <Applications /> </PrivateRoute>

          <PrivateAdminRoute path="/create-company"> <CompanyCreationContainer /> </PrivateAdminRoute>
          <PrivateAdminRoute path="/admin"> <AdminSettingsContainer /> </PrivateAdminRoute>

          <PrivateCompanyRoute path="/jobs"> <MyJobs/> </PrivateCompanyRoute>

          <Route path="/needAdmin"> <NeedAdmin /> </Route>
          <Route path="/needCompany"> <NeedCompany /> </Route>
          <Route path="/signup"> <Signup /> </Route>
          <Route path="/login"> <Login /> </Route>
          <Route path="/"> <LandingCarousel/> </Route>
        </Switch>
      </Router>
    );
}

export default App;
