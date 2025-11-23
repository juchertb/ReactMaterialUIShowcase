import React from "react";
import GridWrapper from "../components/Common/GridWrapper";
import SignIn from "../components/SignIn/SignIn";
import useAuthentication from "../hooks/useAuthentication";
import Checkout from "../components/Checkout/Checkout";

const steps = ["Step 1", "Step 2", "Step 3"];
const stepDescriptions = ["Description 1", "Description 2", "Description 3"];

const Database = (props) => {
  const { isAuthenticated } = useAuthentication();

  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <Checkout disableCustomTheme="" />
        </>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Database;
