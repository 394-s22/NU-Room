import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Profile from "./Profile";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import { convertDictToList } from '../utilities/matchAlgo';
import Button, { ButtonProps } from '@mui/material/Button';
import "../CSS/matchespage.css"

const MatchesPage = ({ currentMatches, setCurrentProfile, setDisplayPage}) => {
    /* let profiles = currentMatches === null || currentMatches === undefined ? data.profile : currentMatches;
    profiles = convertDictToList(profiles)
    console.log('profiles:',profiles); */

    const changePage = () => {
        if (localStorage.getItem("userID") === null) {
            setDisplayPage('Form');
        }
    }

    // TODO: Style this
    if (currentMatches === null || currentMatches === false || currentMatches.length === 0) {
        if (localStorage.getItem("userID") === null) {
            return (
                <div className='matchless'>
                    <Grid 
                        container columnSpacing={{ xs: 2}}
                        rowSpacing = {{xs:5}}
                        justifyContent="center"
                        direction="row"
                        alignItems="center"
                        sx={{m: 30}}
                    >
                        <h2>Unfortunately, you haven't created a profile yet</h2>
                        <br/>
                        <p>Click below to get started</p>
                        <br/>
                        <Button w={1} variant="contained" sx = {{
                            width: 300,
                            minHeight: "48px",
                            fontWeight: 700,
                            fontSize: "16px",
                            whiteSpace: 'nowrap',
                            textAlign: 'center'
                            
                            }}
                            onClick={() => {
                                changePage();
                            }}>Create a profile</Button>
                    </Grid>
                </div>
            );
        }
        return (
            <div className='matchless'>
                <Grid 
                    container columnSpacing={{ xs: 2}}
                    rowSpacing = {{xs:5}}
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                    sx={{m: 5}}
                >
                    <h2>Unfortunately, there are no matches for you at this time. Check back at a later time</h2>
                </Grid>
            </div>
        );
    }

    const profiles = currentMatches;
    // const profiles = convertDictToList(data.profile);

    /* if (currentMatches != null) {
        console.log('currentMatches:',currentMatches);
        return <div>Check the console</div>
    } */

    // **** DO NOT DELETE THE FOLLOWING COMMENT
    // **** THIS FUNCTION WILL PULL PROFILE IMAGES FROM
    // **** THE DATABASE
    // useEffect(() => {
    //     getDownloadURL(ref(storage, ''))
    //     .then((url) => {
    //         // `url` is the download URL for 'images/stars.jpg'

    //         // This can be downloaded directly:
    //         // const xhr = new XMLHttpRequest();
    //         // xhr.responseType = 'blob';
    //         // xhr.onload = (event) => {
    //         // const blob = xhr.response;
    //         // };
    //         // xhr.open('GET', url);
    //         // xhr.send();

    //         // Or inserted into an <img> element
    //         const img = document.getElementById('myimg');
    //         img.setAttribute('src', url);
    //     })
    //     .catch((error) => {
    //         // Handle any errors
    //         switch (error.code) {
    //             case 'storage/object-not-found':
    //               // File doesn't exist
    //               break;
    //             case 'storage/unauthorized':
    //               // User doesn't have permission to access the object
    //               break;
    //             case 'storage/canceled':
    //               // User canceled the upload
    //               break;
          
    //             // ...
          
    //             case 'storage/unknown':
    //               // Unknown error occurred, inspect the server response
    //               break;
    //           }
    //     });
    // }, []);



    return (
        <div>
            
            <div className="profileList">
                <Grid 
                    container columnSpacing={{ xs: 2}}
                    rowSpacing = {{xs:5}}
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                    sx={{m: 5}}
                >
                    <Grid item xs = {10} md = {8} lg = {8} sx = {{ marginTop:"24px"}}>
                        <div
                            style={{
                                textAlign: "left",
                                padding: 0,
                                margin: 0
                            }}
                            >   
                                <h2 style = {{
                                fontSize: 35,
                                fontWeight: "lighter"
                                }}>
                                    Potential Roommate Matches
                                </h2>
                        </div>
                    </Grid>
                    <Grid item xs = {10} md = {8} lg = {8} sx={{ml: 3}}>
                        
                        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>

                            { profiles.map((profile, index) => {
                                return (
                                    <Profile key={index} profile={profile} setCurrentProfile={setCurrentProfile} setDisplayPage={setDisplayPage}></Profile>
                                        
                                );
                            }) }
                        </Masonry>
                       
                    </Grid>
                </Grid>
            </div> 
        </div>
    );
};

export default MatchesPage;