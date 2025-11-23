import React from "react";
import SignIn from "../components/SignIn/SignIn";
import useAuthentication from "../hooks/useAuthentication";
import { Typography } from "@mui/material";
import GridWrapper from "../components/Common/GridWrapper";
import StripedGrid from "../components/Grids/StripedGrid";

const MachineLearning = (props) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <GridWrapper>
      {isAuthenticated === true ? <StripedGrid /> : <SignIn />}
    </GridWrapper>
  );
};

export default MachineLearning;
