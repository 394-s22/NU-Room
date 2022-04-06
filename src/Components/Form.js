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
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
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
    'emotional/sensitive',
    
  ];

const hobbiesList = [
    'sports',
    'art',
    'reading',
    'gaming'

];

const personalityList = [
    'party animal',
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
            container 
            columnSpacing={{ xs: 2}}
            rowSpacing={4}
            justifyContent="center"
            alignItems="center"
            paddingTop={4}
            paddingBottom={4}
        >
            
            <Grid item xs = {12} md = {10} >
                <Grid 
                    container columnSpacing={{ xs: 2}}
                    justifyContent="center"
                    direction="row"
                    alignItems="stretch"
                    rowSpacing={3}
                >
                    <Grid item xs = {10} md = {6} style={{height:'100%'}}>
                        <Paper variant="outlined" style={{height:'100%'}}>

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="stretch"
                                spacing={3}
                                padding={3}
                                sx ={{height: "100%",}}
                            >
                                    <Grid item xs = {12} w={1} >
                                        <div
                                            style={{
                                                fontSize: 35,
                                                textAlign: "left",
                                                fontWeight: "lighter",
                                            }}
                                            >   
                                            {"Basic Information"}
                                        </div>
                                    </Grid>

                                    <Grid item xs = {6} w={1}>
                                        <TextField fullWidth id="fName" label="First Name" variant="outlined" w={1}/>
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <TextField fullWidth id="lName" label="Last Name" variant="outlined" />
                                    </Grid>

                                    <Grid item xs = {6} w={1}>
                                        <FormControl fullWidth sx={{width : 1}}>
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
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <FormControl sx={{ width : 1}}>
                                            <InputLabel fullWidth id="pronouns">Pronouns</InputLabel>
                                                <Select
                                                labelId="pronouns-select-label"
                                                id="pronouns-select"
                                                value={pronouns}
                                                label="pronounsClass"
                                                onChange={handleChangePronouns}
                                                >
                                                <MenuItem value={10}>He/him</MenuItem>
                                                <MenuItem value={20}>She/her</MenuItem>
                                                <MenuItem value={30}>They/them</MenuItem>
                                                <MenuItem value={40}>Other</MenuItem>
                                            </Select>
                                        </FormControl> 
                                    </Grid>
                                    
                                    <Grid item xs = {6}>
                                        <TextField fullWidth id="Major" label="Major" variant="outlined" />
                                    </Grid>

                                    <Grid item xs = {6}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="graduation">Year</InputLabel>
                                                <Select
                                                labelId="graduation-year-select-label"
                                                id="graducation-year-select"
                                                value={year}
                                                label="graduationClass"
                                                onChange={handleChangeYear}
                                                >
                                                <MenuItem value={10}>First Year</MenuItem>
                                                <MenuItem value={20}>Second Year</MenuItem>
                                                <MenuItem value={30}>Third Year</MenuItem>
                                                <MenuItem value={40}>Fourth Year</MenuItem>
                                                <MenuItem value={50}>Graduate/PhD</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>                                

                            </Grid>

                        </Paper>
                    </Grid>

                    <Grid item xs = {10} md = {6} style={{height:'100%'}} >

                        <Paper variant="outlined" >

                        
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={3}
                                padding={3}
                            >
                                <Grid item xs = {12} w={1}>
                                    <div
                                        style={{
                                            fontSize: 35,
                                            textAlign: "left",
                                            fontWeight: "lighter",
                                        }}
                                        >   
                                        {"Housing Preferences"}
                                    </div>
                                </Grid>

                                <Grid item xs = {6} w={1}>
                                    <FormControl sx={{width: 1 }}>
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
                                </Grid>

                                <Grid item xs = {6} w={1}>
                                    <FormControl sx={{width : 1}}>
                                        <InputLabel id="location-select-label">I want to live</InputLabel>
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
                                        <FormHelperText>Location Preferences</FormHelperText>
                                    </FormControl>
                                </Grid>

                                <Grid item xs = {6} w={1}>
                                    <FormControl sx={{width: 1 }}>
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
                                </Grid>

                                <Grid item xs = {6} w={1}>
                                    <FormControl sx={{width: 1 }}>
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
                                </Grid>

                                <Grid item xs = {12} w={1}>
                                    <TextField fullWidth id="outlined-basic" label="Enter a short bio about yourself" variant="outlined" />
                                </Grid>

                            </Grid>

                            
                            

                        </Paper>
                    </Grid>
                    
                </Grid>

            </Grid>

            <Grid item xs = {3} w={1}>
                <Button w={1} variant="contained" sx = {{
                    width: 1,
                    minHeight: "48px",
                    fontWeight: 700,
                    fontSize: "16px"
                    }}>Match Me!</Button>

            </Grid>

        </Grid>
    );
};

export default Form;