// export the function
// look through each to filter on conditions
// create match score out of what's left
// assign 

const results = {};
// hash id : [(profile id, match score, commonalities)], ]

// userProfiles: dictionary of profiles
// profiles: array of profiles
// user: user dictionary
// compareAll: loop through profiles and run algo on each
const compareAll = (user, userProfiles) => {
    // convert into list
    let profiles = [];
    for (var key in userProfiles) {
        if (userProfiles.hasOwnProperty(key)) {
            profiles.push( userProfiles[key] );
        }
    }

    // Part I: Filter

    // Basic Information
    if (user.nextYearGrade === "First Year") {
        profiles = profiles.filter(profile => profile.nextYearGrade === "First Year");
    } else if (user.nextYearGrade === "Grad/PhD") {
        profiles = profiles.filter(profile => profile.nextYearGrade === "Grad/PhD");
    }
    
    // Housing Preferences
    if (user.housingPrefs.sameSexRooming) {
        profiles = profiles.filter(profile => profile.basicInfo.gender === user.basicInfo.gender);
    }
    if (user.housingPrefs.accomodation === "On Campus") {
        profiles = profiles.filter(profile => profile.housingPrefs.accomodation === "On Campus");
    } else if (user.housingPrefs.accomodation === "Off Campus") {
        profiles = profiles.filter(profile => profile.housingPrefs.accomodation === "Off Campus");
    }
    if (user.housingPrefs.shareRoom) {
        profiles = profiles.filter(profile => profile.housingPrefs.shareRoom);
    }
    
    // About Me












}

// profile: individual profile to compare to user
const matchingAlgo = (user, profile) => {
    // filter on hard No's
    
}


export default compareAll;

// "144630": {
//     "ID": 144630,
//     "aboutMe": {
//       "personalTraits": {
//         "drinker": true,
//         "petOwner": true,
//         "smoker": true
//       },
//       "personalTraitsCont": {
//         "guestsOver": true,
//         "musician": true,
//         "partnerOver": false
//       },
//       "personalTraitsValues": {
//         "guestsOverValue": 25,
//         "musicianValue": 50,
//         "partnerOverValue": 0
//       }
//     },
//     "basicInfo": {
//       "email": "nataliebrewster2023@u.northwestern.edu",
//       "fname": "Jane",
//       "gender": "Female",
//       "lname": "Austin",
//       "nextYearGrade": "Third Year",
//       "pronouns": [
//         "She/her"
//       ],
//       "whereYouFrom": "California"
//     },
//     "housingPrefs": {
//       "accomodation": "Off Campus",
//       "location": "No preference",
//       "roommateType": "Close Friends",
//       "sameSexRooming": false,
//       "shareRoom": false
//     },
//     "moreAboutMe": {
//       "background": {
//         "city": "",
//         "country": "",
//         "state": ""
//       },
//       "hobbies": [
//         "Arts and Crats",
//         "Music",
//         "Socializing",
//         "Reading",
//         "Travel",
//         "Technology"
//       ],
//       "lookingFor": "Looking for someone who is interested subletting my room for fall quarter 2022. Room is nice and the apartment is clean and close to campus!",
//       "personality": [
//         "I like to try new things",
//         "Extrovered",
//         "I like to have everything planned"
//       ]
//     },
//     "profileImage": "JaneAustin144630.jpg",
//     "roomingPrefs": {
//       "dealBreakers": {
//         "isDrinker": false,
//         "isPetOwner": false,
//         "isSmoker": false
//       },
//       "prefValues": {
//         "cleaningValue": 50,
//         "hasGuestsOverValue": 100,
//         "hasPartnerOverValue": 100
//       }
//     }
//   },