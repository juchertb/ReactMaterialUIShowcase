import { Box, CardMedia, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import FormDivider from "../Common/StyledComponents/FormDivider";
import PlaceIcon from '@mui/icons-material/Place';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router";

const RentalProperty = (props: any) => {
  const formatter = new Intl.NumberFormat("en-US");
  return (
    <>
      <Paper elevation={3} sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.75rem",
        width: "100%",
        padding: "20px",
        marginTop: "10px",
        perspective: '1000px',
        transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)",
        '& > img': {
          transition: 'inherit',
        },
        '&:hover': {
          '& > img': {
            transform: "translate(0, -40px)"
          },
        },

      }}>
        <CardMedia
          component="img"
          image={props.image}
          onError={() => console.log("this is error")}
          alt={props.image}
          sx={{
            borderRadius: "0.75rem",
            marginTop: "-40px",
            marginBottom: "-30px",
            zIndex: 99
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
          <Tooltip title="Refresh" arrow>
            <Link to="#">
              <RefreshIcon sx={{ color: "rgb(233, 30, 99)", marginRight: "30px" }} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit" arrow>
            <Link to="#">
              <EditIcon sx={{ color: "rgb(26, 115, 232)" }} />
            </Link>
          </Tooltip>
        </Box>
        <Typography variant="h5" sx={{ alignSelf: "center", marginTop: "15px", marginBottom: "15px" }}>{props.title}</Typography>
        <Box sx={{ justifyItems: "center" }}><Typography>{props.description}</Typography></Box>
        <FormDivider sx={{ marginTop: "15px", marginBottom: "15px" }} />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>${formatter.format(props.price)}/night</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", justifyItems: "center" }}>
            <PlaceIcon sx={{ marginRight: "3px" }} />
            <Typography>{props.location}</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  )
};

export default RentalProperty;
