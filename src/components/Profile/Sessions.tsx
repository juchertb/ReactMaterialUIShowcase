import { Chip, Grid2, Paper, styled, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import { Link } from "react-router";
import FormDivider from "../Common/StyledComponents/FormDivider";
import ArrowForward from "@mui/icons-material/ArrowForward";

const FormGrid = styled(Grid2)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

type UserPassword = {
  userId: number;
  password: string;
}

const Sessions = (props) => {
  const [userPassword, setUserPassword] = useState<UserPassword>({ userId: 123, password: "" });
  const handleSubmit = evt => {
    evt.preventDefault();

    let data = userPassword;

    console.log(data);
    return;

    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json"
    //     }
    // })
    //     .then(response => response.json())
    //     .then(response => console.log("Success:", JSON.stringify(response)))
    //     .catch(error => console.error("Error:", error));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserPassword({ ...userPassword, password: newValue });
  };

  return (
    <>
      <style>
        {`
        .see-more-link .arrow-icon {
          transition: transform 0.2s;
        }
        .see-more-link:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}
      </style>
      <Paper elevation={3} sx={{
        borderRadius: "0.75rem",
        width: "100%",
        height: "100%",
        padding: "15px",
        marginTop: "15px"
      }}>
        <div id="sessions" />
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={1}>
            <FormGrid size={12} sx={{ paddingBottom: "15px" }}>
              <Typography variant="h6">Sessions</Typography>
              <Typography>This is a list of devices that have logged into your account. Remove those that you do not recognize.</Typography>
            </FormGrid>

            <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
              <DesktopWindowsOutlinedIcon />
            </FormGrid>
            <FormGrid size={7}>
              <Typography sx={{ fontWeight: "bold" }}>Bucharest 68.133.163.201</Typography>
              <Typography>Your current session</Typography>
            </FormGrid>
            <FormGrid size={1}>
              <Chip label="ACTIVE" color="success" variant="filled" />
            </FormGrid>
            <FormGrid size={1}>
              <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>EU</Typography>
            </FormGrid>
            <FormGrid size={2}>
              <Link to="../database">
                <div className="see-more-link" style={{ color: "blue", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  See more <ArrowForward className="arrow-icon" sx={{ paddingLeft: "5px" }} />
                </div>
              </Link>
            </FormGrid>

            <FormDivider />
            <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
              <DesktopWindowsOutlinedIcon />
            </FormGrid>
            <FormGrid size={7}>
              <Typography sx={{ fontWeight: "bold" }}>Chrome on macOS</Typography>
              <Typography>&nbsp;</Typography>
            </FormGrid>
            <FormGrid size={1}>
              <Typography>&nbsp;</Typography>
            </FormGrid>
            <FormGrid size={1}>
              <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>US</Typography>
            </FormGrid>
            <FormGrid size={2}>
              <Link to="../database">
                <div className="see-more-link" style={{ color: "blue", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  See more <ArrowForward className="arrow-icon" sx={{ paddingLeft: "5px" }} />
                </div>
              </Link>
            </FormGrid>
            <FormDivider />
            <FormGrid size={1} sx={{ paddingBottom: "15px" }}>
              <PhoneAndroidOutlinedIcon />
            </FormGrid>
            <FormGrid size={7}>
              <Typography sx={{ fontWeight: "bold" }}>Safari on iPhone</Typography>
              <Typography>&nbsp;</Typography>
            </FormGrid>
            <FormGrid size={1}>
              <Typography>&nbsp;</Typography>
            </FormGrid>
            <FormGrid size={1}>
              <Typography sx={{ display: "flex", justifyContent: "flex-end" }}>US</Typography>
            </FormGrid>
            <FormGrid size={2}>
              <Link to="../database">
                <div className="see-more-link" style={{ color: "blue", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
                  See more <ArrowForward className="arrow-icon" sx={{ paddingLeft: "5px" }} />
                </div>
              </Link>
            </FormGrid>
          </Grid2>
        </form >
      </Paper >
    </>
  )
};

export default Sessions;
