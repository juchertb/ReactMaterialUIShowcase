import { Alert, Grid2, Paper, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Snackbar, CircularProgress, Box } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { SiteSettings } from "../../Utils/Types";

// Add props interface
type NotificationsProps = {
  notifSettings: SiteSettings;
  saveStatus: 'idle' | 'saving' | 'success' | 'error';
  onNotifSettingsChange?: (s: SiteSettings) => void;
};

const Notifications = ({ notifSettings, onNotifSettingsChange, saveStatus }: NotificationsProps) => {
  // keep a local copy for optimistic editing
  const [local, setLocal] = useState<SiteSettings>(null);
  React.useEffect(() => setLocal(notifSettings ?? null), [notifSettings]);

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const name = event.target.name;
    const updated = { ...(local ?? notifSettings), [name]: checked } as SiteSettings;
    setLocal(updated);
    onNotifSettingsChange?.(updated);
  };

  // use `local ?? notifSettings` when reading fields in UI, and keep debounce save here or in parent
  return (
    <Paper elevation={3} sx={{
      borderRadius: "0.75rem",
      width: "100%",
      height: "100%",
      padding: "15px",
      marginTop: "15px",
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6">Notifications</Typography>
        {saveStatus === 'saving' && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 2 }}>
            <CircularProgress size={14} />
            <Typography variant="caption" sx={{ ml: 1 }}>Saving…</Typography>
          </Box>
        )}
        {saveStatus === 'success' && (
          <Typography variant="caption" sx={{ ml: 2, color: 'success.main' }}>Saved</Typography>
        )}
      </Box>
      <Typography>Choose how you receive notifications. These notification settings apply to the things you’re watching.</Typography>
      <div id="notifications" />
      <form>
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
                  <Switch checked={(local ?? notifSettings)?.notifMentionsEmail ?? false} value="false" name="notifMentionsEmail" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifMentionsPush ?? false} value="false" name="notifMentionsPush" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifMentionsSms ?? false} value="false" name="notifMentionsSms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="2">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Comments</Typography>
                  <Typography>Notify when another user comments your item.</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifCommentsEmail ?? false} value="false" name="notifCommentsEmail" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifCommentsPush ?? false} value="false" name="notifCommentsPush" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifCommentsSms ?? false} value="false" name="notifCommentsSms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="3">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Follows</Typography>
                  <Typography>Notify when another user follows you.</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifFollowsEmail ?? false} value="false" name="notifFollowsEmail" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifFollowsPush ?? false} value="false" name="notifFollowsPush" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifFollowsSms ?? false} value="false" name="notifFollowsSms" onChange={handleSwitchChange} />
                </TableCell>
              </TableRow>
              <TableRow hover key="4">
                <TableCell key="1" align="left" sx={{ border: 1, borderColor: "#e1e1e1", display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ fontWeight: "bold" }}>Log in from a new device</Typography>
                  <Typography>&nbsp;</Typography>
                </TableCell>
                <TableCell key="2" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifLoginEmail ?? false} value="false" name="notifLoginEmail" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="3" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifLoginPush ?? false} value="false" name="notifLoginPush" onChange={handleSwitchChange} />
                </TableCell>
                <TableCell key="4" align="center" sx={{ border: 1, borderColor: "#e1e1e1" }}>
                  <Switch checked={(local ?? notifSettings)?.notifLoginSms ?? false} value="false" name="notifLoginSms" onChange={handleSwitchChange} />
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
