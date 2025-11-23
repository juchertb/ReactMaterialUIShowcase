import React from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from "../../theme/AppTheme";
import ColorModeIconDropdown from "../../theme/ColorModelIconDropdown";
import { Typography } from "@mui/material";
import GridWrapper from "../../components/Common/GridWrapper";
import BasicProfile from "../../components/Profile/BasicProfile";
import useAuthentication from "../../hooks/useAuthentication";
import SignIn from "../../components/SignIn/SignIn";

const Profile = (props) => {
  const { isAuthenticated } = useAuthentication();
  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <BasicProfile />
        ) : (
          <SignIn />
        )}
      </GridWrapper>
    </>
  )
};

export default Profile;
