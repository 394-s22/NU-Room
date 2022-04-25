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
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

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

export default function Profile({ profile, setCurrentProfile, setDisplayPage, matchScore }) {
  const [expanded, setExpanded] = React.useState(false);
  const [fullProfilePage, setFullProfilePage] = React.useState(false);

  const randomNumber = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
  const databaseProfileImageName = profile.profileImage;

  //console.log(databaseProfileImageName)
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

  // console.log('profile:', profile)
  useEffect(async () => {
    getDownloadURL(sRef(storage, "images/" + databaseProfileImageName))
        .then((url) => {
          document.getElementById(profile.basicInfo.fname + profile.basicInfo.lname + "PhotoID").setAttribute('src', url);
          
        //  console.log(url);
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
      <Chip sx = {{marginRight: '4px', marginBottom: '4px'}}  variant="outlined" label={hobby}/>
    );
  } 

  let personalityList = null
  if (profile.moreAboutMe.personality !== undefined) {
     personalityList = profile.moreAboutMe.personality.map((personality) =>
     <Chip sx = {{marginRight: '4px', marginBottom: '4px'}}  variant="outlined" label={personality}/>
    );
  }

  // const [chipData, setChipData] = React.useState([
  //   { key: 0, label: 'Angular' },
  //   { key: 1, label: 'jQuery' },
  //   { key: 2, label: 'Polymer' },
  //   { key: 3, label: 'React' },
  //   { key: 4, label: 'Vue.js' },
  // ]);

  const chipData = []
  for (var hobby in hobbiesList) {
    chipData.push({key: chipData.length, label: hobby})
    // console.log(chipData)
  }
  console.log("Profile matchScore")
  console.log(matchScore)
  return (
    <Card sx={{ width: 1 }}>
      <CardHeader
        title={profile.basicInfo.fname + " " + profile.basicInfo.lname}
      //   subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="250"
        width="250"
        image="https://firebasestorage.googleapis.com/v0/b/nu-room-92e71.appspot.com/o/images%2FDefaultProfilePicture.jpg?alt=media&token=ab7f0ea9-7387-48de-8fb7-5553103601fb"
        alt="Roommate photo"
        id = {profile.basicInfo.fname + profile.basicInfo.lname + "PhotoID"}
      />
      <CardContent>
      <Typography  variant="body2" color="text.secondary" sx={{ fontWeight: 700, marginBottom: '8px'}}>Match Score: {matchScore} </Typography>
        <Typography  variant="body2" color="text.secondary" sx={{ fontWeight: 700, marginBottom: '8px'}}>About Me</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px'}}>
          {profile.moreAboutMe.lookingFor}
        </Typography>
    
          <Typography  variant="body2" color="text.secondary" sx={{ fontWeight: 700, marginBottom: '8px'}}>Hobbies:</Typography>
          {/* {chipData.map((data) => {
          return (
              
          );
          })} */}
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px'}}>
            {hobbiesList}
            {/* {profile.hobbies[0]} */}
          </Typography>

          
          {/* <Chip label=size="small" />
           */}
          {/* <Typography paragraph>
            {profile.hobbies[1]}
          </Typography> */}
          <Typography  variant="body2" color="text.secondary" sx={{ fontWeight: 700, marginBottom: '8px' }}>Personality:</Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {profile.personality[0]} */}
            {personalityList}
          </Typography>

        </CardContent>

      {/* <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions> */}

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

      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        
      </Collapse> */}
    </Card>
  );
}

