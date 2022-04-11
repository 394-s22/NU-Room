import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Profile from "./Profile";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Masonry from '@mui/lab/Masonry';
import Box from '@mui/material/Box';

const MatchesPage = ({ data, setCurrentProfile, setDisplayPage}) => {
    const profiles = data.profiles;
    console.log(profiles);

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

                            { profiles.map((profile) => {
                                return (
                                        
                                            <Profile profile={profile} setCurrentProfile={setCurrentProfile} setDisplayPage={setDisplayPage}></Profile>
                                        
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