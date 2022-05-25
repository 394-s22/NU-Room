import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from "@mui/material/Grid";
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import "../CSS/profile.css";
import SpeedDial from '@mui/material/SpeedDial';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import Chip from '@mui/material/Chip';
// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])


import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from "react";

import { getStorage } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIe24tq4GELA23AwacArSKJh0h_Z5jJ64",
  authDomain: "nu-room-92e71.firebaseapp.com",
  databaseURL: "https://nu-room-92e71-default-rtdb.firebaseio.com",
  projectId: "nu-room-92e71",
  storageBucket: "nu-room-92e71.appspot.com",
  messagingSenderId: "1023006719723",
  appId: "1:1023006719723:web:6451d58949a624aad7c8ae"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const storage = getStorage(firebase);

console.log(database);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const FullProfile = ({ profile, setCurrentProfile, setDisplayPage, commonalities }) => {
  const [expanded, setExpanded] = React.useState(false);
  console.log('full profile:', profile)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const databaseProfileImageName = profile.profileImage;

  // console.log('profile:', profile)
  useEffect(async () => {
    getDownloadURL(sRef(storage, "images/" + databaseProfileImageName))
      .then((url) => {
        document.getElementById(profile.basicInfo.fname + profile.basicInfo.lname + "FullProfilePhotoID").childNodes[0].setAttribute('src', url);

        console.log(url);
      })
      .catch((error) => {
        // Handle any errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            console.log("1")
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            console.log("2")
            break;
          case 'storage/canceled':
            // User canceled the upload
            console.log("3")
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            console.log("4");
            break;
        }
      });
  }, []);

  return (

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"

    >
      <Grid item md={6} paddingX={3} paddingY={2}>
        <Card sx={{ borderRadius: 3, flexGrow: 1, marginTop: 2 }} >
          {/* <CardMedia
            component="img"
            height="250"
            image="https://picsum.photos/200/400"
            alt="Background"
          /> */}
          <CardContent sx={{ marginTop: 5 }}>

            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}
            >
              <Box sx={{ minHeight: 80 }}>
                <Avatar
                  alt="User Name"
                  id={profile.basicInfo.fname + profile.basicInfo.lname + "FullProfilePhotoID"}
                  src="https://firebasestorage.googleapis.com/v0/b/nu-room-92e71.appspot.com/o/images%2FDefaultProfilePicture.jpg?alt=media&token=ab7f0ea9-7387-48de-8fb7-5553103601fb"
                  sx={{ width: 100, height: 100, marginTop: -6 }}
                  style={{
                    border: '3px solid white',
                  }}
                />

              </Box>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}

              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {profile.basicInfo.fname + " " + profile.basicInfo.lname}
                </Typography>
                <Typography style={{ color: "grey" }}>
                  {profile.basicInfo.nextYearGrade}
                </Typography>

              </Stack>

            </Stack>

          </CardContent>

        </Card>
      </Grid>

      <Grid item xs={12} md={6} paddingX={3}>

        <Card sx={{ flexGrow: 1, borderRadius: 3 }}>
        

          <CardContent>
            <Divider />
            <Typography variant="body2" color="text.secondary" paddingTop={2} sx={{ fontSize: 20, color: 'black' }}>
              {"About"}
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary" >
              {profile.bio}
            </Typography>
            <br />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item md={8} xs={12}>
              <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >

                  <Typography variant="body2" color="black" >
                  <div data-testid="genderTest">
                    {profile.basicInfo.gender}
                  </div>
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >

                  <Typography variant="body2" color="black" >
                    {"Pronouns: " + profile.basicInfo.pronouns}
                  </Typography>


                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >
                  <LocationOnIcon />

                  <Typography variant="body2" color="black" >
                    {"Lives in"} <span style={{ fontWeight: 'bold' }}>{profile.basicInfo.whereYouFrom}</span>
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >
                  <MailIcon />
                  <Typography variant="body2" color="black" >
                    <div data-testid="emailTest">
                       {profile.basicInfo.email}
                    </div>
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >
                  <SchoolIcon />
                  <Typography variant="body2" color="black" >
                    {"Next Year Grade: "} <span style={{ fontWeight: 'bold' }}>{profile.basicInfo.nextYearGrade}</span>
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >
                  <Typography variant="body2" color="black" >
                  {commonalities}
                  </Typography>
                </Stack>
                

              </Grid>
              <Grid item md={4} xs={12}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={0.5}
                  paddingY={1}
                >

                  <Typography variant="body2" color="black" >
                    {"Looking for: " + profile.moreAboutMe.lookingFor}
                  </Typography>


                </Stack>
                <Stack direction="row"
                  justifyContent="flex-start"
                  flexWrap = "wrap"
                  alignItems="center"
                  spacing={1}
                  paddingY={1}>
                  {"Hobbies: "}
                  {
                    profile.moreAboutMe.hobbies.map((hobbie) => (
                      <Chip label={hobbie} variant="outlined" />
                    ))
                  }
                </Stack>
                
                <Stack direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  flexWrap = "wrap"
                  spacing={1}
                  paddingY={1}>
                  {"Personalities: "}
                  {
                    profile.moreAboutMe.personality.map((p) => (
                      <Chip label={p} variant="outlined" />
                    ))
                  }
                </Stack>
              </Grid>
            </Grid>





          </CardContent>
        </Card>


      </Grid>



      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<ArrowBackIcon />}
        onClick={() => {
          setDisplayPage('Matches');
          console.log("Hello");
        }}
      >

      </SpeedDial>

      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>

      </Box>

    </Grid>

  );
}

export default FullProfile;
