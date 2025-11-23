import React, { useState } from "react";
import SignIn from "../components/SignIn/SignIn";

const AuthenticationContext = React.createContext();

export const AuthenticationProvider = ({
  children,
  isAuthenticatedDefault,
}) => {
  const [isAuthenticated, setAuthenticated] = useState(isAuthenticatedDefault);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export default AuthenticationContext;
