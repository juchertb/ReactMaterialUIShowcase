import React from "react";
import { Box, CardMedia, Grid2, Paper } from "@mui/material";
import PaymentMethods from "../../components/Billing/PaymentMethods";
import BillingSummary from "../../components/Billing/BillingSummary";
import InvoicesList from "../../components/Billing/InvoicesList";
import useAuthentication from "../../hooks/useAuthentication";
import SignIn from "../../components/SignIn/SignIn";
import GridWrapper from "../../components/Common/GridWrapper";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import Salary from "../../components/Billing/Salary";
import Paypal from "../../components/Billing/Paypal";
import Transactions from "../../components/Billing/Transactions";

export default function Billing() {
  const { isAuthenticated } = useAuthentication();
  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <>
            <Grid2 container spacing={2} sx={{ minWidth: "400px" }}>
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 8 }} >
                <Grid2 container spacing={2}>
                  <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} >
                    <Paper elevation={0} sx={{ backgroundColor: "transparent", borderRadius: "0.75rem", height: "100%", width: "100%", padding: "15px" }}>
                      <CardMedia
                        component="img"
                        image="Credit-Card.jpeg"
                        onError={() => console.log("this is error")}
                        alt="Credit Card"
                        sx={{
                          borderRadius: "1.00rem",
                          objectFit: "cover",
                        }}
                      />
                    </Paper>
                  </FormGrid>
                  <FormGrid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} >
                    <Salary />
                  </FormGrid>
                  <FormGrid size={{ xs: 12, sm: 12, md: 6, lg: 3 }} >
                    <Paypal />
                  </FormGrid>
                  <FormGrid size={{ xs: 12, sm: 12, md: 12 }} >
                    <PaymentMethods />
                  </FormGrid>
                </Grid2>
              </FormGrid>
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 4 }} >
                <InvoicesList />
              </FormGrid>
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                <BillingSummary />
              </FormGrid>
              <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                <Transactions />
              </FormGrid>
            </Grid2>
          </>
        ) : (
          <SignIn />
        )
        }
      </GridWrapper >
    </>
  );
}