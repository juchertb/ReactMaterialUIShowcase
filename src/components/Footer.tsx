import { Box, Typography } from "@mui/material";
import React from "react";
import GridWrapper from "./Common/GridWrapper";
import { useLayout } from "../context/LayoutContext";
import Link from "@mui/material/Link";

const Footer = (props) => {
  const { drawerWidth } = useLayout();
  return (
    <>
      <footer
        style={{ marginLeft: `${drawerWidth + 10}px`, textAlign: "center", width: "100%", padding: "1rem 0", display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Typography>© 2025 React Material UI Showcase</Typography>
        </Box>
        <Box sx={{ marginRight: "10px" }}>
          <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
            About Us
          </Link>
          <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
            Contact
          </Link>
          <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
            License
          </Link></Box>
      </footer>
    </>
  )
};

export default Footer;
