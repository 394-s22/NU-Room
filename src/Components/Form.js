import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setData } from "../utilities/firebase";

const Form = () => {

    const [year, setYear] = React.useState('');

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    const uploadProfile = () => {
        
    };


    return (

        <form className="IntakeForm" onsubmit="uploadProfile()">
            <div className="BasicInfo">
                <input id="fName" type="text" placeholder="First Name"></input>
                <input id="lName" type="text" placeholder="Last Name"></input>
                <div>
                    <label for="gender">Gender:</label>
                    <select name="gender">
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="non-binary">non-binary</option>
                        <option value="other">other</option>
                        <option value="prefer not to say">prefer not to say</option>
                    </select>
                </div>
                <div>
                    
                    <label for="pronouns">Pronouns:</label>
                    <select name="pronouns">
                            <option value="he/him">he/him</option>
                            <option value="she/her">she/her</option>
                            <option value="they/them">they/them</option>
                            <option value="other">other</option>
                        </select>
                </div>
                <div> 
                    
                </div>
                
                <div>
                    <label for="graduationClass">Class:</label>
                    <select name="graduationYear">
                        <option id="firstYear" value="First Year">First Year</option>
                        <option id="secondYear" value="Second Year">Second Year</option>
                        <option id="thirdYear" value="Third Year">Third Year</option>
                        <option id="fourthYear" value="Fourth Year">Fourth Year</option>
                        <option id="graduateStudent" value="Graduate/PhD">Graduate/PhD</option>
                    </select>
                </div>

                <div>
                    <label for="Housing Preference">I want to live:</label>
                    <select name="housingPrefs">
                        <option id="onCampus" value="onCampus">On Campus</option>
                        <option id="offCampus" value="offCampus">Off Campus</option>
                    </select>
                </div>

                <input id="major" type="text" placeholder="Major"></input>
            </div>
            <div className="RoomingPrefs">
                Please check all that apply:
                <div>I am:
                    <input type="checkbox" id="q1"></input>
                    <label for="q1">a “night owl”</label>
                    <input type="checkbox" id="q2"></input>
                    <label for="q2">an ”early bird”</label>
                    <input type="checkbox" id="q3"></input>
                    <label for="q3">a heavy sleeper</label>
                    <input type="checkbox" id="q4"></input>
                    <label for="q4">a light sleeper</label>
                    <input type="checkbox" id="q5"></input>
                    <label for="q5">an introvert</label>
                    <input type="checkbox" id="q6"></input>
                    <label for="q6">an extrovert</label>
                    <input type="checkbox" id="q7"></input>
                    <label for="q7">On Campus Housing</label>
                    <input type="checkbox" id="q8"></input>
                    <label for="q8">emotional/sensitive</label>
                </div>
            </div>
            <div className="MoreAboutYou">
                Please check all that apply:
                <div>My hobbies include:
                    <input type="checkbox" id="q1"></input>
                    <label for="q1">sports</label>
                    <input type="checkbox" id="q2"></input>
                    <label for="q2">art</label>
                    <input type="checkbox" id="q3"></input>
                    <label for="q3">reading</label>
                    <input type="checkbox" id="q4"></input>
                    <label for="q4">gaming</label>
                </div>
                <div>My personality can be described as:
                    <input type="checkbox" id="q1"></input>
                    <label for="q1">party animal</label>
                    <input type="checkbox" id="q2"></input>
                    <label for="q2">bookworm</label>
                </div>
            </div>
            
            <input id="bio" type="text" placeholder="Bio"></input>
            <input type="submit" value="Submit"></input>
        </form>
        // <FormControl sx={{m : 1, width : 200}}>
        //                 <InputLabel id="demo-simple-select-label">graduationYear</InputLabel>
        //                     <Select
        //                     labelId="demo-simple-select-label"
        //                     id="demo-simple-select"
        //                     value={year}
        //                     label="graduationClass"
        //                     onChange={handleChange}
        //                     >
        //                     <MenuItem value={10}>First Year</MenuItem>
        //                     <MenuItem value={20}>Second Year</MenuItem>
        //                     <MenuItem value={30}>Thrid Year</MenuItem>
        //                     <MenuItem value={40}>Fourth Year</MenuItem>
        //                     <MenuItem value={50}>Graduate/Phd</MenuItem>
        //                 </Select>
        // </FormControl>
    );
};

export default Form;