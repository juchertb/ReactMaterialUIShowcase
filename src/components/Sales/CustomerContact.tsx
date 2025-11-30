import axios from "axios";
import React from "react";
import { apiHost } from "../../Utils/customFetch";
import { Alert, Box, Button, FormLabel, Grid2, OutlinedInput, Paper, SnackbarCloseReason, Typography } from "@mui/material";
import { useLocation } from "react-router";
import FormGrid from "../Common/StyledComponents/FormGrid";
import SaveIcon from '@mui/icons-material/Save';

import { Customer } from "../../Utils/Types";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SnackbarCustomized from "../Common/BasicSnackbar/SnackbarCustomized";

const CustomerContact = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [customer, setCustomer] = React.useState<Customer>(null);
  const location = useLocation();
  const id: string = location.state?.customerId;
  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);

  React.useEffect(() => {
    setError(null);
    axios.get(`${apiHost}/customers/${id}`)
      .then(function (response) {
        //console.log(response.data);
        //return;
        response.status === 200 ? setCustomer(response.data as Customer) : setError(response.statusText);
        setLoading(false);
        //console.log(customer);
      })
      .catch(function (error) {
        setError(error);
        setLoading(false);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  const handleSubmit = evt => {
    evt.preventDefault();

    axios({
      url: `${apiHost}/customers/${customer.id}`,
      method: "PUT",
      data: customer,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error('Network response was not ok (status: ' + response.status + ')');
        }
        return response.data;
      })
      .then(() => {
        setToastMessage(`Customer ${customer.first_name + " " + customer.last_name} updated successfully!`);
      })
      .catch(error => {
        //setError(error);
        setLoading(false);
        setToastMessage(`Customer ${customer.first_name + " " + customer.last_name} could not be updated. \n${error}`);
      })
      .finally(() => {
        setOpenToast(true);
      });
  };

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setCustomer({ ...customer, [name]: newValue });
  };

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "0.75rem", width: "100%", height: "100%", padding: "15px" }}>
      <p id="basic-info" />
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={3}>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="home_phone">
              Home phone
            </FormLabel>
            <OutlinedInput
              id="home_phone"
              name="home_phone"
              type="phone"
              placeholder="123-456-7890"
              autoComplete="home phone"
              size="small"
              value={customer.home_phone}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="mobile_phone" required>
              Mobile phone
            </FormLabel>
            <OutlinedInput
              id="mobile_phone"
              name="mobile_phone"
              type="name"
              placeholder="123-456-7890"
              autoComplete="Mobile phone"
              required
              size="small"
              value={customer.mobile_phone}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="email" required>
              Email
            </FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="text"
              placeholder="example@email.com"
              required
              size="small"
              value={customer.email}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="confirmation-email" required>
              Confirmation Email
            </FormLabel>
            <OutlinedInput
              id="confirmation_email"
              name="confirmation_email"
              type="email"
              placeholder="example@email.com"
              required
              size="small"
            />
          </FormGrid>
          <FormGrid size={12} sx={{ paddingBottom: "0px" }}>
            <Typography sx={{ fontWeight: "bold" }}>Social media</Typography>
            <Box sx={{ padding: "10px", borderRadius: "0.75rem" }}>
              <Grid2 container spacing={3}>
                <FormGrid size={1}>
                  <TwitterIcon sx={{ color: "primary.main", marginLeft: "15px", marginTop: "5px" }} />
                </FormGrid>
                <FormGrid size={11}>
                  <OutlinedInput
                    id="twitter_url"
                    name="twitter_url"
                    type="url"
                    placeholder="https://x.com"
                    size="small"
                    value={customer.twitter_url}
                    onChange={handleInput}
                  />
                </FormGrid>
                <FormGrid size={1}>
                  <InstagramIcon sx={{ color: "primary.main", marginLeft: "15px", marginTop: "5px" }} />
                </FormGrid>
                <FormGrid size={11}>
                  <OutlinedInput
                    id="instagram_url"
                    name="instagram_url"
                    type="url"
                    placeholder="https://instagram.com"
                    size="small"
                    value={customer.instagram_url}
                    onChange={handleInput}
                  />
                </FormGrid>
                <FormGrid size={1}>
                  <FacebookIcon sx={{ color: "primary.main", marginLeft: "15px", marginTop: "5px" }} />
                </FormGrid>
                <FormGrid size={11}>
                  <OutlinedInput
                    id="facebook_url"
                    name="facebook_url"
                    type="url"
                    placeholder="https://facebook.com"
                    size="small"
                    value={customer.facebook_url}
                    onChange={handleInput}
                  />
                </FormGrid>
                <FormGrid size={1}>
                  <LinkedInIcon sx={{ color: "primary.main", marginLeft: "15px", marginTop: "5px" }} />
                </FormGrid>
                <FormGrid size={11}>
                  <OutlinedInput
                    id="linkedin_url"
                    name="linkedin_url"
                    type="url"
                    placeholder="https://linkedin.com"
                    size="small"
                    value={customer.linkedin_url}
                    onChange={handleInput}
                  />
                </FormGrid>
              </Grid2>
            </Box>
          </FormGrid>
          <FormGrid size={10} />
          <FormGrid size={2} sx={{ alignItems: "end" }}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              Save <SaveIcon sx={{ marginLeft: "5px" }} />
            </Button>
          </FormGrid>
        </Grid2>
      </form>
      <SnackbarCustomized
        openToast={openToast}
        setOpenToast={setOpenToast}
        message={error ? toastMessage + " " + error.message : (toastMessage ? toastMessage : "The operation was successfull!")}
        severity={error ? "error" : 'success'} />
    </Paper >
  )
};

export default CustomerContact;
