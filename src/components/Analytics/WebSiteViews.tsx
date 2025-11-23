import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import FormDivider from "../Common/StyledComponents/FormDivider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const data = [
  {
    name: 'M',
    pv: 55,
  },
  {
    name: 'T',
    pv: 20,
  },
  {
    name: 'W',
    pv: 5,
  },
  {
    name: 'T ',
    pv: 22,
  },
  {
    name: 'F',
    pv: 43,
  },
  {
    name: 'S',
    pv: 8,
  },
  {
    name: 'S ',
    pv: 40,
  },
];

const WebSiteViews = (props) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "10px", marginTop: "10px" }}>
      <ResponsiveContainer width="100%" height="60%" style={{
        marginTop: "-25px",
        borderRadius: "0.5rem",
        background: "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
        color: "rgb(52, 71, 103)",
        boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
      }}>
        <BarChart
          width={200}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 15,
            left: -20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tick={{ fill: "#fff" }}
            tickLine={{ stroke: "#fff" }}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: "#fff" }}
            tickLine={{ stroke: "#fff" }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#000" }}
            labelStyle={{ color: "#fff" }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#fff" barSize={5} name="Sales" />
        </BarChart>
      </ResponsiveContainer>
      <Typography variant="h6" sx={{ marginTop: "20px" }}>Website Views</Typography>
      <Typography>Last Campaign Performance</Typography>
      <FormDivider sx={{ marginTop: "10px", marginBottom: "10px" }} />
      <Box sx={{ display: "flex", flexDirection: "row", justifyItems: "center" }}>
        <AccessTimeIcon sx={{ marginRight: "3px" }} />
        <Typography>campaign sent 2 days ago</Typography>
      </Box>
    </Paper>
  )
}

export default WebSiteViews;
