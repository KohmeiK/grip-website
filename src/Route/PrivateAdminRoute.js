import React, {useContext} from "react"
import {
  Route,
  Redirect,
} from "react-router-dom";
import AuthContext from "../Firebase/AuthContext"

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateAdminRoute({ children, ...rest }) {
  let authContext = useContext(AuthContext)
  console.log(authContext)
  if(authContext.isLoadingAuthState){
    return(
      <h1>Redirecting...</h1>
    )
  }else{
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authContext.isAuthenticated && authContext.isAdmin ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/needAdmin",
                state: { from: location}
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateAdminRoute
