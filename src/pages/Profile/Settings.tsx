import React, { ChangeEvent, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import BadgeIcon from "@mui/icons-material/Badge";
import CampaignIcon from "@mui/icons-material/Campaign";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, Avatar, Box, CircularProgress, CssBaseline, FormControlLabel, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Snackbar, styled, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";
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
import { SiteProfile, SiteSettings } from "../../Utils/Types";
import axios from "axios";
import { apiHost } from "../../Utils/customFetch";

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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [notifSettings, setNotifSettings] = useState<SiteSettings>(null);
  const [saving, setSaving] = React.useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = React.useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [siteProfile, setSiteProfile] = React.useState(null);

  const handleInvisibleChange = () => {
    setIsInvisible(!isInvisible);
  }

  const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.up("lg"));

  React.useEffect(() => {
    const fetchData = async () => {

      // 1. Fetch site settings data
      try {
        setLoading(true);
        // 2. Axios automatically parses JSON and throws on 4xx/5xx errors
        const response = await axios.get(`${apiHost}/siteSettings`);
        setError(null);
        setNotifSettings(response.data[0] as SiteSettings);
      } catch (err: any) {
        // 3. Check if the error was amaula abort to avoid state updates
        if (!axios.isCancel(err)) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }

      // 2. Fetch site profile data
      try {
        setLoading(true);
        // 2. Axios automatically parses JSON and throws on 4xx/5xx errors
        const response = await axios.get(`${apiHost}/siteProfile`);
        setError(null);
        setSiteProfile(response.data[0] as SiteProfile);
      } catch (err: any) {
        // 3. Check if the error was amaula abort to avoid state updates
        if (!axios.isCancel(err)) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Debounce saveNotifSettings. Saves switch settings with 1000ms delay after user stops changing them
  const saveTimeoutRef = React.useRef<number | ReturnType<typeof setTimeout> | null>(null);
  const isInitialRef = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (!notifSettings) return;

    // Skip the initial load (we don't want to save right after fetching)
    if (isInitialRef.current) {
      isInitialRef.current = false;
      return;
    }

    // Clear previous debounce timer
    if (saveTimeoutRef.current != null) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    // Set new debounce timer
    saveTimeoutRef.current = window.setTimeout(() => {
      saveNotifSettings(notifSettings);
      saveTimeoutRef.current = null;
    }, 1000);

    // Cleanup on unmount or next effect run
    return () => {
      if (saveTimeoutRef.current != null) {
        window.clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [notifSettings]);

  // Debounced save for notifSettings (1000ms)
  const saveNotifSettings = async (settings: SiteSettings) => {
    if (!settings) return;
    if (typeof settings.id === 'undefined') {
      console.warn('Cannot save notifSettings: missing id', settings);
      return;
    }

    setSaving('saving');
    setSaveError(null);

    try {
      await axios.put(`${apiHost}/siteSettings/${settings.id}`, settings);
      setSaving('success');
      setSnackbarOpen(true);
      // clear success state shortly after
      setTimeout(() => setSaving('idle'), 1500);
    } catch (err: any) {
      console.error('Failed to save notifSettings:', err);
      setSaveError(err?.message || 'Failed to save');
      setSaving('error');
      setSnackbarOpen(true);
    }
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const name = event.target.name;
    const updated = { ...notifSettings, [name]: checked } as SiteSettings;
    setNotifSettings(updated);
  };

  //console.log(notifSettings);

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  return (
    <GridWrapper>
      {isAuthenticated === true ? (
        <>
          <AppTheme {...props}>
            {/*
            <CssBaseline enableColorScheme />
            <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
              <ColorModeIconDropdown />
            </Box>
            */}
            <Grid2 container spacing={2} sx={{
              [theme.breakpoints.down("lg")]: {
                display: "grid",
              },
              minWidth: "400px"
            }}>
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 2, xl: 2 }} sx={{
                display: "flex",
                flexDirection: "row"
              }}
              >
                <Paper elevation={3} sx={{
                  borderRadius: "0.75rem",
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  width: "100%"
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
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 10, xl: 10 }} sx={{
                marginBottom: "30px",
                display: "flex",
                flexDirection: "column"
              }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="h3" sx={{
                            fontSize: { xs: '1.5rem', sm: '1.5rem', md: '1.8rem', lg: '2rem' } // values per breakpoint
                          }}>{siteProfile?.firstname} {siteProfile?.lastname}</Typography>
                          {saving === 'saving' && (
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', ml: 2 }}>
                              <CircularProgress size={14} />
                              <Typography variant="caption" sx={{ ml: 1 }}>Saving…</Typography>
                            </Box>
                          )}
                          {saving === 'success' && (
                            <Typography variant="caption" sx={{ ml: 2, color: 'success.main' }}>Saved</Typography>
                          )}
                        </Box>
                        <Typography sx={{ color: "gray" }}>CEO / Co-Founder</Typography>
                      </Box>
                    </Box>
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Switch checked={(notifSettings?.profileInvisibleMode ?? false)} onChange={handleSwitchChange} name="profileInvisibleMode" />
                      }
                      label="Switch to invisible"
                    />
                  </Box>
                </Paper>
                <UserBasicInfo profile={siteProfile} />
                <ChangePassword />
                <TwoFactorAuthentication />
                <Accounts
                  notifSettings={notifSettings}
                  onNotifSettingsChange={setNotifSettings}
                  saveStatus={saving} />
                <Notifications
                  notifSettings={notifSettings}
                  onNotifSettingsChange={setNotifSettings}
                  saveStatus={saving} />
                <Sessions />
                <DeleteAccount />
              </FormGrid>
            </Grid2>
          </AppTheme>
        </>
      ) : (
        <SignIn />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={saving === 'error' ? 'error' : 'success'} sx={{ width: '100%' }}>
          {saving === 'error' ? `Failed to save settings${saveError ? `: ${saveError}` : ''}` : 'Settings saved'}
        </Alert>
      </Snackbar>
    </GridWrapper>
  );
};

export default Settings;
