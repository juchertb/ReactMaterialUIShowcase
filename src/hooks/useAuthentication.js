import { useContext } from "react";
import AuthenticationContext from "../context/Authentication";

export default () => {
  const context = useContext(AuthenticationContext);
  return context;
};
