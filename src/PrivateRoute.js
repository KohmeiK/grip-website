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
  console.log(authContext.loadingAuthSate)
  if(authContext.loadingAuthSate){
    return(
      <div>
        Redirecting...
      </div>
    )
  }else if(!authContext.loadingAuthState){
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authContext.authenticated ? (
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
