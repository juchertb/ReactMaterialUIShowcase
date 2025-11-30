import React from "react";
import GridWrapper from "../components/Common/GridWrapper";
import UserTable from "../components/UserTable";
import BasicCard from "../components/Common/BasicCard";
import BasicSnackbar from "../components/Common/BasicSnackbar/BasicSnakbar";
import SignIn from "../components/SignIn/SignIn";
import useAuthentication from "../hooks/useAuthentication";

const Storage = (props) => {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useAuthentication();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <div>
          <BasicCard content={<UserTable onError={() => setOpen(true)} />} />
          <BasicSnackbar
            open={open}
            severity="error"
            message="Data couldn't be fetched"
            onClose={handleClose}
          />
        </div>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Storage;
