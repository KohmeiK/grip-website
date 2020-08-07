import React, {useContext} from "react"
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../Firebase/AuthContext"

/** A wrapper for <Route> that redirects to the needCompany
screen if you're not an company. */
function PrivateCompanyRoute({ children, ...rest }) {
  let authContext = useContext(AuthContext)
  // console.log(authContext)
  if(authContext.isLoadingAuthState){
    return(
      <h1>Redirecting...</h1>
    )
  }else{
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authContext.isAuthenticated && authContext.isCompany ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/needCompany",
                state: { from: location}
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateCompanyRoute
