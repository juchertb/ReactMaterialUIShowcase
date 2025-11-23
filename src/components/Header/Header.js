import NotificationBell from "../../components/NotificationBell";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import Box from "@mui/material/Box";
import { headerStyles } from "./styles";
import UserAvatar from "../Common/UserAvatar";
import RouterBreadcrumbs from "../Common/RouterBreadcrumbs";
import { useLayout } from "../../context/LayoutContext";

const Header = ({ title }) => {
  const { drawerWidth } = useLayout();

  return (
    <Box sx={headerStyles.wrapper}>
      {/* First row */}
      <Box sx={headerStyles.topRow}>
        <NotificationBell iconColor="oddcolor" badgeContent={3} />
        <Tooltip title="Help">
          <IconButton
            href="https://mui.com/material-ui/"
            target="_blank"
            color="white"
            sx={headerStyles.helpButton}
          >
            <HelpIcon sx={{ color: "white" }} />
          </IconButton>
        </Tooltip>
        <UserAvatar />
      </Box>
      {/* second row */}
      <Box sx={headerStyles.middleRow}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: `${drawerWidth + 10}px !important`,
          }}
        >
          <Typography
            sx={{ textTransform: "capitalize" }}
            color="white"
            variant="h1"
          >
            {title}
          </Typography>
          <RouterBreadcrumbs />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
