// AuthContext.js
import React from 'react';

const AuthContext = React.createContext({
  setToken: () => {},
  reloadTheApp: () => {},
});

export default AuthContext;
