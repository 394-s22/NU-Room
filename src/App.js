import logo from './logo.svg';
import './App.css';
import Form from "./Components/Form";
import MatchesPage from "./Components/MatchesPage";
import Profile from "./Components/Profile";
import FullProfile from "./Components/FullProfile";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useData } from './utilities/firebase.js';
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import { AppBar } from '@material-ui/core';
import NavBar from "./Components/NavBar";
import PrimarySearchAppBar from './Components/Appbar';



function App() {
  const [data, loadingData, errorData] = useData("/");
  const [loading, setLoading] = useState(false);
  const [displayPage, setDisplayPage] = useState(() => {
    const uID = localStorage.getItem("userID");
    return uID === null ? "Form" : "Matches";
  });

  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentMatches, setCurrentMatches] = useState(null);
  const [pulledMatches, setPulledMatches] =  useState(false);
  const [currentMatchScores, setCurrentMatchScores] = useState(null);
  const [matchesCommonalities, setMatchesCommonalities] = useState(null);
  const [matchCommonalities, setMatchCommonalities] = useState(null);

  useEffect(() => {
    if (data === undefined) return;
  }, [data])

  useEffect( async () => {
    const userID = localStorage.getItem("userID");
    if (userID !== null && !loadingData) { 
      const matchingIDs = data.profile[userID].savedMatches.matches.matchID;
      console.log(matchingIDs);
      if (matchingIDs !== false) {
        const userMatches = matchingIDs.map(id => {return data.profile[id];});
        console.log('app js')
        console.log(data.profile[userID].savedMatches.matches.matchScore);
        setCurrentMatchScores(data.profile[userID].savedMatches.matches.matchScore);
        setMatchesCommonalities(data.profile[userID].savedMatches.matches.commonalities)
        console.log("current match state")
        console.log(currentMatchScores);
        // if (!pulledMatches) {
          setCurrentMatches(userMatches);
        // }
        console.log(userMatches);
        setDisplayPage("Matches");
      }
    }
  }, [loadingData]);

  if (errorData) return <h1>{errorData}</h1>
  if (loadingData || loading) return <h1>Loading...</h1>
  document.body.style = 'background: #f5f5f5';

  const renderSwitch = (displayPage) => {
    switch(displayPage) {
      case "Form":
        return <Form data={data} profile={data.profile} setDisplayPage={setDisplayPage} setLoading={setLoading} setCurrentMatches={setCurrentMatches}
                    setCurrentMatchScores={setCurrentMatchScores} setMatchesCommonalities={setMatchesCommonalities}></Form>; 
      case "Matches":
        // return <MatchesPage data={data} setCurrentProfile={setCurrentProfile} setDisplayPage={setDisplayPage}></MatchesPage>;
        return <MatchesPage currentMatches={currentMatches} setCurrentProfile={setCurrentProfile} setDisplayPage={setDisplayPage} 
                    currentMatchScores={currentMatchScores} matchesCommonalities={matchesCommonalities} setMatchCommonalities={setMatchCommonalities}></MatchesPage>;
      case "FullProfile":
        return <FullProfile profile={currentProfile} setDisplayPage={setDisplayPage} commonalities={matchCommonalities}></FullProfile>;
      default:
        return null;
    }
  }

  return (

    <div>
      <PrimarySearchAppBar displayPage={displayPage} setDisplayPage={setDisplayPage}/>
      {/* <NavBar displayPage={displayPage} setDisplayPage={setDisplayPage}></NavBar> */}
      
      <Grid container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{backgroundColor: '#f5f5f5'}}>
        {
          renderSwitch(displayPage)
        }
      </Grid>
    </div>
  )
}

export default App;
