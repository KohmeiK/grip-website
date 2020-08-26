import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './Nav/NavBar.js'
import HomeContainer from './Home/HomeContainer.js'

import UploadFrom from './User/UploadForm.js'
import EditInfo from './User/EditInfo'
import ChangeEmail from './User/ChangeEmail'

import Applications from './Applications/Applications'

import ApplyContainer from './Apply/ApplyContainer'

import MyJobs from './Company/MyJobs'

import ForgotPassword from'./Signup/ForgotPassword'
import Login from './Signup/Login'
import Signup from "./Signup/Signup"
import VerifyEmail from './Signup/VerifyEmail'
import FirstUpload from './Signup/FirstUpload'
import EmailHandler from './Signup/EmailHandler'
import OnboardingContainer from './Signup/OnboardingContainer'

import CompanyCreationContainer from './Admin/CompanyCreationContainer'
import AdminSettingsContainer from './Admin/AdminSettingsContainer'
import AddJobContainer from './Admin/AddJobContainer'

import NeedAdmin from './Route/NeedAdmin'
import NeedCompany from './Route/NeedCompany'
import PrivateRoute from './Route/PrivateRoute'
import PrivateAdminRoute from './Route/PrivateAdminRoute'
import PrivateCompanyRoute from './Route/PrivateCompanyRoute'

import Test from './Admin/Test2'


function App(){
    return(
      <Router>
        <NavBar/>
        <Switch>
          <PrivateRoute path="/apply"> <ApplyContainer /> </PrivateRoute>
          <PrivateRoute path="/firstUpload"> <OnboardingContainer onStep={2}><FirstUpload /></ OnboardingContainer> </PrivateRoute>
          <PrivateRoute path="/upload"> <UploadFrom /> </PrivateRoute>
          <PrivateRoute path="/applications"> <Applications /> </PrivateRoute>
          <PrivateRoute path="/editInfo"> <EditInfo /> </PrivateRoute>

          <PrivateCompanyRoute path="/jobs"> <MyJobs/> </PrivateCompanyRoute>

          <PrivateAdminRoute path="/create-company"> <CompanyCreationContainer /> </PrivateAdminRoute>
          <PrivateAdminRoute path="/add-job"> <AddJobContainer /> </PrivateAdminRoute>
          <PrivateAdminRoute path="/admin"> <AdminSettingsContainer /> </PrivateAdminRoute>

          <Route path="/needAdmin"> <NeedAdmin /> </Route>
          <Route path="/needCompany"> <NeedCompany /> </Route>
          <Route path="/forgotPassword"> <ForgotPassword /> </Route>
          <Route path="/signup"><OnboardingContainer onStep={0}> <Signup /></OnboardingContainer> </Route>
          <Route path="/login"> <Login /> </Route>
          <Route path="/emailHandler"> <EmailHandler /> </Route>
          <Route path="/changeEmail"> <ChangeEmail /> </Route>
          <Route path="/verifyEmail"> <OnboardingContainer onStep={1}> <VerifyEmail /> </OnboardingContainer> </Route>
          <Route path="/test"> <Test /> </Route>
          <Route path="/"> <HomeContainer/> </Route>
        </Switch>
      </Router>
    );
}

export default App;
