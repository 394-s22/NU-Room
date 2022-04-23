// export the function
// look through each to filter on conditions
// create match score out of what's left
// assign 

const results = {};
// hash id : [(profile id, match score, commonalities)], ]

// userProfiles: dictionary of profiles
// profiles: array of profiles
// compareAll: loop through profiles and run algo on each
const compareAll = (user, userProfiles) => {
    // convert into list
    const profiles = [];
    for (var key in userProfiles) {
        if (userProfiles.hasOwnProperty(key)) {
            profiles.push( userProfiles[key] );
        }
    }




}

// profile: individual profile to compare to user
const matchingAlgo = (user, profile) => {
    // filter on hard No's
    
}


export default compareAll;
