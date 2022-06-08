import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MatchesPage from "./MatchesPage";

test("Text make a profile to get matches", async () => {
    render(<MatchesPage currentMatches={null} setCurrentProfile={()=>{}} setDisplayPage={()=>{}} currentMatchScores={()=>{}} matchesCommonalities={()=>{}} setMatchCommonalities={()=>{}}></MatchesPage>);
    expect(await screen.getByText('Click below to get started')).toBeVisible();
})

test("Button to create new profile appears", async () => {
    render(<MatchesPage currentMatches={null} setCurrentProfile={()=>{}} setDisplayPage={()=>{}} currentMatchScores={()=>{}} matchesCommonalities={()=>{}} setMatchCommonalities={()=>{}}></MatchesPage>);
    expect(await screen.getByText('Create a profile')).toBeVisible();
})

// //hanyang@gmail.com
// test("Full profile should have email displayed with correct text", async () => {
//   render(<FullProfile profile={profile} setDisplayPage={()=>{}} commonalities={[]}></FullProfile>);
//   expect(await screen.getByTestId('emailTest')).toBeVisible();
// })