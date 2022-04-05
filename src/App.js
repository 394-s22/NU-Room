import logo from './logo.svg';
import './App.css';
import Form from "./Components/Form";
import ProfilePage from "./Components/ProfilePage"
import Profile from "./Components/Profile";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useData } from './utilities/firebase.js';
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";
import { AppBar } from '@material-ui/core';
import NavBar from "./Components/NavBar";


function App() {
  const [data, loadingData, errorData] = useData("/");
  const [displayPage, setDisplayPage] = useState("Form");

  useEffect(() => {
    if (data === undefined) return;
    console.log("data", data);
  }, [data])

  if (errorData) return <h1>{errorData}</h1>;
  if (loadingData) return <h1>Loading the data...</h1>;

  return (
    // <div>

    //   <Profile profileObject={data} /> 
    // </div>,
    <div>
    <NavBar displayPage={displayPage} setDisplayPage={setDisplayPage}></NavBar>
    <Grid sx={{backgroundColor: 'background.default', height: '100vh'}}>
      {/* <Form /> */}
      {/* <Profile profileObject={data} />  */}
      {(displayPage === "Form")? <Form></Form> : <ProfilePage data={data}></ProfilePage>}
    </Grid>
    
    </div>
  
  );
}

export default App;
