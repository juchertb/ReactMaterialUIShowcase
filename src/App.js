import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import Grid from "@mui/material/Grid2";
import Header from "./components/Header/Header";
import { useLocation } from "react-router-dom";
import { AuthenticationProvider } from "./context/Authentication";

function App(props) {
  const [title, setTitle] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // The navigation menu goes only 2 levels deep.
    // Strip the item id from the pathname if we are on a details page
    const parsedTitle = location.pathname
      .split("/")
      .filter((item, index) => index <= 2)
      .join(" ");
    setTitle(parsedTitle);
  }, [location]);
  return (
    <>
      <AuthenticationProvider value={false}>
        <Grid container>
          <Navbar />
          <Header title={title} />
          <Outlet />
        </Grid>
      </AuthenticationProvider>
    </>
  );
}

export default App;
