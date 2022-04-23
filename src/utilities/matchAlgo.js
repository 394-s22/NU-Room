// export the function
// look through each to filter on conditions
// create match score out of what's left
// assign 

const results = {};
// hash id : [(profile id, match score, commonalities)], ]


const convertDictToList = (dict) => {
    let arr = [];
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            profiles.push( dict[key] );
        }
    }
    return arr;
}

// userProfiles: dictionary of profiles
// profiles: array of profiles
// user: user dictionary
// compareAll: loop through profiles and run algo on each
const compareAll = (user, userProfiles) => {
    // convert into list
    let profiles = convertDictToList(userProfiles);

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
    if (user.roomingPrefs.dealBreakers.isSmoker) {
        profiles = profiles.filter(profile => !profile.aboutMe.personalTraits.smoker);
    }
    if (user.roomingPrefs.dealBreakers.isDrinker) {
        profiles = profiles.filter(profile => !profile.aboutMe.personalTraits.drinker);
    }
    if (user.roomingPrefs.dealBreakers.isPetOwner ) {
        profiles = profiles.filter(profile => !profile.aboutMe.personalTraits.petOwner);
    }

    // Part II: Minimized Distance Score
    const matchData = {};
    profiles.map(profile => matchData[profile["ID"]] = min_distance(user, profile));



}

// profile: individual profile (dictionary) to compare to user
const min_distance = (user, profile) => {
    let min_dist = 0
    let match_score = 0
    
    if (user.aboutMe.personalTraitsCont.musician) {
        min_dist += Math.abs(user.aboutMe.personalTraitsValues.musicianValue - profile.aboutMe.personalTraitsValues.musicianValue);
    }
    
    if (user.aboutMe.personalTraitsCont.partnerOver) {
        min_dist += Math.abs(user.aboutMe.personalTraitsValues.partnerOverValue - profile.aboutMe.personalTraitsValues.partnerOverValue);
    }

    if (user.aboutMe.personalTraitsCont.guestsOver) {
        min_dist += Math.abs(user.aboutMe.personalTraitsValues.guestsOverValue - profile.aboutMe.personalTraitsValues.guestsOverValue);
    }
    
    return [min_dist, match_score];
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