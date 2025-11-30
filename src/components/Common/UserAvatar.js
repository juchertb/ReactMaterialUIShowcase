import React, { useContext } from "react";
import { Avatar, ListItemIcon, Menu, MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AuthenticationContext from "../../context/Authentication";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const UserAvatar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, setAuthenticated } = useContext(
    AuthenticationContext
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  function handleSignOut() {
    setAuthenticated(false);
    navigate("/Authentication");
  }
  function handleSignIn() {
    navigate("/Authentication");
  }
  function handleMenuItemClick(event) {
    switch (event.target.innerText) {
      case "View profile":
        navigate("/profile");
        break;
      case "Settings":
        navigate("/settings");
        break;
      case "Another profile":
        break;
      case "Log out":
        setAuthenticated(false);
        navigate("/Authentication");
        break;
      default:
        break;
    }
  }

  const menuItemsList = [
    {
      id: 1,
      title: "View profile",
      icon: null,
    },
    {
      id: 2,
      title: "Settings",
      icon: null,
    },
    // {
    //   id: 3,
    //   title: "Another profile",
    //   icon: null,
    // },
    {
      id: 4,
      title: "Log out",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <Box>
      <Tooltip title="Account settings">
        <Avatar
          onClick={handleClick}
          open={open}
          src="https://mui.com/static/images/avatar/1.jpg"
        />
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          sx={{
            display: "flex",
            padding: "2px 16px",
            flexDirection: "row",
            alignItems: "flex-start",
            alignSelf: "stretch",
            gap: "12px",
          }}
        >
          <Avatar
            onClick={handleClick}
            open={open}
            src="https://mui.com/static/images/avatar/1.jpg"
          />

          <div>
            <div>Olivia Rhye</div>
            <div>ID 97737d</div>
          </div>
        </MenuItem>
        <Divider component="div" />

        {isAuthenticated === true ? (
          menuItemsList?.map((menuItem, index) => (
            <MenuItem key={index} onClick={handleMenuItemClick}>
              {menuItem?.icon !== null && (
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
              )}
              {menuItem.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={4} onClick={handleSignIn}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <LoginIcon />
            </ListItemIcon>
            Sign-in
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default UserAvatar;
