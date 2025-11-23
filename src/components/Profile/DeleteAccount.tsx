import { Button, Grid2, Paper, styled, Typography } from "@mui/material";
import React from "react";
import { useTheme } from '@mui/material/styles';

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const DeleteAccount = (props) => {
  const theme = useTheme();
  const handleSubmit = evt => {
    evt.preventDefault();

    // let data = userPassword;
    // console.log(data);

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

  return (
    <Paper elevation={3} sx={{
      borderRadius: "0.75rem",
      width: "100%",
      height: "100%",
      padding: "15px",
      marginTop: "15px"
    }}>
      <div id="delete-account" />
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={1}>
          <FormGrid size={6} sx={{ paddingBottom: "15px" }}>
            <Typography variant="h6">Delete Account</Typography>
            <Typography>Once you delete your account, there is no going back. Please be certain.</Typography>
          </FormGrid>
          <FormGrid size={6} sx={{ justifyContent: "end", display: "flex", flexDirection: "row" }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
              sx={{ marginRight: "10px" }}
            >
              DEACTIVATE
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="error"
              size="small"
            >
              DELETE ACCOUNT
            </Button>
          </FormGrid>
        </Grid2>
      </form>
    </Paper >
  )
};

export default DeleteAccount;
