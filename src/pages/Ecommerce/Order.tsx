import React from "react";
import GridWrapper from "../../components/Common/GridWrapper";
import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ShopIcon from "@mui/icons-material/Shop";
import ReviewsIcon from '@mui/icons-material/Reviews';
import OrderDetails from "../../components/Sales/OrderDetails";
import CustomerContact from "../../components/Sales/CustomerContact";
import OrderHistory from "../../components/Sales/OrderHistory";
import OrderReviews from "../../components/Sales/OrderReviews";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Order = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <GridWrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon label tabs example"
        sx={{ borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
        orientation={isSmall ? "vertical" : "horizontal"}
      >
        <Tab icon={<PersonPinIcon />} label="CUSTOMER" sx={{ minWidth: "25%" }} />
        <Tab icon={<PhoneIcon />} label="CONTACT" sx={{ minWidth: "25%" }} />
        <Tab icon={<ShopIcon />} label="ORDER HISTORY" sx={{ minWidth: "25%" }} />
        <Tab icon={<ReviewsIcon />} label="ORDER REVIEWS" sx={{ minWidth: "25%" }} />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <OrderDetails />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <CustomerContact />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <OrderHistory />
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <OrderReviews />
      </TabPanel>
    </GridWrapper>
  )
};

export default Order;
