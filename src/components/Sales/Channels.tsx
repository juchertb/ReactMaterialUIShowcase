import React from "react";
import PieActiveArc from "./PieActiveArc";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Channels = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "normal" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Channels</Typography>
        <Tooltip title="See traffic channels" arrow>
          <IconButton
            href="./analytics"
            target="_blank"
            sx={{ border: 0, paddingTop: 0 }}
          >
            <ErrorOutlineIcon sx={{ color: "gray" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <PieActiveArc />
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "15px", justifyContent: "space-between", alignItems: "normal" }}>
        <Typography>More than <b>1,200,000</b> sales are made using referral marketing, and <b>700,000</b> are from social media.</Typography>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="small"
          sx={{ whiteSpace: "nowrap", fontSize: "11px" }}
        >
          Read more
        </Button>
      </Box>
    </>
  )
};

export default Channels;
