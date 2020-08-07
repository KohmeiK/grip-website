import React from 'react'
import { useLocation } from "react-router-dom";

/**
  This is the page shown when your try to acess a company only page
  but your account does not have the isCompany customClaim.
*/
function NeedCompany() {
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <h3>{`Sorry, you need an company acount to access "${from.pathname}".` }</h3>
  )
}

export default NeedCompany
