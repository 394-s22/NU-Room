import logo from './logo.svg';
import './App.css';
import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useData } from './utilities/firebase.js';
import { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid";


function App() {
  const [data, loadingData, errorData] = useData("/");

  useEffect(() => {
    if (data === undefined) return;
    console.log("data", data);
  }, [data])

  return (
    
    // <div>
    //   <Profile profileObject={data} /> 
    // </div>,
    <Grid sx={{backgroundColor: 'background.default', height: '100vh'}}>
      {/* <Form /> */}
      <Profile profileObject={data} /> 
    </Grid>
    
  
  );
}

export default App;
