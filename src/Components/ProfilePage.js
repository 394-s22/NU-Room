import { useEffect, useState } from 'react';
import * as React from 'react';
import Profile from "./Profile"


const ProfilePage = ({ data }) => {
    const profiles = data.profiles;
    console.log(profiles);

    return (
        <div>
            <h2>Potential Roomate Matches</h2>
            <div className="profileList">
                { profiles.map((profile) => {
                    return (
                        <Profile profile={profile}></Profile>
                    );
                }) }
            </div> 
        </div>
    );
};

export default ProfilePage;