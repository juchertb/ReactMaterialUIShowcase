import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { useLayout } from "../context/LayoutContext";
import Link from "@mui/material/Link";

const Footer = (props) => {
  const { drawerWidth } = useLayout();
  return (
    <>
      <footer
        style={{ marginLeft: `${drawerWidth + 30}px`, textAlign: "center", width: "100%", display: "flex", justifyContent: "space-between", marginBottom: "10px" }}
      >
        <Grid2 container spacing={1} sx={{ width: "100%" }}>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Typography>© 2025 React Material UI Showcase</Typography>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }} sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
              About Us
            </Link>
            <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
              Contact
            </Link>
            <Link href="#" underline="hover" sx={{ margin: "0 10px", color: "text.secondary", fontWeight: "bold" }}>
              License
            </Link>
          </Grid2>
        </Grid2>
      </footer>
    </>
  )
};

export default Footer;
