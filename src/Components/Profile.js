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
import FullProfile from "./FullProfile";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../CSS/profile.css";
import { useState, useEffect } from "react";


import { GetFireBaseImage } from "../utilities/firebase.js";
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

import { getStorage } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import { getDownloadURL} from "firebase/storage";

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



// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])


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

export default function Profile({ profile, setCurrentProfile, setDisplayPage }) {
  const [expanded, setExpanded] = React.useState(false);
  const [fullProfilePage, setFullProfilePage] = React.useState(false);
  const [fireBaseImage, setFirebaseImage] = useState();

  const randomNumber = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
  const databaseProfileImageName = profile.profileImage;

  console.log(databaseProfileImageName)
  //console.log("test: " + useImage(databaseProfileImageName))

  const link = `https://picsum.photos/200/${randomNumber}`;


  const showFullProfilePage = () => {
    setFullProfilePage(true);
    console.log('inside showFull', fullProfilePage)
    return true;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const randomNumber = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
  const link = `https://picsum.photos/200/${randomNumber}`;
  // console.log('profile:', profile)
  useEffect(async () => {
    getDownloadURL(sRef(storage, "images/" + databaseProfileImageName))
        .then((url) => {
          document.getElementById(profile.basicInfo.fname + profile.basicInfo.lname + "PhotoID").setAttribute('src', url);
          
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


  
  
  
  console.log('profile:', profile)
  //console.log('profile moreAboutMe:', profile.moreAboutMe.hobbies)

  let hobbiesList = null;
  if (profile.moreAboutMe.hobbies !== undefined) {
    hobbiesList = profile.moreAboutMe.hobbies.map((hobby) =>
      <li>{hobby}</li>
    );
  } 

  let personalityList = null
  if (profile.moreAboutMe.personality !== undefined) {
     personalityList = profile.moreAboutMe.personality.map((personality) =>
      <li>{personality}</li>
    );
  }

  return (
    <Card sx={{ width: 1 }}>
      <CardHeader
        title={profile.basicInfo.fname + " " + profile.basicInfo.lname}
      //   subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        // image={fireBaseImage}
        alt="Roommate photo"
        id = {profile.basicInfo.fname + profile.basicInfo.lname + "PhotoID"}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {profile.bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Box textAlign='center'
        m={2}
      >
        <Button w={1} variant="contained" sx={{
          width: 0.75,
          minHeight: "48px",
          fontWeight: 700,
          fontSize: "16px",
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}
          onClick={() => {
            setCurrentProfile(profile);
            setDisplayPage('FullProfile');
          }}>
          View Full Profile</Button>
      </Box>

      {/* <Router>
      <Routes>
        <Route exact path="/FullProfile" 
            component={FullProfile}>
        </Route>
        <Route>
    
              <Link to="/FullProfile" target="_blank">
                View Person's Profile ...
              </Link>
  
        </Route>
      </Routes>
    </Router> */}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph sx={{ fontWeight: 700 }}>Hobbies:</Typography>
          <Typography paragraph>
            {hobbiesList}
            {/* {profile.hobbies[0]} */}
          </Typography>
          {/* <Typography paragraph>
            {profile.hobbies[1]}
          </Typography> */}
          <Typography paragraph sx={{ fontWeight: 700 }}>Personality:</Typography>
          <Typography paragraph>
            {/* {profile.personality[0]} */}
            {personalityList}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

