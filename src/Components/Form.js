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
import ResponsiveAppBar from './Appbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import LinearWithValueLabel from './ProgressBar';

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

const hobbiesList = [
    'sports',
    'art',
    'reading',
    'gaming'

];

const personalityList = [
    'part animal',
    'bookworm',
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

    const [perfer, setPerfers] = React.useState([]);
    const handleChangePerfers = (event) => {
        const {
        target: { value },
        } = event;
        setPerfers(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [place, setPlace] = React.useState('');
    const handleChangeLocation = (event) => {
        setPlace(event.target.value);
    }

    const [hobbies, setHobbies] = React.useState([]);
    const handleChangeHobbies = (event) => {
        const {
        target: { value },
        } = event;
        setHobbies(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [personality, setPersonality] = React.useState([]);
    const handleChangePersonality = (event) => {
        const {
        target: { value },
        } = event;
        setPersonality(
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
                <ResponsiveAppBar/>
            </Grid>
            <Grid item xs = {7}>
               <LinearWithValueLabel/>
            </Grid>
            <Grid 
                item xs = {10}
            >  
                
                <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                    m: 1,
                    width: 1000,
                    minHeight: 200,
                    },
                }}
                >
                    <Paper variant="outlined" >
                        <Box sx={{m: 1, }}>
                            <div
                            style={{
                                fontSize: 35,
                                textAlign: "left",
                                fontWeight: "lighter",
                            }}
                            >   
                                {"Basic Information"}
                            </div>
                        </Box>

                        <Box sx={{
                            '& > :not(style)': { m: 1, width: 200 }
                        }}>
                            <TextField id="fName" label="First Name" variant="outlined" />
                            <TextField id="lName" label="Last Name" variant="outlined" />
                        </Box>

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width : 200}}>
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
                            <FormControl sx={{ width : 200}}>
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

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width : 200}}>
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

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width: 300 }}>
                                <InputLabel id="room-perfers-chip-label">I am</InputLabel>
                                <Select
                                labelId="room-perfers-chip-label"
                                id="room-perfer-chip"
                                multiple
                                value={perfer}
                                onChange={handleChangePerfers}
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
                                    style={getStyles(name, attributes, theme)}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>Please check all that apply</FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width : 200}}>
                                <InputLabel id="location">I want to live</InputLabel>
                                    <Select
                                    labelId="location-select-label"
                                    id="location-select"
                                    value={place}
                                    label="locationClass"
                                    onChange={handleChangeLocation}
                                    >
                                    <MenuItem value={10}>On Campus</MenuItem>
                                    <MenuItem value={20}>Off Campus</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{
                            '& > :not(style)': { m: 1, width: 200 }
                        }}>
                            <TextField id="Major" label="Major" variant="outlined" />
                        </Box>

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width: 300 }}>
                                <InputLabel id="hobbie-chip-label">My hobbies</InputLabel>
                                <Select
                                labelId="hobbie-chip-label"
                                id="hobbie-chip"
                                multiple
                                value={hobbies}
                                onChange={handleChangeHobbies}
                                input={<OutlinedInput id="select-hobbie-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {hobbiesList.map((name) => (
                                    <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, hobbiesList, theme)}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>Please check all that apply</FormHelperText>
                            </FormControl>
                        </Box>

                        <Box sx = {{m: 1}}>
                            <FormControl sx={{width: 300 }}>
                                <InputLabel id="personality-chip-label">My personality can be described as</InputLabel>
                                <Select
                                labelId="personality-chip-label"
                                id="personality-chip"
                                multiple
                                value={personality}
                                onChange={handleChangePersonality}
                                input={<OutlinedInput id="select-personality-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {personalityList.map((name) => (
                                    <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personalityList, theme)}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                                <FormHelperText>Please check all that apply</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box sx = {{m:1, width: 300}}>
                            <TextField id="outlined-basic" label="Enter a short bio about yourself" variant="outlined" />
                            
                        </Box>
                        <Box sx = {{m:1, width: 300}}>
                            <Button variant="contained">Submit</Button>
                        </Box>
                        

                    </Paper>
                </Box>
                   
            </Grid>

            
                
            


            <Grid item xs = {12}>
            

        
            
        </Grid>
            
        
        
    </Grid>
    );
};

export default Form;