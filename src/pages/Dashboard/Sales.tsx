import React from "react";
import GridWrapper from "../../components/Common/GridWrapper";
import SignIn from "../../components/SignIn/SignIn";
import useAuthentication from "../../hooks/useAuthentication";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import { Grid2, Paper } from "@mui/material";
import SummaryPanel from "../../components/Sales/SummaryPanel";
import Channels from "../../components/Sales/Channels";
import RevenueLineChart from "../../components/Sales/RevenueLineChart";
import SalesByAgeBarChart from "../../components/Sales/SalesByAgeBarChart";
import SalesByCountry from "../../components/Sales/SalesByCountry";
import TopSellingProducts from "../../components/Sales/TopSellingProducts";

const Sales = (props) => {
  const { isAuthenticated } = useAuthentication();

  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <>
            <Grid2 container spacing={2}>
              {/* Row with sales summary boxes */}
              <FormGrid size={4} >
                <SummaryPanel title="Sales" amount="$230,220" percentage="+55%" since="since last month" timespan="Last 7 days" />
              </FormGrid>
              <FormGrid size={4}>
                <SummaryPanel title="Customers" amount="3,200" percentage="+12%" since="since last month" timespan="Last week" />
              </FormGrid>
              <FormGrid size={4}>
                <SummaryPanel title="Avg. Revenu" amount="$1,200" percentage="+$213" since="since last month" timespan="Last week" />
              </FormGrid>

              <FormGrid size={4} sx={{ border: 1, height: 300 }} >
                <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <Channels />
                </Paper>
              </FormGrid>
              <FormGrid size={8} sx={{ border: 1 }}>
                <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <RevenueLineChart />
                </Paper>
              </FormGrid>

              <FormGrid size={8} sx={{ border: 1, height: 300 }} >
                <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <SalesByAgeBarChart />
                </Paper>
              </FormGrid>
              <FormGrid size={4} sx={{ border: 1 }}>
                <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <SalesByCountry />
                </Paper>
              </FormGrid>

              <FormGrid size={12} sx={{ border: 1 }}>
                <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <TopSellingProducts />
                </Paper>
              </FormGrid>
            </Grid2>
          </>
        ) : (
          <SignIn />
        )}
      </GridWrapper >
    </>
  )
};

export default Sales;
