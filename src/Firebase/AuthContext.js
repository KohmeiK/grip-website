import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "./index";

//typescript stuff (use as doccumentaiton)
// type ContextProps = {
//     user: firebase.User | null;
//     isAuthenticated: boolean;
//     setUser: any;
//     isLoadingAuthState: boolean;
// };

const AuthContext = React.createContext({});
export const AuthProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext)
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [isAdmin, setAdmin] = useState(null)
  const [isCompany, setCompany] = useState(null)

  const updateAdminState = async(pUser) => {
    const idTok = await pUser.getIdTokenResult()
    //Relying on this part to end after onAuthStateChanged
    console.log("upading isAdmin",!!idTok.claims.admin)
    console.log("upading isCompany",!!idTok.claims.company)
    setAdmin(!!idTok.claims.admin)
    setCompany(!!idTok.claims.company)
    setLoadingAuthState(false);
  }

  useEffect(() => {
    //Run only on mount
    firebase.auth.onAuthStateChanged((user) => {

      if(user){
        setUser(user);
        updateAdminState(user);
      }else{
        setUser(null)
        setAdmin(false)
        setLoadingAuthState(false)
      }

    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: user !== null && typeof user !== 'undefined',
        setUser: setUser,
        isLoadingAuthState: loadingAuthState,
        isAdmin: isAdmin,
        isCompany: isCompany,
      }}
    >

      {children}
   </AuthContext.Provider>
  );
}

export default AuthContext
