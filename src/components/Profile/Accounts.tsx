import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControlLabel, FormLabel, Grid2, OutlinedInput, Paper, styled, Switch, Tooltip, Typography } from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import React, { ChangeEvent, useState } from "react";
import FormDivider from "../Common/StyledComponents/FormDivider";

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Accounts = (props) => {
  const [accountsEnabled, setAccountsEnabled] = useState<boolean[]>([true, true, true, false]);

  const handleSubmit = evt => {
    evt.preventDefault();

    //let data = userPassword;
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

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const rowId = event.target.value;
    const newAccountsEnabled: boolean[] = { ...accountsEnabled };
    newAccountsEnabled[rowId] = checked;
    setAccountsEnabled(newAccountsEnabled);
  };

  return (
    <Paper elevation={3} sx={{
      borderRadius: "0.75rem",
      width: "100%",
      height: "100%",
      padding: "15px",
      marginTop: "15px"
    }}>
      <Typography variant="h6">Accounts</Typography>
      <Typography>Here you can setup and manage your integration settings.</Typography>
      <div id="accounts" />
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={1} sx={{ paddingTop: "15px" }}>
          <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
            <Box
              component="img"
              alt="Slack logo"
              src="logo-slack.svg"
            />
          </FormGrid>
          <FormGrid size={9}>
            <Typography variant="h6">Slack</Typography>
          </FormGrid>
          <FormGrid size={2} sx={{ alignItems: "end" }}>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch checked={accountsEnabled[0]} value="0" name="isSlackEnabled" onChange={handleSwitchChange} />
              }
              label="Enabled"
            />
          </FormGrid>
          <FormGrid size={1}></FormGrid>
          <FormGrid size={11}>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Show less</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  You haven't added your Slack yet or you aren't authorized. Please add our Slack Bot to your
                  account by clicking on here. When you've added the bot, send your verification code that you
                  have received.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </FormGrid>
          <FormGrid size={1}></FormGrid>
          <FormGrid size={11}>
            <Box sx={{ display: "flex", flexDirection: "row", borderRadius: "7px", padding: "5px", width: "100%", justifyContent: "space-between" }}>
              <FormLabel htmlFor="verification-code" sx={{ fontWeight: "bold", marginTop: "7px" }}>
                Verification Code
              </FormLabel>
              <Tooltip title="Copy" placement="top" arrow>
                <OutlinedInput
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  size="small"
                  value="A192345GC"
                />
              </Tooltip>
            </Box>
          </FormGrid>
          <FormGrid size={1}></FormGrid>
          <FormGrid size={11}>
            <Box sx={{ display: "flex", flexDirection: "row", borderRadius: "7px", padding: "5px", width: "100%", justifyContent: "space-between" }}>
              <FormLabel htmlFor="connected-account" sx={{ fontWeight: "bold", marginTop: "7px" }}>
                Connected account
              </FormLabel>
              <Box><FormLabel sx={{ fontWeight: "bold", marginTop: "7px", marginRight: "15px" }}>
                hello@creative-tim.com
              </FormLabel>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small">
                  DELETE
                </Button>
              </Box>
            </Box>
          </FormGrid>
          <FormDivider />
          <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
            <Box
              component="img"
              alt="Spotify logo"
              src="logo-spotify.svg"
            />
          </FormGrid>
          <FormGrid size={9}>
            <Typography variant="h6">Spotify</Typography>
            <Typography>Music</Typography>
          </FormGrid>
          <FormGrid size={2} sx={{ alignItems: "end" }}>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch checked={accountsEnabled[1]} value="1" name="isSpotifyEnabled" onChange={handleSwitchChange} />
              }
              label="Enabled"
            />
          </FormGrid>
          <FormDivider />
          <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
            <Box
              component="img"
              alt="Atlassian logo"
              src="logo-atlassian.svg"
            />
          </FormGrid>
          <FormGrid size={9}>
            <Typography variant="h6">Atlassian</Typography>
            <Typography>Payment vendor</Typography>
          </FormGrid>
          <FormGrid size={2} sx={{ alignItems: "end" }}>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch checked={accountsEnabled[2]} value="2" name="isAtlassianEnabled" onChange={handleSwitchChange} />
              }
              label="Enabled"
            />
          </FormGrid>
          <FormDivider />
          <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
            <Box
              component="img"
              alt="Asana logo"
              src="logo-asana.svg"
            />
          </FormGrid>
          <FormGrid size={9}>
            <Typography variant="h6">Asana</Typography>
            <Typography>Organize your team</Typography>
          </FormGrid>
          <FormGrid size={2} sx={{ alignItems: "end" }}>
            <FormControlLabel
              labelPlacement="start"
              control={
                <Switch checked={accountsEnabled[3]} value="3" name="isAsanaEnabled" onChange={handleSwitchChange} />
              }
              label="Enabled"
            />
          </FormGrid>
        </Grid2>
      </form >
    </Paper >
  )
};

export default Accounts;
