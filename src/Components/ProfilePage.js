import { useEffect, useState } from 'react';
import * as React from 'react';
import Profile from "./Profile";
import Grid from "@mui/material/Grid";

const ProfilePage = ({ data }) => {
    const profiles = data.profiles;
    console.log(profiles);

    return (
        <div>
            
            <h2>Potential Roomate Matches</h2>
            <div className="profileList">
                <Grid 
                    container columnSpacing={{ xs: 2}}
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                >
                    <Grid item xs = {12} md = {10}>
                        <Grid 
                            container columnSpacing={{ xs: 2}}
                            justifyContent="center"
                            direction="row"
                            alignItems="center"
                        >
                            { profiles.map((profile) => {
                                return (
                                    <Grid item xs = {12} md = {4}>
                                        <Profile profile={profile}></Profile>
                                    </Grid>
                                );
                            }) }
                        </Grid>
                    </Grid>
                </Grid>
            </div> 
        </div>
    );
};

export default ProfilePage;