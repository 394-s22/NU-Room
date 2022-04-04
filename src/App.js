import logo from './logo.svg';
import './App.css';
import Form from "./Components/Form";
import Profile from "./Components/Profile";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useData } from './utilities/firebase.js';
import { useEffect, useState } from 'react';


function App() {
  const [data, loadingData, errorData] = useData("/");

  useEffect(() => {
    if (data === undefined) return;
    console.log("data", data);
  }, [data])

  return (
    
    <div>
      <Profile profileObject={data} /> 
    </div>
    
  
  );
}

export default App;
