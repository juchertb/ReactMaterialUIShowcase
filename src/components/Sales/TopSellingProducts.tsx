import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type TopSellingProduct = {
  name: string;
  orderCount: number;
  value: number;
  adsSpent: number;
  refunds: number;
  image: string;
  refundsUp: boolean;
};

const topSellingProductsDataset: TopSellingProduct[] = [
  {
    name: "Nike v22 Running",
    orderCount: 8232,
    value: 130992,
    adsSpent: 9500,
    refunds: 13,
    image: "blue-shoe.jpeg",
    refundsUp: true
  },
  {
    name: "Business Kit (Mug + Notebook)",
    orderCount: 12821,
    value: 80250,
    adsSpent: 4200,
    refunds: 40,
    image: "black-mug.jpeg",
    refundsUp: false
  },
  {
    name: "Black Chair",
    orderCount: 2421,
    value: 40600,
    adsSpent: 9430,
    refunds: 54,
    image: "black-chair.jpeg",
    refundsUp: true
  },
  {
    name: "Wireless Charger",
    orderCount: 5921,
    value: 91300,
    adsSpent: 7364,
    refunds: 5,
    image: "bang-sound.jpeg",
    refundsUp: false
  },
  {
    name: "Mountain Trip Kit (Camera + Backpack)",
    orderCount: 921,
    value: 140925,
    adsSpent: 20531,
    refunds: 121,
    image: "photo-tools.jpeg",
    refundsUp: true
  }
];

const TopSellingProducts = (props) => {
  const formatter = new Intl.NumberFormat("en-US");

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>Top </Typography>
      <List sx={{ marginLeft: "0px", paddingLeft: "0px", width: '100%' }}>
        <ListSubheader sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <ListItemText sx={{ minWidth: "370px", fontWeight: "bold", color: "gray" }}>PRODUCT</ListItemText>
          <ListItemText sx={{ fontWeight: "bold", color: "gray" }}>VALUE</ListItemText>
          <ListItemText sx={{ fontWeight: "bold", color: "gray" }}>ADS SPENT</ListItemText>
          <ListItemText sx={{ fontWeight: "bold", color: "gray" }}>REFUNDS</ListItemText>
        </ListSubheader>
        {
          topSellingProductsDataset.map((item, index) => (
            <ListItem key={index} divider={true} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <Typography>
                      <span style={{ color: "#2e7d32" }}>{formatter.format(item.orderCount)}</span>&nbsp;orders
                    </Typography>
                  }
                  slotProps={{
                    primary: { style: { fontWeight: "bold", minWidth: "300px" } }
                  }} />
              </Box>
              <ListItemText
                secondary={"$" + formatter.format(item.value)}
              />
              <ListItemText
                secondary={"$" + formatter.format(item.adsSpent)}
              />
              <ListItemText>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <Typography>{item.refunds}</Typography>
                  {
                    item.refundsUp ?
                      < KeyboardArrowUpIcon style={{ color: "green" }} />
                      :
                      < KeyboardArrowDownIcon style={{ color: "red" }} />
                  }
                </Box>
              </ListItemText>
            </ListItem>
          ))
        }
      </List >
    </>
  )
};

export default TopSellingProducts;
