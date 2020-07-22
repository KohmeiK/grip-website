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
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    //Run only on mount
    firebase.auth.onAuthStateChanged((user) => {

      if(user){
        setUser(user);
        // const idTok = await authContext.user.getIdTokenResult()
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
        isAuthenticated: user !== null && typeof user !== 'undefined',
        setUser: setUser,
        isLoadingAuthState: loadingAuthState
      }}
    >

      {children}
   </AuthContext.Provider>
  );
}

export default AuthContext
