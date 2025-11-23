import axios from "axios";
import React from "react";
import { apiHost } from "../../Utils/customFetch";
import { Alert, Avatar, Box, Grid2, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router";
import FormGrid from "../Common/StyledComponents/FormGrid";
import { GridRowsProp } from "@mui/x-data-grid";
import PaymentIcon from '@mui/icons-material/Payment';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const OrderReviews = (props) => {
  const [rows, setRows] = React.useState([] as GridRowsProp);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const id: string = location.state?.customerId;

  const getStatusIndex = (status: string) => {
    switch (status) {
      case "delivered":
        return 0;
      case "cancelled":
        return 1;
      case "ordered":
        return 2;
      default:
        return 3;
    }
  }

  React.useEffect(() => {
    setError(null);
    axios.get(`${apiHost}/reviews?filter={"customer_id":${id}}&sort=["date","desc"]&embed=["command"]`)
      .then(function (response) {
        response.status === 200 ? setRows(response.data) : setError(response.statusText);
        setLoading(false);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  const handleSubmit = evt => {
    // evt.preventDefault();

    // let data = { personInfo };

    // console.log(data);
    // return;

    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    //     .then(response => response.json())
    //     .then(response => console.log("Success:", JSON.stringify(response)))
    //     .catch(error => console.error("Error:", error));
  };

  const valueFormatter = (item: { value: number }) => `${item.value}%`;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Tooltip
          title="Delivered"><LocalShippingIcon color="success" /></Tooltip>;
      case "cancelled":
        return <Tooltip
          title="Cancelled"><CancelPresentationIcon style={{ color: "red" }} color="error" /></Tooltip>;
      case "ordered":
        return <Tooltip
          title="Ordered"><PaymentIcon style={{ color: "green" }} color="success" /></Tooltip>;
      default:
        return <Tooltip
          title="Ordered"><PaymentIcon style={{ color: "green" }} color="success" /></Tooltip>;
    }
  }

  // The orders by customer wasn't meaningfull enough to render a pie chart
  // for the order by status. Use static data instead.
  const ordersByStatusStatic = [
    {
      label: 'Delivered',
      value: 9,
    },
    {
      label: 'Cancelled',
      value: 2,
    },
    {
      label: 'Ordered',
      value: 5,
    },
    {
      label: 'Other',
      value: 1,
    },
  ]

  return (
    <Grid2 container spacing={2}>
      <FormGrid size={{ sx: 6, lg: 12 }} sx={{ border: 1 }}>
        <Paper elevation={3} sx={{ minWidth: "500px", borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
          <List sx={{ marginLeft: "0px", paddingLeft: "0px", width: '100%' }}>
            <ListSubheader sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <ListItemText sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>ORDER</ListItemText>
              <ListItemText sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>REVIEW TEXT</ListItemText>
            </ListSubheader>
            {
              (rows.length > 0 ?
                rows.map((item, index) => (
                  <ListItem key={index} divider={true} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "start" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: "35%", marginRight: "10px" }}>
                      <ListItemAvatar>
                        <Avatar>{getStatusIcon(item.command.status)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={"Reference #: " + item.command.reference}
                        secondary={
                          <>
                            <Typography>
                              <b>Status: </b><span style={{ textTransform: "capitalize" }}>{item.command.status}</span>
                            </Typography>
                            <><Typography>
                              <b>Ordered: </b>{dateFormatter.format(new Date(item.command.date))}
                            </Typography></>
                          </>
                        }
                        slotProps={{
                          primary: { style: { fontWeight: "bold", minWidth: "300px" } }
                        }}>
                      </ListItemText>
                    </Box>
                    <ListItemText sx={{ width: "65%" }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.text}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))
                : <Typography sx={{ marginTop: "20px" }}>This customer hasn't reviewed any orders</Typography>)
            }
          </List >
        </Paper >
      </FormGrid >
    </Grid2 >
  )
};

export default OrderReviews;
