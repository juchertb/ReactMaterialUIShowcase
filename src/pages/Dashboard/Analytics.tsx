import React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import GridWrapper from "../../components/Common/GridWrapper";
import { Box, CardMedia, Grid2, Paper } from "@mui/material";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import SalesByCountry from "../../components/Sales/SalesByCountry";
import SignIn from "../../components/SignIn/SignIn";
import WebSiteViews from "../../components/Analytics/WebSiteViews";
import DailySales from "../../components/Analytics/DailySales";
import CompletedTasks from "../../components/Analytics/CompletedTasks";
import Bookings from "../../components/Analytics/Bookings";
import TodaysUsers from "../../components/Analytics/TodaysUsers";
import Revenue from "../../components/Analytics/Revenue";
import Followers from "../../components/Analytics/Followers";
import RentalProperty from "../../components/Analytics/RentalProperty";
import { simpleFaker } from "@faker-js/faker/.";

type RentalPropertyItem = {
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
}

const rentalProperties: RentalPropertyItem[] = [
  {
    title: "Cozy 5 Stars Apartment",
    price: 899,
    location: "Barcelona, Spain",
    image: "rental1.jpg",
    description: "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
  },
  {
    title: "Office Studio",
    price: 1119,
    location: "London, UK",
    image: "rental2.jpg",
    description: "The place is close to Metro Station and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the night life in London, UK.",
  },
  {
    title: "Beautiful Castle",
    price: 459,
    location: "Milan, Italy",
    image: "rental3.jpg",
    description: "The place is close to Metro Station and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Milan.",
  }
];

const Analytics = (props) => {
  const { isAuthenticated } = useAuthentication();

  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <>
            <Grid2 container spacing={4}>
              <FormGrid size={12} sx={{ border: 1 }}>
                <Paper elevation={3} sx={{ display: "flex", flexDirection: "row", borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <Grid2 container spacing={4} sx={{ width: "100%" }}>
                    <FormGrid size={{ xs: 12, md: 6 }} sx={{ border: 1 }}>
                      <SalesByCountry displayBadge={true} />
                    </FormGrid>
                    <FormGrid size={{ xs: 12, md: 6 }} sx={{ border: 1 }}>
                      <CardMedia
                        component="img"
                        image="WorldMap.png"
                        //onLoad={() => console.log("this is loading")}
                        onError={() => console.log("this is error")}
                        alt="WorldMap"
                        sx={{
                          borderRadius: "0.75rem",
                          objectFit: "cover",
                        }}
                      />
                    </FormGrid>
                  </Grid2>
                </Paper>
              </FormGrid>

              {/* Row with charts for Website Views, Daily Sales and Completed Tasks */}
              <FormGrid size={{ sm: 12, md: 6, lg: 4 }} >
                <WebSiteViews />
              </FormGrid>
              <FormGrid size={{ sm: 12, md: 6, lg: 4 }}>
                <DailySales />
              </FormGrid>
              <FormGrid size={{ sm: 12, md: 6, lg: 4 }}>
                <CompletedTasks />
              </FormGrid>

              {/* Row with Bookings, Today's users, Revenu and Followers */}
              <FormGrid size={{ sm: 12, md: 6, lg: 3 }} >
                <Bookings />
              </FormGrid>
              <FormGrid size={{ sm: 12, md: 6, lg: 3 }}>
                <TodaysUsers />
              </FormGrid>
              <FormGrid size={{ sm: 12, md: 6, lg: 3 }}>
                <Revenue />
              </FormGrid>
              <FormGrid size={{ sm: 12, md: 6, lg: 3 }}>
                <Followers />
              </FormGrid>

              {/* Rental properties */}
              {
                rentalProperties.map((item) => (
                  <FormGrid size={{ xs: 12, lg: 4 }} sx={{ border: 1 }}>
                    <RentalProperty
                      title={item.title}
                      price={item.price}
                      location={item.location}
                      image={item.image}
                      description={item.description}
                    />
                  </FormGrid>
                ))
              }
            </Grid2>
          </>
        ) : (
          <SignIn />
        )}
      </GridWrapper >
    </>
  )
};

export default Analytics;
