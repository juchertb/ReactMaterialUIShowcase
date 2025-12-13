import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import FormDivider from "../Common/StyledComponents/FormDivider";
import { FaPaypal } from 'react-icons/fa';

const Paypal = (props) => {
  return (
    <>
      <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "10px", marginTop: "10px", alignItems: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
          opacity: "1",
          background: "linear-gradient(195deg, rgba(5, 176, 255, 1), rgb(25, 25, 25))",
          color: "rgba(5, 176, 255, 1)",
          borderRadius: "0.75rem",
          boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
        }}>
          <FaPaypal style={{ color: "white", fontSize: "2rem" }} />
        </Box>
        <Typography variant="h5">Paypal</Typography>
        <Typography sx={{ color: "text.secondary" }}>Freelance Payment</Typography>
        <FormDivider sx={{ marginTop: "15px", marginBottom: "15px", width: "50%" }} />
        <Typography variant="h5">+$455.00</Typography>
      </Paper>
    </>
  )
};

export default Paypal;
