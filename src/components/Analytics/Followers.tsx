import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FormDivider from "../Common/StyledComponents/FormDivider";

const Followers = (props) => {
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
            background: "linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))",
            color: "rgb(255, 255, 255)",
            borderRadius: "0.75rem",
            boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(233, 30, 98, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
          }}>
            <PersonAddIcon sx={{ color: "white" }} />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", paddingRight: "15px", alignItems: "end" }}>
            <Typography>Followers</Typography>
            <Typography variant="h4">+91</Typography>
          </Box>
        </Box>
        <Box>
          <FormDivider sx={{ marginTop: "15px", marginBottom: "15px" }} />
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ color: "success.main" }}>
              +1%
            </Typography>
            <Typography>Just updated</Typography>
          </Box>
        </Box>

      </Paper>
    </>
  )
};

export default Followers;
