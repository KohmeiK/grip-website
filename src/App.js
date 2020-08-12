import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './Nav/NavBar.js'
import HomeContainer from './Home/HomeContainer.js'

import UploadFrom from './User/UploadForm.js'
import SettingsContainer from './User/SettingsContainer.js'

import Applications from './Applications/Applications'

import ApplyContainer from './Apply/ApplyContainer'

import MyJobs from './Company/MyJobs'

import ForgotPassword from'./Signup/ForgotPassword'
import Login from './Signup/Login'
import Signup from "./Signup/Signup"
import VerifyEmail from './Signup/VerifyEmail'
import FirstUpload from './Signup/FirstUpload'

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
          <PrivateRoute path="/firstUpload"> <FirstUpload /> </PrivateRoute>
          <PrivateRoute path="/upload"> <UploadFrom /> </PrivateRoute>
          <PrivateRoute path="/applications"> <Applications /> </PrivateRoute>

          <PrivateCompanyRoute path="/jobs"> <MyJobs/> </PrivateCompanyRoute>

          <PrivateAdminRoute path="/create-company"> <CompanyCreationContainer /> </PrivateAdminRoute>
          <PrivateAdminRoute path="/admin"> <AdminSettingsContainer /> </PrivateAdminRoute>

          <Route path="/needAdmin"> <NeedAdmin /> </Route>
          <Route path="/needCompany"> <NeedCompany /> </Route>
          <Route path="/forgotPassword"> <ForgotPassword /> </Route>
          <Route path="/signup"> <Signup /> </Route>
          <Route path="/login"> <Login /> </Route>
          <Route path="/verifyEmail"> <VerifyEmail /> </Route>
          <Route path="/"> <HomeContainer/> </Route>
        </Switch>
      </Router>
    );
}

export default App;
