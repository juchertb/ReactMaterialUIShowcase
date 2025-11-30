import { Button, FormLabel, Grid2, List, ListItem, ListItemIcon, ListItemText, OutlinedInput, Paper, styled, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type UserPassword = {
  userId: number;
  password: string;
}

const ChangePassword = (props) => {
  const [userPassword, setUserPassword] = useState<UserPassword>({ userId: 123, password: "" });
  const handleSubmit = evt => {
    evt.preventDefault();

    let data = userPassword;

    console.log(data);
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
      <p id="change-password" />
      <Typography variant="h6">Change Password</Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={1} sx={{ marginTop: "15px" }}>
          <FormGrid size={3}>
            <FormLabel htmlFor="current-password" required>
              Current password
            </FormLabel>
          </FormGrid>
          <FormGrid size={9}>
            <OutlinedInput
              id="current-password"
              name="current-password"
              type="password"
              placeholder="Your current password"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={3}>
            <FormLabel htmlFor="new-password" required>
              New password
            </FormLabel>
          </FormGrid>
          <FormGrid size={9}>
            <OutlinedInput
              id="new-password"
              name="new-password"
              type="password"
              placeholder="Your new password"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={3}>
            <FormLabel htmlFor="confirm-password" required>
              Confirm new password
            </FormLabel>
          </FormGrid>
          <FormGrid size={9}>
            <OutlinedInput
              id="confirm-password"
              name="confirm-password"
              type="password"
              placeholder="Confirm your new password"
              required
              size="small"
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={7}>
            <Typography variant="h6" sx={{ marginTop: "30px", marginBottom: "15px" }}>Password requirements</Typography>
            <Typography>Please follow this guide for a strong password</Typography>
            <List>
              <ListItem sx={{ padding: "0px", color: "success.main" }}>
                <ListItemIcon sx={{ paddingRight: "5px", color: "green" }}>
                  <CheckBoxIcon style={{ color: "green" }} />
                </ListItemIcon>
                <ListItemText>One special characters</ListItemText>
              </ListItem>
              <ListItem sx={{ padding: "0px", color: "error.main" }}>
                <ListItemIcon sx={{ paddingRight: "5px" }}>
                  <CheckBoxOutlineBlankIcon style={{ color: "hsl(0, 90%, 40%)" }} />
                </ListItemIcon>
                <ListItemText>Min 6 characters</ListItemText>
              </ListItem>
              <ListItem sx={{ padding: "0px", color: "success.main" }}>
                <ListItemIcon sx={{ paddingRight: "5px" }}>
                  <CheckBoxIcon style={{ color: "green" }} />
                </ListItemIcon><ListItemText>One number (2 are recommended)</ListItemText>
              </ListItem>
              <ListItem sx={{ padding: "0px", color: "success.main" }}>
                <ListItemIcon sx={{ paddingRight: "5px" }}>
                  <CheckBoxIcon style={{ color: "green" }} />
                </ListItemIcon>
                <ListItemText>Change it often</ListItemText>
              </ListItem>
            </List>
          </FormGrid>
          <FormGrid size={5} sx={{ alignItems: "end" }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              Update Password <SaveIcon sx={{ marginLeft: "5px" }} />
            </Button>
          </FormGrid>
        </Grid2>
      </form >
    </Paper >
  )
};

export default ChangePassword;
