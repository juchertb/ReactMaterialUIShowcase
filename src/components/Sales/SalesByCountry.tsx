import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import LanguageIcon from '@mui/icons-material/Language';


type SalesByCountryItem = {
  countryCode: string;
  countryName: string;
  sales: number;
  bounce: number;
};

const salesByCountryDataset: SalesByCountryItem[] = [
  {
    countryCode: "US",
    countryName: "United States",
    sales: 2500,
    bounce: 29.9
  },
  {
    countryCode: "DE",
    countryName: "Germany",
    sales: 3900,
    bounce: 40.22
  },
  {
    countryCode: "GB",
    countryName: "Great Britain",
    sales: 1400,
    bounce: 23.44
  },
  {
    countryCode: "BR",
    countryName: "Brasil",
    sales: 562,
    bounce: 32.14
  },
  {
    countryCode: "AU",
    countryName: "Australia",
    sales: 400,
    bounce: 56.83
  }
];

const SalesByCountry = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {
          props.displayBadge ?
            <Box sx={{
              display: "flex",
              //"-webkit-box-pack": "center",
              WebkitBoxPack: "center",
              justifyContent: "center",
              //"-webkit-box-align": "center",
              WebkitBoxAlign: "center",
              alignItems: "center",
              width: "4rem",
              height: "4rem",
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "-30px",
              opacity: "1",
              background: "linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))",
              color: "rgb(255, 255, 255)",
              borderRadius: "0.75rem",
              boxShadow: "rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem"
            }}>
              <LanguageIcon sx={{ color: "white" }} />
            </Box>
            :
            null
        }
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>Sales by Country</Typography>
      </Box >
      <List sx={{ marginLeft: "0px", paddingLeft: "0px", width: '100%' }}>
        {
          salesByCountryDataset.map((item, index) => (
            <ListItem key={index} divider={true} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&  > img': {
                    mr: 1,
                    flexShrink: 0,
                    width: '20px',
                  },
                }}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${item.countryCode.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${item.countryCode.toLowerCase()}.png 2x`}
                  alt=""
                />
              </Box>
              <ListItemText
                primary="Country:"
                secondary={item.countryName}
                slotProps={{
                  primary: { style: { fontSize: 10, fontWeight: "bold", width: "100px" } }
                }} />
              <ListItemText
                primary="Sales:"
                secondary={item.sales}
                slotProps={{
                  primary: { style: { fontSize: 10, fontWeight: "bold" } }
                }} />
              <ListItemText
                primary="Bounce:"
                secondary={item.bounce + "%"}
                slotProps={{
                  primary: { style: { fontSize: 10, fontWeight: "bold" } }
                }} />
            </ListItem>
          ))
        }
      </List >
    </>
  )
};

export default SalesByCountry;
