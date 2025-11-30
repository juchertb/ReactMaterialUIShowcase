import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import FormDivider from "../Common/StyledComponents/FormDivider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const data = [
  {
    name: 'Apr',
    pv: 50,
  },
  {
    name: 'Jun',
    pv: 40,
  },
  {
    name: 'Jul',
    pv: 320,
  },
  {
    name: 'Aug',
    pv: 500,
  },
  {
    name: 'Sep',
    pv: 350,
  },
  {
    name: 'Oct',
    pv: 200,
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

const DailySales = (props) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", padding: "10px", marginTop: "10px" }}>
      <ResponsiveContainer width="100%" height="60%" style={{
        marginTop: "-25px",
        borderRadius: "0.5rem",
        background: "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
        color: "rgb(52, 71, 103)",
        boxShadow: "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(76, 175, 79, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem"
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
          <Line dataKey="pv" fill="#fff" stroke="#fff" name="Mobile apps" />
        </LineChart>
      </ResponsiveContainer>
      <Typography variant="h6" sx={{ marginTop: "20px" }}>Daily Sales</Typography>
      <Typography>(<b>+15%</b>) increase in today sales.</Typography>
      <FormDivider sx={{ marginTop: "10px", marginBottom: "10px" }} />
      <Box sx={{ display: "flex", flexDirection: "row", justifyItems: "center" }}>
        <AccessTimeIcon sx={{ marginRight: "3px" }} />
        <Typography>updated 4 min ago</Typography>
      </Box>
    </Paper>
  )
}

export default DailySales;
