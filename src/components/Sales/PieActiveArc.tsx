import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { desktopOS, valueFormatter } from './WebUsageStats';

const PieActiveArc = (props) => {
  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter,
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
  )
};

export default PieActiveArc;
