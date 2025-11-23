import React from "react";
import GridWrapper from "../../components/Common/GridWrapper";
import SignIn from "../../components/SignIn/SignIn";
import useAuthentication from "../../hooks/useAuthentication";
import OrdersCrudGrid from "../../components/Grids/OrdersCrudGrid";

const Orders = (props) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <OrdersCrudGrid />
        </>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Orders;
