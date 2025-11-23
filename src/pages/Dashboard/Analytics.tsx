import React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import GridWrapper from "../../components/Common/GridWrapper";
import { Box, CardMedia, Grid2, Paper } from "@mui/material";
import FormGrid from "../../components/Common/StyledComponents/FormGrid";
import SummaryPanel from "../../components/Sales/SummaryPanel";
import Channels from "../../components/Sales/Channels";
import RevenueLineChart from "../../components/Sales/RevenueLineChart";
import SalesByAgeBarChart from "../../components/Sales/SalesByAgeBarChart";
import SalesByCountry from "../../components/Sales/SalesByCountry";
import TopSellingProducts from "../../components/Sales/TopSellingProducts";
import SignIn from "../../components/SignIn/SignIn";
import WebSiteViews from "../../components/Analytics/WebSiteViews";
import DailySales from "../../components/Analytics/DailySales";
import CompletedTasks from "../../components/Analytics/CompletedTasks";
import Bookings from "../../components/Analytics/Bookings";
import TodaysUsers from "../../components/Analytics/TodaysUsers";
import Revenue from "../../components/Analytics/Revenue";
import Followers from "../../components/Analytics/Followers";
import RentalProperty from "../../components/Analytics/RentalProperty";
//import { VectorMap } from "react-jvectormap";
//import { useRef, useState } from "react";
//import { europeMill } from "@react-jvectormap/europe";

// const gdpData = {
//   AF: 16.63,
//   AL: 11.58,
//   DZ: 158.97,
//   AO: 85.81,
//   AG: 1.1,
//   AR: 351.02,
//   AM: 8.83,
//   AU: 1219.72,
//   AT: 366.26,
//   AZ: 52.17,
//   BS: 7.54,
//   BH: 21.73,
//   BD: 105.4,
//   BB: 3.96,
//   BY: 52.89,
//   BE: 461.33,
//   BZ: 1.43,
//   BJ: 6.49,
//   BT: 1.4,
//   BO: 19.18,
//   BA: 16.2,
//   BW: 12.5,
//   BR: 2023.53,
//   BN: 11.96,
//   BG: 44.84,
//   BF: 8.67,
//   BI: 1.47,
//   KH: 11.36,
//   CZ: 195.23,
//   DK: 304.56,
//   DJ: 1.14,
//   DM: 0.38,
//   DO: 50.87,
//   EC: 61.49,
//   EG: 216.83,
//   SV: 21.8,
//   GQ: 14.55,
//   ER: 2.25,
//   EE: 19.22,
//   ET: 30.94,
//   FJ: 3.15,
//   FI: 231.98,
//   FR: 2555.44,
//   GA: 12.56,
//   GM: 1.04,
//   GE: 11.23,
//   DE: 3305.9,
//   GH: 18.06,
//   GR: 305.01,
//   GD: 0.65,
//   GT: 40.77,
//   GN: 4.34,
//   GW: 0.83,
//   GY: 2.2,
//   HT: 6.5,
//   HN: 15.34,
//   HK: 226.49,
//   HU: 132.28,
//   IS: 12.77,
//   IN: 1430.02,
//   ID: 695.06,
//   IR: 337.9,
//   IQ: 84.14,
//   RS: 38.92,
//   KN: 0.56,
//   LC: 1,
//   VC: 0.58,
//   SD: 65.93,
// };

type RentalProperty = {
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
}

const rentalProperties: RentalProperty[] = [
  {
    title: "Cozy 5 Stars Apartment",
    price: 899,
    location: "Barcelona, Spain",
    image: "Rental1.jpg",
    description: "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Barcelona.",
  },
  {
    title: "Office Studio",
    price: 1119,
    location: "London, UK",
    image: "Rental2.jpg",
    description: "The place is close to Metro Station and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the night life in London, UK.",
  },
  {
    title: "Beautiful Castle",
    price: 459,
    location: "Milan, Italy",
    image: "Rental3.jpg",
    description: "The place is close to Metro Station and bus stop just 2 min by walk and near to 'Naviglio' where you can enjoy the main night life in Milan.",
  }
];

const Analytics = (props) => {
  const { isAuthenticated } = useAuthentication();

  //const mapRef = useRef(null);
  //const [selectedRegion, setSelectedRegion] = useState(null);

  // const handleRegionClick = (event, code) => {
  //   setSelectedRegion(code); // Update the selected region
  // };

  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <>
            <Grid2 container spacing={4}>
              <FormGrid size={12} sx={{ border: 1 }}>
                <Paper elevation={3} sx={{ display: "flex", flexDirection: "row", borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px", marginTop: "15px" }}>
                  <Box sx={{ width: "50%" }}><SalesByCountry displayBadge={true} /></Box>
                  <Box sx={{ width: "50%" }}>
                    <CardMedia
                      component="img"
                      image="WorldMap.png"
                      //onLoad={() => console.log("this is loading")}
                      onError={() => console.log("this is error")}
                      alt="WorldMap"
                      sx={{
                        borderRadius: "0.75rem",
                        // maxWidth: {
                        //   xs: "100%",
                        //   sm: "500px",
                        // },
                        objectFit: "cover",
                      }}
                    />
                    {/*
                    <div style={{ width: "100%", height: "100vh" }}>
                      <VectorMap
                        //ref={mapRef}
                        zoomOnScroll={false}
                        zoomButtons={false}
                        map={"world_mill"}
                        backgroundColor="white"
                        // containerStyle={{
                        //   width: "100%",
                        //   height: "100%",
                        // }}
                        // markerStyle={{
                        //   initial: {
                        //     fill: "red",
                        //     stroke: "#383f47",
                        //   },
                        // }}
                        containerClassName="map"
                        series={{
                          regions: [
                            {
                              scale: ["#ff4d01", "#08519C"],
                              attribute: "fill",
                              values: gdpData,
                              normalizeFunction: "polynomial",
                            },
                          ],
                        }}
                      // regionStyle={{
                      //   initial: {
                      //     fill: "#D1D5DB",
                      //     "fill-opacity": 1,
                      //     stroke: "#265cff",
                      //     "stroke-width": 0,
                      //     "stroke-opacity": 0,
                      //   },
                      //   hover: {
                      //     "fill-opacity": 0.8,
                      //     fill: "#FFFB00", // Color on hover
                      //     stroke: "#2b2b2b",
                      //   },
                      //   selected: {
                      //     fill: "#FFFB00", // Highlight color for selected region
                      //   },
                      //   selectedHover: {
                      //     fill: "#FFFB00", // Highlight color for selected region on hover
                      //   },
                      // }}
                      // selectedRegions={selectedRegion ? [selectedRegion] : []} // Dynamically set selected region
                      // onRegionClick={handleRegionClick} // Handle click event
                      // onRegionTipShow={function (event, label, code) {
                      //   label.html(
                      //     '<div style="background-color: white; border: 1px solid white; outline: 10px solid white; border-radius: 6px; min-height: 70px; width: 150px; color: black"; padding-left: 10px>' +
                      //     "<p>" +
                      //     "<b>" +
                      //     label.html() +
                      //     "</b>" +
                      //     "</p>" +
                      //     "<p>" +
                      //     "GDP: " +
                      //     "<b>" +
                      //     gdpData[code] +
                      //     "</b>" +
                      //     "</p>" +
                      //     "</div>"
                      //   );
                      //}}
                      />
                    </div>
*/}
                  </Box>
                </Paper>
              </FormGrid>

              {/* Row with charts for Website Views, Daily Sales and Completed Tasks */}
              <FormGrid size={4} >
                <WebSiteViews />
              </FormGrid>
              <FormGrid size={4}>
                <DailySales />
              </FormGrid>
              <FormGrid size={4}>
                <CompletedTasks />
              </FormGrid>

              {/* Row with Bookings, Today's users, Revenu and Followers */}
              <FormGrid size={3} >
                <Bookings />
              </FormGrid>
              <FormGrid size={3}>
                <TodaysUsers />
              </FormGrid>
              <FormGrid size={3}>
                <Revenue />
              </FormGrid>
              <FormGrid size={3}>
                <Followers />
              </FormGrid>

              {/* Rental properties */}
              {
                rentalProperties.map((item) => (
                  <FormGrid size={4} sx={{ border: 1 }}>
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
