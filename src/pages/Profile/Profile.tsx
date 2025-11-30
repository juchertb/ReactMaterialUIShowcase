import React from "react";
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
