import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../Firebase/AuthContext"

/** A wrapper for <Route> that redirects to the login
screen if you're not logged in. */
function PrivateRoute({ children, ...rest }) {
  let authContext = useContext(AuthContext)
  if (authContext.isLoadingAuthState) {
    return (
      <h1>Redirecting...</h1>
    )
  } else {
    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (authContext.isAuthenticated) {
            if (authContext.isVerified) {
              return children
            } else {
              return (<Redirect
                to={{
                  pathname: "/VerifyEmail",
                  state: { from: location }
                }}
              />)
            }
          } else if(location.pathname == "/apply"){
            return (<Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />)
          }else{
            return (<Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />)

          }
        }
        }
      />
    );
  }
}

export default PrivateRoute
