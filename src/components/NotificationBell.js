import React from "react";
import Badge from "@mui/material/Badge";
import NotificationIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Tooltip } from "@mui/material";
import BasicMenu from "./Common/BasicMenu/BasicMenu";

const NotificationBell = ({ iconColor, badgeContent }) => {
  const newNotifications = `You have ${badgeContent} new notifications!`;
  const noNotifications = "No new notifications";

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const notificationBellItems = [
    {
      id: 0,
      label: "Check new messages",
      icon: <EmailIcon />,
    },
    {
      id: 1,
      label: "Manage Podcast sessions",
      icon: <PodcastsIcon />,
    },
    {
      id: 2,
      label: "Payment successfully completed",
      icon: <ShoppingCartIcon />,
    },
  ];

  return (
    <div>
      <Tooltip
        title={
          notificationBellItems.length ? newNotifications : noNotifications
        }
      >
        <IconButton
          color={iconColor}
          onClick={notificationBellItems.length ? handleOpen : null}
          anchorEl={anchorEl}
          sx={{ marginRight: "10px" }}
        >
          <Badge badgeContent={notificationBellItems.length} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <BasicMenu
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          menuItems={notificationBellItems}
        />
      </Tooltip>
    </div>
  );
};

export default NotificationBell;
