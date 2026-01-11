import axios from "axios";
import React from "react";
import { apiHost } from "../../Utils/customFetch";
import { Alert, Avatar, Box, Button, Grid2, IconButton, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router";
import FormGrid from "../Common/StyledComponents/FormGrid";
import { GridRowsProp } from "@mui/x-data-grid";
import PaymentIcon from '@mui/icons-material/Payment';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PieChart } from '@mui/x-charts/PieChart';


const OrderHistory = (props) => {
  const [rows, setRows] = React.useState([] as GridRowsProp);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const location = useLocation();
  const id: string = location.state?.customerId;
  const [ordersByStatus, setOrdersByStatus] = React.useState<{
    label: string;
    value: number;
  }[]>([]);
  const [ordersByYear, setOrdersByYear] = React.useState<{
    label: string;
    value: number;
  }[]>([]);

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
    axios.get(`${apiHost}/customerOrders?filter={"customer_id":${id}}&sort=["date","desc"]&embed=["command"]`)
      .then(function (response) {
        response.status === 200 ? setRows(response.data) : setError(response.statusText);
        setLoading(false);

        // Create the "Number of orders by status" data
        const statusCounts: { [index: number]: { label: string; value: number } } = {};
        response.data.forEach((order) => {
          const status: string = (order.command && order.command.status) ? order.command.status : 'other';
          const statusIndex: number = getStatusIndex(status);
          if (!statusCounts[statusIndex]) {
            statusCounts[statusIndex] = { label: status, value: 1 };
          } else {
            statusCounts[statusIndex].value += 1;
          }
        });
        setOrdersByStatus(Object.values(statusCounts));

        // Create the "Number of orders by year" data
        const yearMap: { [year: string]: { label: string; value: number } } = {};
        response.data.forEach((order) => {
          if (!order.command || !order.command.date) return;
          const orderDate = new Date(order.command.date);
          const year = orderDate.getFullYear().toString();
          if (!yearMap[year]) {
            yearMap[year] = { label: year, value: 1 };
          } else {
            yearMap[year].value += 1;
          }
        });
        setOrdersByYear(Object.values(yearMap));
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
      <FormGrid size={{ sx: 12, sm: 12, md: 12, lg: 8, xl: 8 }} sx={{ border: 1 }}>
        <Paper elevation={3} sx={{ minWidth: { xs: '100%', sm: '400px', md: '500px' }, borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
          <List sx={{ marginLeft: "0px", paddingLeft: "0px", width: '100%' }}>
            <ListSubheader sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, justifyContent: "space-between" }}>
              <ListItemText sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>ORDER</ListItemText>
              <ListItemText sx={{ fontWeight: "bold", color: "gray", textAlign: "center" }}>COST</ListItemText>
            </ListSubheader>
            {
              rows.map((item, index) => (
                <ListItem key={index} divider={true} sx={{ display: "flex", flexDirection: { xs: "column", sm: "column", md: "row" }, justifyContent: "space-between", alignItems: "start", gap: 1 }}>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", width: { xs: "100%", sm: "100%" }, marginRight: { xs: 0, sm: "10px" } }}>
                    <ListItemAvatar>
                      <Avatar>{getStatusIcon(item.command?.status)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={"Reference #: " + (item.command?.reference ? item.command?.reference : "")}
                      secondary={
                        <>
                          <Typography>
                            <b>Status: </b><span style={{ textTransform: "capitalize" }}>{item.command?.status}</span>
                          </Typography>
                          <><Typography>
                            <b>Ordered: </b>{(item.command?.date ? dateFormatter.format(new Date(item.command?.date)) : "")}
                          </Typography></>
                        </>
                      }
                      primaryTypographyProps={{ sx: { fontWeight: 'bold', minWidth: 300 } }}>
                    </ListItemText>
                  </Box>
                  <ListItemText sx={{ alignContent: "center", textAlign: { xs: "left", sm: "right" }, width: { xs: '100%', sm: '50%' } }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        <b>Total without taxes: </b>
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {(item.command?.total_ex_taxes ? currencyFormatter.format(item.command?.total_ex_taxes) : 0)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        <b>Delibery fees: </b>
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {(item.command?.delivery_fees ? currencyFormatter.format(item.command?.delivery_fees) : 0)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        <b>Taxes ({(item.command?.tax_rate ? percentFormatter.format(item.command?.tax_rate) : 0)}): </b>
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {(item.command?.taxes ? currencyFormatter.format(item.command?.taxes) : 0)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderTop: 1, borderColor: "silver", paddingTop: "5px" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        <b>Total: </b>
                      </Typography>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {(item.command?.total ? currencyFormatter.format(item.command?.total) : 0)}
                      </Typography>
                    </Box>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List >
        </Paper >
      </FormGrid >
      <FormGrid size={{ sx: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper elevation={3} sx={{ minWidth: "250px", borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "normal" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Number of orders by status</Typography>
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
          <PieChart
            series={[
              {
                data: ordersByStatusStatic,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                // //valueFormatter,
              },
            ]}
            height={200}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 11
                },
                itemMarkHeight: 5,
                itemMarkWidth: 5,

              }
            }}
          />
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
        </Paper></FormGrid>
      <FormGrid size={{ sx: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
        <Paper elevation={3} sx={{ minWidth: "250px", borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "normal" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Number of orders by year</Typography>
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
          <PieChart
            height={200}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 11
                },
                itemMarkHeight: 5,
                itemMarkWidth: 5,

              }
            }}
            series={
              [
                {
                  data: ordersByYear,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  //cx: 150,
                  //cy: 150,
                }
              ]}
          />
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
        </Paper></FormGrid>
    </Grid2 >
  )
};

export default OrderHistory;
