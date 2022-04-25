// converts dictionaries into list of values
export const convertDictToList = (dict) => {
    let arr = [];
    for (var key in dict) {
        if (dict.hasOwnProperty(key)) {
            arr.push( dict[key] );
        }
    }
    return arr;
}

const compare = (a, b) =>  {
    return a[0] - b[0];
}

// profile: individual profile (dictionary) to compare to user
const min_distance = (user, profile) => {
    let min_dist = 0
    let match_score = 0

    let commonTraitsReport = []

    //About Me sliders
    let cleaningTolerance = Math.abs((user.roomingPrefs.prefValues.cleaningValue/100) - (profile.roomingPrefs.prefValues.cleaningValue/100));
    min_dist += cleaningTolerance

    if (cleaningTolerance < 0.5) {
        commonTraitsReport.push("You both feel similarly about cleaning frequency.")
    }
    
    min_dist += Math.abs((user.aboutMe.personalTraitsValues.partnerOverValue/100) - (profile.aboutMe.personalTraitsValues.partnerOverValue/100));

    let guestTolerance = Math.abs((user.aboutMe.personalTraitsValues.guestsOverValue/100) - (profile.aboutMe.personalTraitsValues.guestsOverValue/100));
    min_dist += guestTolerance

    if (guestTolerance <= 0.5) {
        commonTraitsReport.push("You both feel similarly about having guests over.")
    }

    if (user.basicInfo.nextYearGrade === profile.basicInfo.nextYearGrade){
        min_dist -= 0.5;
    }
    if (user.housingPrefs.accomodation === profile.housingPrefs.accomodation) {
        min_dist -= 1;
        commonTraitsReport.push("You both prefer to live " + user.housingPrefs.accomodation + "!")
    }
    if (user.housingPrefs.location === "No preference") {
        min_dist -= 0.5;
    } else if (profile.housingPrefs.location === "No preference") {
        min_dist -= 0.5;
    } else if (user.housingPrefs.location === profile.housingPrefs.location){
        min_dist -= 1;
        commonTraitsReport.push("You both prefer to live " + user.housingPrefs.location + "!")
    }
    
    const commonHobbies = user.moreAboutMe.hobbies.filter(hobby => profile.moreAboutMe.hobbies.indexOf(hobby) !== -1);
    const hobby_count = commonHobbies.length;

    const commonPersonalityTraits = user.moreAboutMe.personality.filter(trait => profile.moreAboutMe.personality.indexOf(trait) !== -1);
    const personalityTrait_count = commonPersonalityTraits.length;

    if (hobby_count >= 2) {
        min_dist -= 1;
        for (let sharedhobby in commonHobbies) {
            commonTraitsReport.push("You both like " + sharedhobby + "!")
        }
    }
    
    if (personalityTrait_count >= 2) {
        min_dist -= 1;
        for (let sharedpersonalitytrait in commonPersonalityTraits) {
            commonTraitsReport.push('"You both selected "' + sharedpersonalitytrait + '"!')
        }
    }

    match_score = Math.abs(min_dist) / 7.5;
    
    return [min_dist, match_score, commonTraitsReport, profile["ID"]];
}

// compareAll : user, userProfiles => matchData
//  user: user dictionary
//  userProfiles: dictionary of (userID -> user dictionary)
export const compareAll = (user, userProfiles) => {
    // convert dict into list
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
    const matchData = [];
    profiles.map(profile => matchData.push(min_distance(user, profile)));

    // Sort based on min distance
    matchData.sort(compare);

    return matchData;
}