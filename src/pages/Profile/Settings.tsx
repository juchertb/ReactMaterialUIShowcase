import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import BadgeIcon from "@mui/icons-material/Badge";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, CssBaseline, FormControlLabel, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
import GridWrapper from "../../components/Common/GridWrapper";
import SignIn from "../../components/SignIn/SignIn";
import useAuthentication from "../../hooks/useAuthentication";
import AppTheme from "../../theme/AppTheme";
import ColorModeIconDropdown from "../../theme/ColorModelIconDropdown";
import UserBasicInfo from "../../components/Profile/UserBasicInfo";
import ChangePassword from "../../components/Profile/ChangePassword";
import TwoFactorAuthentication from "../../components/Profile/TwoFactorAuthentication";
import Accounts from "../../components/Profile/Accounts";
import Notifications from "../../components/Profile/Notifications";
import Sessions from "../../components/Profile/Sessions";
import DeleteAccount from "../../components/Profile/DeleteAccount";

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type NavbarItem = {
  id: number;
  icon: React.JSX.Element;
  label: string;
  route: string;
}

export const settingsNavbarItems: NavbarItem[] = [
  {
    id: 0,
    icon: <PersonIcon />,
    label: "Profile",
    route: "profile",
  },
  {
    id: 1,
    icon: <ReceiptLongIcon />,
    label: "BasicInfo",
    route: "basic-info",
  },
  {
    id: 2,
    icon: <LockIcon />,
    label: "Change Password",
    route: "change-password",
  },
  {
    id: 3,
    icon: <SecurityIcon />,
    label: "2FA",
    route: "2fa",
  },
  {
    id: 4,
    icon: <BadgeIcon />,
    label: "Accounts",
    route: "accounts",
  },
  {
    id: 5,
    icon: <CampaignIcon />,
    label: "Notifications",
    route: "notifications",
  },
  {
    id: 6,
    icon: <SettingsApplicationsIcon />,
    label: "Sessions",
    route: "sessions",
  },
  {
    id: 7,
    icon: <DeleteIcon />,
    label: "Delete Account",
    route: "delete-account",
  },
];

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: "red",
    },
  },
});

const Settings = (props) => {
  const { isAuthenticated } = useAuthentication();
  const [isInvisible, setIsInvisible] = useState(true);

  const handleInvisibleChange = () => {
    setIsInvisible(!isInvisible);
  }

  const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
              <ColorModeIconDropdown />
            </Box>
            <Grid2 container spacing={2} sx={{
              [theme.breakpoints.down("lg")]: {
                display: "grid",
              }
            }}>
              <FormGrid size={2} sx={{ display: "flex", flexDirection: "row" }}>
                <Paper elevation={3} sx={{
                  borderRadius: "0.75rem",
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary
                }}>
                  <List>
                    {settingsNavbarItems.map((item, index) => (
                      <ListItem
                        key={item.id}
                        onClick={() => document.getElementById(item.route)?.scrollIntoView()}
                      >
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </FormGrid>
              <FormGrid size={10} sx={{ marginBottom: "30px", display: "flex", flexDirection: "column" }}>
                <div id="profile" />
                <Paper elevation={3} sx={{
                  borderRadius: "0.75rem",
                  width: "100%",
                  height: "100px",
                  marginBottom: "15px",
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                }}>
                  <Box sx={{ margin: "15px", marginBottom: "30px", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Avatar sx={{ width: 70, height: 70, marginRight: "10px" }}
                        src="https://mui.com/static/images/avatar/1.jpg"
                      />
                      <Box>
                        <Typography variant="h3">Richard Davis</Typography>
                        <Typography sx={{ color: "gray" }}>CEO / Co-Founder</Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch checked={isInvisible} onChange={handleInvisibleChange} name="isInvisible" />
                      }
                      label="Switch to invisible"
                    />
                  </Box>
                </Paper>
                <UserBasicInfo />
                <ChangePassword />
                <TwoFactorAuthentication />
                <Accounts />
                <Notifications />
                <Sessions />
                <DeleteAccount />
              </FormGrid>
            </Grid2>
          </AppTheme>
        </>
      ) : (
        <SignIn />
      )}
    </GridWrapper>
  );
};

export default Settings;
