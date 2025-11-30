import { Button, Chip, Grid2, Paper, styled, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import FormDivider from "../Common/StyledComponents/FormDivider";

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type UserPassword = {
  userId: number;
  password: string;
}

const TwoFactorAuthentication = (props) => {
  const [userPassword, setUserPassword] = useState<UserPassword>({ userId: 123, password: "" });
  const handleSubmit = evt => {
    evt.preventDefault();

    //console.log(data);
    return;

    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    //     .then(response => response.json())
    //     .then(response => console.log("Success:", JSON.stringify(response)))
    //     .catch(error => console.error("Error:", error));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setUserPassword({ ...userPassword, password: newValue });
  };

  return (
    <Paper elevation={3} sx={{
      borderRadius: "0.75rem",
      width: "100%",
      height: "100%",
      padding: "15px",
      marginTop: "15px"
    }}>
      <div id="2fa" />
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={1}>
          <FormGrid size={6} sx={{ paddingBottom: "15px" }}>
            <Typography variant="h6">Two-factor authentication</Typography>
          </FormGrid>
          <FormGrid size={6} sx={{ alignItems: "end" }}>
            <Chip label="ENABLED" color="success" variant="filled" />
          </FormGrid>
          <FormGrid size={6}>
            <Typography sx={{ marginTop: "7px" }}>Security keys</Typography>
          </FormGrid>
          <FormGrid size={6} sx={{ justifyContent: "end", display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray", marginRight: "15px", paddingTop: "7px" }}>No security keys</Typography>
            <Button
              //type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              ADD
            </Button>
          </FormGrid>
          <FormDivider />
          <FormGrid size={6}>
            <Typography sx={{ marginTop: "7px" }}>SMS number</Typography>
          </FormGrid>
          <FormGrid size={6} sx={{ justifyContent: "end", display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray", marginRight: "15px", paddingTop: "7px" }}>+3012374423</Typography>
            <Button
              //type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              EDIT
            </Button>
          </FormGrid>
          <FormDivider />
          <FormGrid size={6}>
            <Typography sx={{ marginTop: "7px" }}>Authenticator app</Typography>
          </FormGrid>
          <FormGrid size={6} sx={{ justifyContent: "end", display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "bold", color: "gray", marginRight: "15px", paddingTop: "7px" }}>Not configured</Typography>
            <Button
              //type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              SETUP
            </Button>
          </FormGrid>
        </Grid2>
      </form >
    </Paper >
  )
};

export default TwoFactorAuthentication;
