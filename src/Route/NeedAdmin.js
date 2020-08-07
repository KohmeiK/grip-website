import React from 'react'
import { useLocation } from "react-router-dom";

 /**
 *  This is the page shown when your try to acess a admin only page
 *  but your account does not have the isAdmin customClaim.
 *
 * @version 1.0
 * @author [Kohmei Kadoya](https://github.com/kohmei358)
 */
function NeedAdmin() {
  let location = useLocation()

  /** Description of prop "foo". */
  let { from } = location.state || { from: { pathname: "/" } };

  return(
    <h3>{`Sorry, you need an admin acount to access "${from.pathname}".` }</h3>
  )
}

export default NeedAdmin
