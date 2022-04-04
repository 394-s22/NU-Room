import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';
import { setData } from "../utilities/firebase";
import PrimarySearchAppBar from './Appbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(p, perfers, theme) {
    return {
      fontWeight:
        perfers.indexOf(p) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

const attributes = [
    'a “night owl”',
    'an ”early bird”',
    'a heavy sleeper',
    'a light sleeper',
    'an introvert',
    'an extrovert',
    'On Campus Housing',
    'emotional/sensitive',
    
  ];

const Form = () => {
    const theme = useTheme();
    const [year, setYear] = React.useState('');
    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };


    const [gender, setGender] = React.useState('');
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const [pronouns, setPronouns] = React.useState('');
    const handleChangePronouns = (event) => {
        setPronouns(event.target.value);
    }

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const uploadProfile = () => {
        
    };


    return (
        <Grid 
            container spacing = {2}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item xs = {12}>
                <PrimarySearchAppBar/>
            </Grid>
            <Grid 
                item xs = {4}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                
            >
                <TextField id="fName" label="First Name" variant="outlined" />
                <TextField id="lName" label="Last Name" variant="outlined" />
                
                <Box sx = {{m: 1}}>
                    <FormControl sx={{ml : 20, width : 200}}>
                        <InputLabel id="gender">Gender</InputLabel>
                            <Select
                            labelId="gender-select-label"
                            id="gender-select"
                            value={gender}
                            label="genderClass"
                            onChange={handleChangeGender}
                            >
                            <MenuItem value={10}>Male</MenuItem>
                            <MenuItem value={20}>Female</MenuItem>
                        </Select>
                    </FormControl> 
                </Box>

                <Box sx = {{m: 1}}>
                    <FormControl sx={{ml : 20, width : 200}}>
                        <InputLabel id="pronouns">Pronouns</InputLabel>
                            <Select
                            labelId="pronouns-select-label"
                            id="pronouns-select"
                            value={pronouns}
                            label="pronounsClass"
                            onChange={handleChangePronouns}
                            >
                            <MenuItem value={10}>he/him</MenuItem>
                            <MenuItem value={20}>she/her</MenuItem>
                            <MenuItem value={30}>they/them</MenuItem>
                            <MenuItem value={40}>other</MenuItem>
                        </Select>
                    </FormControl> 
                </Box>

                <Box>
                    <FormControl sx={{ml : 20, width : 200}}>
                        <InputLabel id="graduation">graduationYear</InputLabel>
                            <Select
                            labelId="graduation-year-select-label"
                            id="graducation-year-select"
                            value={year}
                            label="graduationClass"
                            onChange={handleChangeYear}
                            >
                            <MenuItem value={10}>First Year</MenuItem>
                            <MenuItem value={20}>Second Year</MenuItem>
                            <MenuItem value={30}>Thrid Year</MenuItem>
                            <MenuItem value={40}>Fourth Year</MenuItem>
                            <MenuItem value={50}>Graduate/Phd</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box>
                    <FormControl sx={{ ml: 14, width: 300 }}>
                        <InputLabel id="room-perfers-chip-label">I am</InputLabel>
                        <Select
                        labelId="room-perfers-chip-label"
                        id="room-perfer-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-room-perfers-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                        >
                        {attributes.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                        <FormHelperText>Please check all that apply</FormHelperText>
                    </FormControl>
                </Box>
                
                
            </Grid>

            
                
            


            <Grid item xs = {12}>
            
                
                <div className="BasicInfo">
                    
                    <div>
                        
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
        
            
        </Grid>
            
        
        
    </Grid>
    );
};

export default Form;