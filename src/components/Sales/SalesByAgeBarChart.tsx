import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";
import { dataset, valueFormatter } from "./salesByAgeDataset";

const chartSetting = {
  xAxis: [
    {
      label: 'Number of items sold',
    },
  ],
  height: 400,
};

const SalesByAgeBarChart = (props) => {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>Sales by age</Typography>
      <BarChart
        dataset={dataset}
        yAxis={[{
          scaleType: 'band',
          dataKey: 'label',
          colorMap: {
            type: 'piecewise',
            thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
            colors: ['rgb(52, 71, 103)', 'red', 'rgb(52, 71, 103)']
          }
        }]}
        series={[{ dataKey: 'value', label: 'Items sold', valueFormatter }]}
        layout="horizontal"
        {...chartSetting}
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

export default SalesByAgeBarChart;
