import React from "react";
import Grid2 from "@mui/material/Grid2";
import { useLayout } from "../../context/LayoutContext";

const GridWrapper = ({ children }) => {
  const { drawerWidth } = useLayout();

  return (
    <Grid2
      size={12}
      sx={{
        marginLeft: `${drawerWidth}px`, //it was 250px
        padding: "48px 32px",
        position: "relative",
      }}
    >
      {children}
    </Grid2>
  );
};

export default GridWrapper;
