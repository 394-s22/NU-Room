import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])

const Profile = ({ data }) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <h1>First</h1>
                
            </Grid>
            <Grid item xs={6}>
                <h1>Last</h1>
            </Grid>

            <Grid item xs={12}>
                <h2>Bio</h2>
            </Grid>
            <Grid item xs={12}>
                <p>Hi my name is Name and I am from Place. I really enjoy hobbies. More words here.</p>
            </Grid>
            <Grid item xs={12}>
                <img src="https://picsum.photos/200/300" alt="Profile Image"></img>
            </Grid>

            <Grid item xs={12}>
                
                    <h2>Hobbies</h2>
                        <ul>
                            <li>Drawing</li>
                            <li>Reading</li>
                        </ul>
                        <h2>Personal Vibe</h2>
                        <ul>
                            <li>Introvert</li>
                            <li>bookworm</li>
                        </ul>
                    <h2>___ % Match!</h2>
                    <h3>Message Name at: @email</h3>
                
            </Grid>
        </Grid>


    );
};

export default Profile;
