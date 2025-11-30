import React, { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Box, Paper, Switch, Typography, IconButton, Tooltip, Link, Avatar, List, ListItem, ListItemAvatar, ListItemText, CardMedia, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


const basicProfileStyles = {
  headerImage: {
    backgroundRepeat: "no-repeat",
    color: "rgb(52, 71, 103)",
    display: "flex",
    backgroundImage: "linear-gradient(195deg, rgba(0, 96, 160, 0.62), rgba(1, 67, 94, 0.6)), url('./bg-profile.jpeg')",//"rgba(73, 163, 241, 0.6)",
    alignItems: "center",
    opacity: "1",
    borderRadius: "0.75rem",
    backgroundPosition: "50% center",
    overflow: "hidden",
    boxShadow: "none",
    height: "200px",
    zIndex: "bottom",
  }
};

const BasicProfile = (props) => {
  const [accountSwitchState, setAccountSwitchState] = useState({
    emailOnFollow: true,
    emailOnAnswer: false,
    emailOnMention: true
  });
  const [appSwitchState, setAppSwitchState] = useState({
    newLaunchesAndProjects: false,
    monthlyProductUpdates: true,
    subscribeToNewsletter: false
  })

  const handleAccountSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountSwitchState({
      ...accountSwitchState,
      [event.target.name]: event.target.checked
    });
  };

  const handleAppSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppSwitchState({
      ...appSwitchState,
      [event.target.name]: event.target.checked
    });
  };

  type ConversationItem = {
    name: string;
    post: string;
    avatar: string;
  };

  const conversationItems: ConversationItem[] = [
    {
      name: "Sophie B.",
      post: "Hi! I need more information..",
      avatar: "./avatar-kal.jpg"
    },
    {
      name: "Anne Marie",
      post: "Awesome work, can you..",
      avatar: "./avatar-marie.jpg"
    },
    {
      name: "Ivanna",
      post: "About files I can..",
      avatar: "./avatar-ivana.jpg"
    },
    {
      name: "Peterson",
      post: "Have a great afternoon..",
      avatar: "./avatar-peterson.jpg"
    },
    {
      name: "Nick Daniel",
      post: "Hi! I need more information..",
      avatar: "./avatar-daniel.jpg"
    }
  ];

  type Project = {
    name: string;
    description: string;
    image: string;
  }

  const projectlist: Project[] = [
    {
      name: "Modern",
      description: "As Uber works through a huge amount of internal management turmoil.",
      image: "./project-modern.jpg"
    },
    {
      name: "Scandinavian",
      description: "Music is something that everyone has their own specific opinion about.",
      image: "./project-scandinavian.jpg"
    },
    {
      name: "Minimalist",
      description: "Different people have different taste, and various types of music.",
      image: "./project-minimalist.jpg"
    },
    {
      name: "Gothic",
      description: "Why would anyone pick blue over pink? Pink is obviously a better color.",
      image: "./project-gothic.jpg"
    },
  ];

  return (
    <>
      <Box sx={basicProfileStyles.headerImage} />
      <Paper hidden={false} elevation={3} sx={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        marginTop: "-64px",
        marginLeft: "10px",
        marginRight: "10px"
      }}>
        <Grid container spacing={2}>
          <FormGrid size={12} sx={{ marginBottom: "30px", display: "flex", flexDirection: "row" }}>
            <Avatar sx={{ width: 70, height: 70, marginRight: "10px" }}
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <Box>
              <Typography variant="h3">Richard Davis</Typography>
              <Typography sx={{ color: "gray" }}>CEO / Co-Founder</Typography>
            </Box>
          </FormGrid>
          <FormGrid size={4}>
            <Box>
              <Typography variant="h5">Platform Settings</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ marginTop: "20px" }}>Account</Typography>
              <FormControlLabel
                control={
                  <Switch checked={accountSwitchState.emailOnFollow} onChange={handleAccountSwitchChange} name="emailOnFollow" />
                }
                label="Email me when someone follows me"
              />
              <FormControlLabel
                control={
                  <Switch checked={accountSwitchState.emailOnAnswer} onChange={handleAccountSwitchChange} name="emailOnAnswer" />
                }
                label="Email me when someone answers on my post"
              />
              <FormControlLabel
                control={
                  <Switch checked={accountSwitchState.emailOnMention} onChange={handleAccountSwitchChange} name="emailOnMention" />
                }
                label="Email me when someone mentions me"
              />
              <Typography variant="h6" sx={{ marginTop: "20px" }}>Application</Typography>
              <FormControlLabel
                control={
                  <Switch checked={appSwitchState.newLaunchesAndProjects} onChange={handleAppSwitchChange} name="newLaunchesAndProjects" />
                }
                label="New launches and projects"
              />
              <FormControlLabel
                control={
                  <Switch checked={appSwitchState.monthlyProductUpdates} onChange={handleAppSwitchChange} name="monthlyProductUpdates" />
                }
                label="Monthly product updates"
              />
              <FormControlLabel
                control={
                  <Switch checked={appSwitchState.subscribeToNewsletter} onChange={handleAppSwitchChange} name="subscribeToNewsletter" />
                }
                label="Subscribe to newsletter"
              />
            </Box>
          </FormGrid>
          <FormGrid size={4}>
            <Box>
              <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}><Typography variant="h5">Profile Information</Typography>
                <Tooltip title="Edit profile" arrow>
                  <IconButton size="small"
                    href="https://mui.com/material-ui/"
                    target="_blank"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography sx={{ marginTop: "10px" }}>Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</Typography>
              <Box sx={{ marginTop: "20px", display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold" }}>Full Name:&nbsp;</Typography>
                <Typography>Alec M. Thompson</Typography>
              </Box>
              <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold" }}>Mobile:&nbsp;</Typography>
                <Typography>(44) 123 1234 123</Typography>
              </Box>
              <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold" }}>Email:&nbsp;</Typography>
                <Typography>alecthompson@mail.com</Typography>
              </Box>
              <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold" }}>Location:&nbsp;</Typography>
                <Typography>USA</Typography>
              </Box>
              <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold" }}>Social:&nbsp;</Typography>
                <Box>
                  <Link href="http://www.facebook.com" target="_blank" sx={{ color: "primary.main" }}>
                    <FacebookIcon />
                  </Link>
                  <Link href="http://www.twitter.com" target="_blank" sx={{ color: "primary.main" }}>
                    <TwitterIcon />
                  </Link>
                  <Link href="http://www.instagram.com" target="_blank" sx={{ color: "primary.main" }}>
                    <InstagramIcon />
                  </Link>
                </Box>
              </Box>
            </Box>
          </FormGrid>
          <FormGrid size={4}>
            <Box>
              <Typography variant="h5">Conversations</Typography>
            </Box>
            <List sx={{ marginLeft: "0px", paddingLeft: "0px", width: '100%', maxWidth: 360 }}>
              {
                conversationItems.map((item, index) => (
                  <ListItem key={index} sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <ListItemAvatar>
                        <Avatar src={item.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={item.name} secondary={item.post} />
                    </Box>
                    <Link href="http://google.com" target="_blanK" sx={{ color: "primary.main", fontWeight: "bolder", fontSize: 12 }}>REPLY</Link>
                  </ListItem>
                ))
              }
            </List>
          </FormGrid>
          <FormGrid size={12}>
            <Box>
              <Typography variant="h5">Projects</Typography>
              <Typography sx={{ color: "gray" }}>Architects design houses</Typography>
            </Box>
          </FormGrid>
          <FormGrid size={12}>
            <List sx={{ display: "flex", flexDirection: "row", marginLeft: "0px", paddingLeft: "0px", width: '100%' }}>
              {
                projectlist.map((item, index) => (
                  <ListItem key={index} sx={{ justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardMedia
                        component="img"
                        image={item.image}
                        //onLoad={() => console.log("this is loading")}
                        onError={() => console.log("this is error")}
                        alt={item.name}
                        sx={{
                          borderRadius: "0.75rem",
                          maxWidth: {
                            xs: "100%",
                            sm: "500px",
                          },
                          objectFit: "cover",
                        }}
                      />
                      <Typography sx={{ color: "gray", marginTop: "10px", marginBottom: "10px" }}>Project #{index + 1}</Typography>
                      <ListItemText primary={
                        <Typography variant="h5" sx={{ fontWeight: "bolder" }}>{item.name}</Typography>}
                        secondary={<Typography sx={{ color: "gray" }}>{item.description}</Typography>} />
                    </Box>
                    <Box>
                      <Button size="small" variant="outlined" sx={{ fontWeight: "bold", borderColor: "primary.main", color: "primary.main", marginTop: "15px" }}>VIEW PROJECT</Button>
                    </Box>
                  </ListItem>
                ))
              }
            </List>
          </FormGrid>
        </Grid>
      </Paper >
    </>
  )
};

export default BasicProfile;
