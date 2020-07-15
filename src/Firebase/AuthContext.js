import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "./index";

//typescript stuff (use as doccumentaiton)
// type ContextProps = {
//     user: firebase.User | null;
//     authenticated: boolean;
//     setUser: any;
//     loadingAuthState: boolean;
// };

const AuthContext = React.createContext({});
export const AuthProvider = ({ children }) => {
  const firebase = useContext(FirebaseContext)
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    //Run only on mount
    firebase.auth.onAuthStateChanged((user) => {

      if(user){
        setUser(user);
      }else{
        setUser(null)
      }
      setLoadingAuthState(false);

    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        authenticated: user !== null && typeof user !== 'undefined',
        setUser: setUser,
        loadingAuthSate: loadingAuthState
      }}
    >

      {children}
   </AuthContext.Provider>
  );
}

export default AuthContext
