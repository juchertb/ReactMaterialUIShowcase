import { Box, Button, Menu, MenuItem, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const SummaryPanel = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", paddingTop: "5px", marginTop: "15px" }}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography sx={{ fontWeight: "bold", color: "gray" }}>{props.title}</Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ fontWeight: "normal" }}
        >
          {props.timespan}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ top: "-5px" }}
        >
          <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
          <MenuItem onClick={handleClose}>Last week</MenuItem>
          <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
        </Menu>
      </Box>
      <Typography variant="h6">{props.amount}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography sx={{ color: "success.main", fontWeight: "bold", marginRight: "5px" }}>{props.percentage}</Typography>
        <Typography>{props.since}</Typography>
      </Box>
    </Paper>
  )
};

export default SummaryPanel;
