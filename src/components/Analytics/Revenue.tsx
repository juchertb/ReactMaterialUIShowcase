import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FormDivider from "../Common/StyledComponents/FormDivider";

const Revenue = (props) => {
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
            background: "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
            color: "rgb(255, 255, 255)",
            borderRadius: "0.75rem",
            boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(76, 175, 79, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
          }}>
            <HomeWorkIcon sx={{ color: "white" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", paddingRight: "15px", alignItems: "end" }}>
            <Typography>Revenue</Typography>
            <Typography variant="h4">34k</Typography>
          </Box>
        </Box>
        <Box>
          <FormDivider sx={{ marginTop: "15px", marginBottom: "15px" }} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ color: "success.main" }}>
              +1%
            </Typography>
            <Typography>&nbsp;than yesterday</Typography>
          </Box>
        </Box>

      </Paper>
    </>
  )
};

export default Revenue;
