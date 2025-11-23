import { Grid2, Paper, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useTheme } from "@mui/material/styles";

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type NotificationOptions = {
  email: boolean;
  push: boolean;
  sms: boolean;
}

const Notifications = (props) => {
  const theme = useTheme();
  const [notificationOptions, setNotificationOptions] = useState<NotificationOptions[]>([
    {
      email: true,
      push: false,
      sms: false
    },
    {
      email: true,
      push: true,
      sms: false
    },
    {
      email: false,
      push: true,
      sms: false
    },
    {
      email: true,
      push: true,
      sms: true
    },
  ]);

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

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const name = event.target.name;
    const rowId = event.target.value;
    const newOptions: NotificationOptions[] = { ...notificationOptions };
    newOptions[rowId] = { ...newOptions[rowId], [name]: checked };
    setNotificationOptions(newOptions)

    // Should we save hier??????????
  };

  return (
    <Paper elevation={3} sx={{
      borderRadius: "0.75rem",
      width: "100%",
      height: "100%",
      padding: "15px",
      marginTop: "15px",
    }}>
      <Typography variant="h6">Notifications</Typography>
      <Typography>Choose how you receive notifications. These notification settings apply to the things you’re watching.</Typography>
      <div id="notifications" />
      <form onSubmit={handleSubmit}>
        <TableContainer sx={{ maxHeight: 440, marginTop: "20px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", minWidth: "55%", fontWeight: "bold" }}>Activity</TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1", minWidth: "15%", fontWeight: "bold" }}>Email</TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1", minWidth: "15%", fontWeight: "bold" }}>Push</TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1", minWidth: "15%", fontWeight: "bold" }}>SMS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover key="1">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Mentions</Typography>
                  <Typography>Notify when another user mentions you in a comment</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[0].email} value="0" name="email" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[0].push} value="0" name="push" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[0].sms} value="0" name="sms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="2">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Comments</Typography>
                  <Typography>Notify when another user comments your item.</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[1].email} value="1" name="email" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[1].push} value="1" name="push" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[1].sms} value="1" name="sms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="3">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Follows</Typography>
                  <Typography>Notify when another user follows you.</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[2].email} value="2" name="email" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[2].push} value="2" name="push" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[2].sms} value="2" name="sms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="4">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Log in from a new device</Typography>
                  <Typography>&nbsp;</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[3].email} value="3" name="email" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[3].push} value="3" name="push" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={notificationOptions[3].sms} value="3" name="sms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </form >
    </Paper >
  )
};

export default Notifications;
