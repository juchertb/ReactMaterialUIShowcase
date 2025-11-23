import axios from "axios";
import React from "react";
import { apiHost } from "../../Utils/customFetch";
import { Alert, Avatar, Box, Button, Chip, FormControlLabel, FormLabel, Grid2, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Snackbar, SnackbarCloseReason, Switch, Typography } from "@mui/material";
import { useLocation } from "react-router";
import FormGrid from "../Common/StyledComponents/FormGrid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SaveIcon from '@mui/icons-material/Save';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeValidationError } from "@mui/x-date-pickers/models";
import { Customer } from "../../Utils/Types";
import SnackbarCustomized from "../Common/BasicSnackbar/SnackbarCustomized";

const OrderDetails = (props) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [customer, setCustomer] = React.useState<Customer>(null);
  const location = useLocation();
  const id: string = location.state?.customerId;
  const [errorDate, setErrorDate] = React.useState<DateTimeValidationError | null>(null);
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

  const startOfQ11990 = dayjs('1990-01-01T00:00:00.000');
  const endOfQ11990 = dayjs('1990-03-31T23:59:59.999');

  const errorMessage = React.useMemo(() => {
    switch (errorDate) {
      case 'maxDate':
      case 'minDate': {
        return 'Please select a date in the first quarter of 1990';
      }

      case 'invalidDate': {
        return 'Your date is not valid';
      }

      default: {
        return '';
      }
    }
  }, [error]);

  if (loading) return (
    <Typography>Loading...</Typography>
  );

  if (error) return (
    <Alert variant="outlined" severity="error">
      Error: {error.message}
    </Alert>
  );

  //console.log("customer = " + JSON.stringify(customer));

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = { customer };
    //console.log(data);

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

  const handleGenderChange = (event: SelectChangeEvent) => {
    setCustomer({ ...customer, sex: event.target.value as string });
  }

  const getLocation = (customer: Customer): string => {
    const locationArray: string[] = [customer.address, customer.city, customer.zipcode];
    let location: string = locationArray.filter(s => s?.length > 0).join(", ");
    return location;
  }

  const handleNewsletterCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, has_newsletter: event.target.checked });
  }

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
          <FormGrid size={8} sx={{ marginBottom: "30px", display: "flex", flexDirection: "row" }}>
            <Avatar sx={{ width: 70, height: 70, marginRight: "10px" }}
              src={customer.avatar}
            />
            <Box>
              <Typography variant="h3">{customer.first_name + " " + customer.last_name}</Typography>
              <Typography sx={{ color: "gray" }}>{customer.position}</Typography>
            </Box>
          </FormGrid>
          <FormGrid size={4} sx={{ alignItems: "end" }}>
            {
              customer.has_ordered ?
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                  <Chip label="ORDER PLACED" color="success" variant="filled" />
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch checked={customer.has_newsletter} onChange={handleNewsletterCheckedChange} name="isInvisible" />
                    }
                    label="Send newsletter"
                  />
                </Box>
                :
                <Chip label="NO ORDER RECEIVED" color="error" variant="filled" />
            }
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="firstname" required>
              First name
            </FormLabel>
            <OutlinedInput
              id="first_name"
              name="first_name"
              type="name"
              placeholder="Your firstname"
              autoComplete="first name"
              required
              size="small"
              value={customer.first_name}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="lastname" required>
              Last name
            </FormLabel>
            <OutlinedInput
              id="last_name"
              name="last_name"
              type="name"
              placeholder="Your lastname"
              autoComplete="last name"
              required
              size="small"
              value={customer.last_name}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={4}>
            <FormLabel htmlFor="gender-label" required>
              Gender
            </FormLabel>
            <Select
              labelId="gender-label"
              id="sex"
              name="sex"
              value={(customer.sex ? customer.sex : "not-specified")}
              label="Gender"
              onChange={handleGenderChange}
              size="small"
            >
              <MenuItem value={"not-specified"}>Not specified</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </FormGrid>
          <FormGrid size={4}>
            <FormLabel htmlFor="bith-date" required>
              Birth Date
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="bith-date"
                format="DD MMMM YYYY"
                onError={(newError) => setErrorDate(newError)}
                slotProps={{
                  actionBar: {
                    actions: ["cancel", "clear", "today", "accept"]
                  },
                  textField: {
                    helperText: errorMessage,
                    size: "small",
                    required: true,
                  },
                  openPickerButton: {
                    size: "small",
                    sx: { mr: "-13px" }
                  },
                }}
                //minDate={startOfQ11990}
                //maxDate={endOfQ11990}
                views={["year", "month", "day"]}
                value={dayjs(customer.birthday)}
                onChange={(newValue) => customer.birthday = newValue.toDate()}
              //onInvalid={handleInvalidBirthdate}
              />
            </LocalizationProvider>
          </FormGrid>
          <FormGrid size={4}>
            <FormLabel htmlFor="date-joined">
              Date joined
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                name="date-joined"
                readOnly={true}
                format="DD MMMM YYYY"
                onError={(newError) => setErrorDate(newError)}
                slotProps={{
                  actionBar: {
                    actions: ["cancel", "clear", "today", "accept"]
                  },
                  textField: {
                    helperText: errorMessage,
                    size: "small",
                    required: true,
                  },
                  openPickerButton: {
                    size: "small",
                    sx: { mr: "-13px" }
                  },
                }}
                views={["year", "month", "day"]}
                value={dayjs(customer.joinDate)}
              />
            </LocalizationProvider>
          </FormGrid>
          <FormGrid size={12}>
            <FormLabel htmlFor="address" required>
              Address
            </FormLabel>
            <OutlinedInput
              id="address"
              name="address"
              type="text"
              placeholder="Example: 23, rue Raymond"
              required
              size="small"
              value={customer.address}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="city" required>
              City
            </FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              type="text"
              placeholder="Example: Paris"
              required
              size="small"
              value={customer.city}
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={2}>
            <FormLabel htmlFor="zipcode" required>
              Zip code
            </FormLabel>
            <OutlinedInput
              id="zipcode"
              name="zipcode"
              type="text"
              placeholder="J8N7R6"
              required
              value={customer.zipcode}
              size="small"
              onChange={handleInput}
            />
          </FormGrid>
          <FormGrid size={4} />
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

export default OrderDetails;
