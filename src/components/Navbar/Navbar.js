import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./consts/navbarItems";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse, IconButton, styled, Tooltip } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AlsacomLogo from "../Common/AlsacomLogo";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AuthenticationContext from "../../context/Authentication";
import { useLayout } from "../../context/LayoutContext";

const MenuListItem = styled(List)(() => ({
  justifyContent: "flex-start",
  //"-webkit-box-align": "center",
  WebkitBoxAlign: "center",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "left",
  paddingTop: "0px",
  paddingBottom: "0px",
}));

const MenuListItemButton = styled(ListItemButton)(() => ({
  opacity: "1",
  background: "transparent",
  color: "rgb(255, 255, 255)",
  display: "flex",
  //"-webkit-box-align": "center",
  WebkitBoxAlign: "center",
  alignItems: "center",
  width: "100%",
  padding: "0.5rem 1rem",
  margin: "0.09375rem 1rem",
  borderRadius: "0.375rem",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
  boxShadow: "none",
  "&:hover": {
    opacity: "1",
    color: "rgb(255, 255, 255)",
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem",
    background: "rgba(255, 255, 255, 0.2)",
  },
}));

const Navbar = ({ initialOpen = true }) => {
  const navigate = useNavigate();
  const { openMenu, setOpenMenu, drawerWidth, openWidth, closedWidth } =
    useLayout();

  const submenuOpen = Array.from(
    { length: mainNavbarItems.length },
    (v, i) => false
  );
  const [open, setOpen] = React.useState(submenuOpen);
  const { isAuthenticated, setAuthenticated } = React.useContext(
    AuthenticationContext
  );
  const location = useLocation();
  const { pathname } = location;

  const handleClick = (itemId) => {
    let newOpen = Array.from(open);
    newOpen[itemId] = !open[itemId];
    setOpen(newOpen);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    navigate("/Authentication");
  };

  const handleSubItemClick = (event, route) => {
    event?.stopPropagation();
    navigate(route);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      width={openMenu ? openWidth : closedWidth}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          //overflowX: "hidden",
          boxShadow: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
          transform: "translateX(0px)",
          borderWidth: "initial",
          borderStyle: "none",
          borderColor: "initial",
          borderImage: "initial",
          background:
            "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
          transition: "transform 200ms cubic-bezier(0.4, 0, 0.6, 1)",
        },
        "& .Mui-selected": {
          color: "red",
        },
      }}
    >
      <AlsacomLogo
        color="white"
        paddingLeft={openMenu ? "60px" : "30px"}
        paddingTop="35px"
        logoOnly={!openMenu}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: openMenu ? "space-between" : "center",
          p: 1,
          marginTop: "10px",
        }}
      >
        {open && (
          <Box component="span" sx={{ fontWeight: "600" }}>
            &nbsp;
          </Box>
        )}
        <Tooltip
          title={
            openMenu ? "Collapse navigation menu" : "Expand navigation menu"
          }
          placement="right"
          arrow
        >
          <IconButton
            variant="outlined"
            sx={{
              key: "menu-toggle-button",
              border: "none !important",
              backgroundColor: "transparent !important",
              color: "white !important",
            }}
            onClick={() => setOpenMenu((s) => !s)}
          >
            {openMenu ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <List component="nav">
        {mainNavbarItems.map((item, index) => (
          <Box key={index}>
            {item.addDivider ? (
              <Divider
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  flexShrink: "0",
                  borderTop: "0px solid rgba(0, 0, 0, 0.08)",
                  borderLeft: "0px solid rgba(0, 0, 0, 0.08)",
                  borderRight: "0px solid rgba(0, 0, 0, 0.08)",
                  borderBottom: "none",
                  backgroundColor: "transparent",
                  opacity: "0.25",
                  height: "0.0625rem",
                  backgroundImage:
                    "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important;",
                }}
              />
            ) : null}
            <MenuListItem
              key={item.id}
              button="true"
              onClick={() =>
                item.submenu ? handleClick(item.id) : navigate(item.route)
              }
              sx={{ minWidth: "55px" }}
            >
              <Tooltip
                key={item.id}
                title={openMenu ? "" : item.label}
                placement="right"
                arrow
              >
                <MenuListItemButton
                  sx={
                    pathname === "/" + item.route
                      ? {
                          background: "rgba(75, 108, 150, 0.54)",
                          minWidth: "55px",
                        }
                      : {
                          minWidth: "55px",
                        }
                  }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      ml: openMenu ? 0 : -1,
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      opacity: openMenu ? 1 : 0,
                      transition: "opacity 200ms ease",
                      whiteSpace: "nowrap",
                      "& span": {
                        marginLeft: "5px",
                        fontWeight: "600 !important",
                        fontSize: "16px",
                      },
                    }}
                    primary={item.label}
                  />
                  {item.submenu &&
                    (open[item.id] ? <ExpandLess /> : <ExpandMore />)}
                </MenuListItemButton>
              </Tooltip>
              {item.submenu ? (
                <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      minWidth: "55px",
                      paddingBottom: "0px",
                      paddingTop: "0px",
                    }}
                  >
                    {item.submenu.map((subItem, index) => (
                      <MenuListItem
                        key={index}
                        button="true"
                        onClick={(event) =>
                          subItem.label === "Logout" ||
                          subItem.label === "Sign In"
                            ? handleLogout()
                            : handleSubItemClick(event, subItem.route)
                        }
                        sx={{
                          width: openMenu ? "210px" : "55px",
                        }}
                      >
                        <Tooltip
                          key={subItem.id}
                          title={openMenu ? "" : subItem.label}
                          placement="right"
                          arrow
                        >
                          <MenuListItemButton
                            sx={
                              pathname === "/" + subItem.route
                                ? {
                                    background: "rgba(75, 108, 150, 0.54)",
                                    minWidth: "55px",
                                  }
                                : {
                                    minWidth: "55px",
                                  }
                            }
                          >
                            <ListItemIcon
                              sx={{
                                color: "rgba(255, 255, 255, 0.7)!important",
                                marginLeft: openMenu ? "10px" : "5px",
                              }}
                            >
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              sx={{
                                opacity: openMenu ? 1 : 0,
                                transition: "opacity 200ms ease",
                                whiteSpace: "nowrap",
                                "& span": {
                                  marginLeft: "5px",
                                  fontWeight: "600",
                                  fontSize: "16px",
                                },
                              }}
                              primary={subItem.label}
                            />
                          </MenuListItemButton>
                        </Tooltip>
                      </MenuListItem>
                    ))}
                  </List>
                </Collapse>
              ) : null}
            </MenuListItem>
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
