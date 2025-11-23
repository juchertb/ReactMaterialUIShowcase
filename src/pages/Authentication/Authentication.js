import React, { useState, useEffect, useContext, createContext } from "react";
import Grid2 from "@mui/material/Grid2";
import CommonButton from "../../components/Common/CommonButton";
import NotificationBell from "../../components/NotificationBell";
import { Alert, Avatar, Box, IconButton, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import BasicCard from "../../components/Common/BasicCard";
import SearchBar from "../../components/Common/SearchBar";
import RefreshButton from "@mui/icons-material/Refresh";
import GridWrapper from "../../components/Common/GridWrapper";
import { cardHeaderStyles } from "./styles";
import NewUserModal from "../../components/Modals/NewUserModal";
import SignIn from "../../components/SignIn/SignIn";
import useAuthentication from "../../hooks/useAuthentication";

const Authentication = (props) => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState(users);
  const { isAuthenticated } = useAuthentication();

  const getHeader = () => {
    const handleSearch = (value) => {
      filterData(value);
    };

    const filterData = (value) => {
      const lowercasedValue = value.toLowerCase().trim();
      if (lowercasedValue === "") {
        setSearchResults(users);
      } else {
        const filteredData = users.filter((item) => {
          return Object.keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(lowercasedValue)
          );
        });
        setSearchResults(filteredData);
      }
    };

    const addUser = () => {
      setOpen(true);
    };

    return (
      <Box sx={cardHeaderStyles.wrapper}>
        <SearchBar
          placeholder="Search by Email address, phone number, or user UID"
          onChange={(event) => handleSearch(event.target.value)}
          //searchBarWidth="720px"
          searchBarWidth="100%"
        />
        <Box>
          <CommonButton
            variant="outlined"
            onClick={addUser}
            //size="large"
            //sx={cardHeaderStyles.addUserButton}
            sx={{ marginRight: "5px" }}
          >
            Add user
          </CommonButton>
          <IconButton>
            <RefreshButton />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const addNewUser = (data) => {
    users.push({ ...data });
    setOpen(false);
  };

  const getContent = () => (
    <>
      {users.length ? (
        searchResults.map((user) => (
          <Box sx={{ marginBottom: "20px" }} key={user.userId}>
            <Typography>User ID: {user.userId}</Typography>
            <Typography>Phone number: {user.phoneNumber}</Typography>
            <Typography>Email: {user.email}</Typography>
          </Box>
        ))
      ) : (
        <Typography
          align="center"
          sx={{
            margin: "40px 16px",
            //color: "rgba(0, 0, 0, 0.6)",
            fontSize: "1.3rem",
          }}
        >
          No users for this project yet
        </Typography>
      )}
    </>
  );
  return (
    <>
      <GridWrapper>
        {isAuthenticated === true ? (
          <div>
            <Alert
              variant="outlined"
              severity="info"
              sx={{ marginBottom: "15px" }}
            >
              Click "Add user" to add new users. Users will be added to the list
              that is displayed below the search box.
              <br />
              <br />
              Then type a set of characters in the search bar to filter the
              users list. The system will look for the character combination in
              the User ID, Email, and Phone number fields.
            </Alert>
            <BasicCard header={getHeader()} content={getContent()} />
            <NewUserModal
              open={open}
              onClose={() => setOpen(false)}
              addNewUser={addNewUser}
            />
          </div>
        ) : (
          <SignIn />
        )}
      </GridWrapper>
    </>
  );
};

export default Authentication;
