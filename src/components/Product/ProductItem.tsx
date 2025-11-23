import { Box, CardMedia, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import FormDivider from "../Common/StyledComponents/FormDivider";
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router";
import CategoryIcon from '@mui/icons-material/Category';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductItem = (props: any) => {
  const formatter = new Intl.NumberFormat("en-CA");
  const options1: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    minute: "numeric",
    hour: "numeric",
    second: "numeric",
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options1);
  const currencyFormatter = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const percentFormatter = new Intl.NumberFormat("en-CA", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Paper elevation={3} sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.75rem",
        width: "100%",
        height: "100%",
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
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>ID: {props.id}</Typography>
          <Box>
            <Tooltip title="Refresh" arrow>
              <Link to="#">
                <RefreshIcon sx={{ color: "rgb(19, 179, 5)", marginRight: "30px" }} />
              </Link>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <EditIcon onClick={props.onEdit(props.id, props.title)} sx={{ cursor: "pointer", color: "rgb(26, 115, 232)", marginRight: "30px" }} />
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <Link to="#" onClick={props.onDelete(props.id)}>
                <DeleteIcon sx={{ color: "rgb(252, 5, 5)" }} />
              </Link>
            </Tooltip>
          </Box>
        </Box>
        <Typography variant="h5" sx={{ alignSelf: "center", marginTop: "15px", marginBottom: "15px" }}>{props.title}</Typography>
        <Box sx={{ justifyItems: "center", height: "100%" }}><Typography>{props.description}</Typography></Box>
        <FormDivider sx={{ marginTop: "15px", marginBottom: "15px" }} />
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography>Price: {currencyFormatter.format(props.price)}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", justifyItems: "center" }}>
            <Tooltip title="Product category" arrow>
              <CategoryIcon sx={{ marginRight: "3px" }} />
            </Tooltip>
            <Typography>{props.location}</Typography>
          </Box>
        </Box>
      </Paper >
    </>
  )
};

export default ProductItem;
