import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import FormDivider from "../Common/StyledComponents/FormDivider";

const TodaysUsers = (props) => {
  return (
    <>
      <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "10px", marginTop: "10px" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Box sx={{
            display: "flex",
            WebkitBoxPack: "center",
            justifyContent: "center",
            WebkitBoxAlign: "center",
            alignItems: "center",
            width: "4rem",
            height: "4rem",
            marginLeft: "10px",
            marginRight: "10px",
            marginTop: "-30px",
            opacity: "1",
            background: "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
            color: "rgb(255, 255, 255)",
            borderRadius: "0.75rem",
            boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
          }}>
            <BarChartIcon sx={{ color: "white" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", paddingRight: "15px", alignItems: "end" }}>
            <Typography>Today's Users</Typography>
            <Typography variant="h4">2,300</Typography>
          </Box>
        </Box>
        <Box>
          <FormDivider sx={{ marginTop: "15px", marginBottom: "15px" }} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ color: "success.main" }}>
              +3%
            </Typography>
            <Typography>&nbsp;than last month</Typography>
          </Box>
        </Box>

      </Paper>
    </>
  )
};

export default TodaysUsers;
