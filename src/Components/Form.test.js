import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from "./Form";

const profile = {
  "ID": 57584,
  "aboutMe": {
    "personalTraits": {
      "drinker": false,
      "petOwner": false,
      "smoker": false
    },
    "personalTraitsCont": {
      "guestsOver": true,
      "musician": false,
      "partnerOver": false
    },
    "personalTraitsValues": {
      "guestsOverValue": 50,
      "musicianValue": 0,
      "partnerOverValue": 0
    }
  },
  "basicInfo": {
    "email": "johnkim@gmail.com",
    "fname": "John",
    "gender": "Male",
    "lname": "Kim",
    "nextYearGrade": "Third Year",
    "pronouns": [
      "He/him"
    ],
    "whereYouFrom": "Miami"
  },
  "housingPrefs": {
    "accomodation": "On Campus",
    "location": "North",
    "roommateType": "Just Roommates",
    "sameSexRooming": true,
    "shareRoom": false
  },
  "moreAboutMe": {
    "hobbies": [
      "Arts and Crats",
      "Cooking",
      "Food"
    ],
    "lookingFor": "",
    "personality": [
      "Extrovered",
      "I like to try new things",
      "I don't like change"
    ]
  },
  "profileImage": "JohnKim57584.jpg",
  "roomingPrefs": {
    "dealBreakers": {
      "isDrinker": false,
      "isPetOwner": true,
      "isSmoker": true
    },
    "prefValues": {
      "cleaningValue": 75,
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
}

test("Basic Information card shows up", async () => {
    render(<Form data={()=>{}} profile={profile} setDisplayPage={()=>{}} setLoading={()=>{}} setCurrentMatches={()=>{}}
        setCurrentMatchScores={()=>{}} setMatchesCommonalities={()=>{}}></Form>);
    expect(await screen.queryByTestId('basicTest')).toBeVisible();
})

test("Cleaning Slider shows up", async () => {
    render(<Form data={()=>{}} profile={profile} setDisplayPage={()=>{}} setLoading={()=>{}} setCurrentMatches={()=>{}}
    setCurrentMatchScores={()=>{}} setMatchesCommonalities={()=>{}}></Form>);
  expect(await screen.queryByTestId('sliderTest')).toBeVisible();
})