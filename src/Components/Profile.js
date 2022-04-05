import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import "../CSS/profile.css"

// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])

const Profile = ({ profile }) => {

    return (

        <div className="profileCard">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h1>{profile.name[0]}</h1>
                    
                </Grid>
                <Grid item xs={6}>
                    <h1>{profile.name[1]}</h1>
                </Grid>

                <Grid item xs={12}>
                    <h2>Bio</h2>
                </Grid>
                <Grid item xs={12}>
                    <p>{profile.bio}</p>
                </Grid>
                <Grid item xs={12}>
                    <img id="profileImg" src="https://picsum.photos/200/300" alt="Profile Image"></img>
                </Grid>

                <Grid item xs={12}>
                    
                        <h2>Hobbies</h2>
                            <ul>
                                <li>{profile.hobbies[0]}</li>
                                <li>{profile.hobbies[1]}</li>
                            </ul>
                            <h2>Personal Vibe</h2>
                            <ul>
                                <li>{profile.personality[0]}</li>
                                <li>{profile.personality[0]}</li>
                            </ul>
                        <h2>___ % Match!</h2>
                        <h3>Message Name at: @email</h3>
                    
                </Grid>
            </Grid>
        </div>


    );
};

export default Profile;
