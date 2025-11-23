import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import FormDivider from "../Common/StyledComponents/FormDivider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const data = [
  {
    name: 'Apr',
    pv: 50,
  },
  {
    name: 'May',
    pv: 40,
  },
  {
    name: 'Jun',
    pv: 300,
  },
  {
    name: 'Jul',
    pv: 220,
  },
  {
    name: 'Aug',
    pv: 500,
  },
  {
    name: 'Sep',
    pv: 250,
  },
  {
    name: 'Oct',
    pv: 400,
  },
  {
    name: 'Nov',
    pv: 230,
  },
  {
    name: 'Dec',
    pv: 500,
  },
];

const CompletedTasks = (props) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", padding: "10px", marginTop: "10px" }}>
      <ResponsiveContainer width="100%" height="60%" style={{
        marginTop: "-25px",
        borderRadius: "0.5rem",
        background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
        color: "rgb(52, 71, 103)",
        boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
      }}>
        <LineChart
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
            angle={-45}
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
          <Line dataKey="pv" fill="#fff" stroke="#fff" name="Desktop apps" />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="h6" sx={{ marginTop: "20px" }}>Completed Tasks</Typography>
      <Typography>Last Campaign Performance</Typography>
      <FormDivider sx={{ marginTop: "10px", marginBottom: "10px" }} />
      <Box sx={{ display: "flex", flexDirection: "row", justifyItems: "center" }}>
        <AccessTimeIcon sx={{ marginRight: "3px" }} />
        <Typography>just updated</Typography>
      </Box>
    </Paper>
  )
}

export default CompletedTasks;
