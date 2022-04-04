import React, { useEffect, useState } from "react";
// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])
const Profile = ({ data }) => {

    return (
        <div>
            <h1>First Last</h1>
            <img src="https://picsum.photos/200/300" alt="Profile Image"></img>
            
            <h2>Bio</h2>
            <p>Hi my name is Name and I am from Place. I really enjoy hobbies. More words here.</p>
            
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
        </div>
    );
};

export default Profile;
