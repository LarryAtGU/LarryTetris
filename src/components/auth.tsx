import React from 'react';
import { useState, useEffect } from 'react';

const AuthContext = React.createContext({ id: 0, onLogin: (id: number) => {}, onLogout: () => {} });

export const AuthProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [id, setUserID] = useState(0);
  useEffect(() => {
    const storeUserID = localStorage.getItem('LTetrisUserID');
    console.log('storeUerID ', storeUserID);
    if (storeUserID === null) {
      setUserID(0);
    } else {
      setUserID(parseInt(storeUserID));
    }
  }, []);

  const loginHandler = (uid: number) => {
    setUserID(uid);
    console.log('in login handler uid is ', uid);
    localStorage.setItem('LTetrisUserID', '' + uid);
  };

  const logoutHandler = () => {
    setUserID(0);
    localStorage.removeItem('LTetrisUserID');
  };

  return (
    <AuthContext.Provider value={{ id: id, onLogin: loginHandler, onLogout: logoutHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
