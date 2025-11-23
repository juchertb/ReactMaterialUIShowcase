import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const RevenueLineChart = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "normal" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Revenue</Typography>
        <Tooltip title="See which adds perform better" arrow>
          <IconButton
            href="./analytics"
            target="_blank"
            sx={{ border: 0, paddingTop: 0 }}
          >
            <ErrorOutlineIcon sx={{ color: "gray" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <LineChart
        height={300}
        series={[
          { data: pData, label: 'pv' },
          { data: uData, label: 'uv' },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        slotProps={{
          legend: {
            itemMarkWidth: 5,
            itemMarkHeight: 5,
          }
        }}
      />
    </>
  )
};

export default RevenueLineChart;
