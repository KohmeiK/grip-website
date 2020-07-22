import React, {useContext} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import AuthContext from "./Firebase/AuthContext"

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let authContext = useContext(AuthContext)
  console.log(authContext)
  if(authContext.isloadingAuthState){
    return(
      <h1>Redirecting...</h1>
    )
  }else{
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authContext.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute
