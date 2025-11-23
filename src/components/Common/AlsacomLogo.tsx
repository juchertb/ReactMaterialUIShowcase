import { Box, Typography } from "@mui/material";
import React from "react";
import PixIcon from "@mui/icons-material/Pix";

const AlsacomLogo = ({ color, paddingLeft, paddingTop, logoOnly }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        color: { color },
        paddingTop: { paddingTop }, //"35px",
        paddingLeft: { paddingLeft }, //"60px",
      }}
    >
      <PixIcon />
      <Typography variant="h5" hidden={logoOnly}>Alsacom</Typography>
    </Box>
  )
};

export default AlsacomLogo;
