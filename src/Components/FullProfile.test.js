import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FullProfile from "./FullProfile";

const profile = {
  "ID": 899261,
  "aboutMe": {
    "personalTraits": {
      "drinker": true,
      "petOwner": false,
      "smoker": true
    },
    "personalTraitsCont": {
      "guestsOver": false,
      "musician": false,
      "partnerOver": false
    },
    "personalTraitsValues": {
      "guestsOverValue": 0,
      "musicianValue": 0,
      "partnerOverValue": 0
    }
  },
  "basicInfo": {
    "email": "hanyang@gmail.com",
    "fname": "Han",
    "gender": "Male",
    "lname": "Yang",
    "nextYearGrade": "Fourth Year",
    "pronouns": [
      "He/him"
    ],
    "whereYouFrom": "Pennsylvania"
  },
  "housingPrefs": {
    "accomodation": "Off Campus",
    "location": "South",
    "roommateType": "Friends",
    "sameSexRooming": true,
    "shareRoom": false
  },
  "moreAboutMe": {
    "hobbies": [
      "Arts and Crafts",
      "Cooking",
      "Food",
      "Writing",
      "Video Games",
      "Travel",
      "Technology"
    ],
    "lookingFor": "",
    "personality": [
      "Extroverted",
      "I like my alone time",
      "I like to try new things",
      "I don't like change"
    ]
  },
  "profileImage": "HanYang899261.PNG",
  "roomingPrefs": {
    "dealBreakers": {
      "isDrinker": false,
      "isPetOwner": true,
      "isSmoker": false
    },
    "prefValues": {
      "cleaningValue": false,
      "hasGuestsOverValue": false,
      "hasPartnerOverValue": false
    }
  },
  "savedMatches": {
    "favorites": false,
    "matches": [
      642076,
      732518
    ]
  }
};

test("Full profile should have gender Displayed", async () => {
    render(<FullProfile profile={profile} setDisplayPage={()=>{}} commonalities={[]}></FullProfile>);
    expect(await screen.getByTestId('genderTest')).toBeVisible();
})

test("Full profile should have email Displayed", async () => {
  render(<FullProfile profile={profile} setDisplayPage={()=>{}} commonalities={[]}></FullProfile>);
  expect(await screen.getByTestId('emailTest')).toBeVisible();
})