import * as React from 'react';
import { useEffect, useState } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input'
import FormControlLabel from '@mui/material/FormControlLabel';
import '../CSS/form.css';
import storage  from '../utilities/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";



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
    'liberal',
    'conservative',
    'spontaneous',
];

const hobbiesList = [
    'Arts and Crats',
    'Cooking',
    'Dancing ',
    'Food',
    'Gardening',
    'Health and Fitness',
    'Music',
    'Other',
    'Pets',
    'Photography',
    'Reading',
    'Socializing',
    'Sports',
    'Technology',
    'Travel',
    'Video Games',
    'Writing'
];

const personalityList = [
    'party animal',
    'bookworm',
];

const housingList = [
    'Suite on Campus',
    'Dorm on Campus',
    'Apartment',
    'House off Campus'
]

const Form = ({ setDisplayPage }) => {
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

    const [accomodation, setAccomodation] = React.useState('');
    const handleChangeAccomodation = (event) => {
        setAccomodation(event.target.value);
    }

    const [loct, setNorthSouth] = React.useState('');
    const handleChangeLocation = (event) => {
        setNorthSouth(event.target.value);
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

    const [dealBreakers, setDealBreakers] = React.useState({
        isSmoker: false, 
        isDrinker: false,
        ownRoom: false,
        diffSexes: false,
        isPetOwner: false,
        isMusician: false,
        hasPartnerOver: false,
        hasGuestsOver: false,
        hasExcessivePossessions: false
    });

    const [personal, setPersonal] = React.useState({
        smoker: false, 
        drinker: false,
        sharedRoom: false,
        petOwner: false,
        musician: false,
        partnerOver: false,
        guestsOver: false,
        excessivePossessions: false
    });
      
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDealBreakers({
        ...dealBreakers,
        [event.target.name]: event.target.checked,
        });
    };

    const handleChangePersonal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonal({
        ...personal,
        [event.target.name]: event.target.checked,
        });
    };
    
    const { smoker, drinker, sharedRoom, petOwner, musician, partnerOver, guestsOver, excessivePossessions } = personal;
    const { isSmoker, isDrinker, ownRoom, diffSexes, isPetOwner, isMusician, hasPartnerOver, hasGuestsOver, hasExcessivePossessions } = dealBreakers;

    const [image , setImage] = useState(null);
    const [upload , setUpload] = useState(false);

    const uploadImage = () => {
        setUpload(!upload)
    };
    
    useEffect(() => {
        if(image == null)
          return;
        uploadBytes(ref(storage, `/images/${image.name}`), image).then((snapshot) => {
            console.log("Image uploaded!")
            // setDisplayPage('Matches');
        });
        setDisplayPage('Matches');
        // storage.ref(`/images/${image.name}`).put(image)
        // .on("state_changed" , alert("success") , alert);
        // add a line to save the image name in the profile json so it can be pulled easily

    }, [upload]);

    // https://stackoverflow.com/questions/28822054/firebase-how-to-generate-a-unique-numeric-id-for-key

    return (
        <div id="formContainer">
            <p id="formNote">
                <b>Note:</b> Roomate matches will be created based on your responses to this form. It is important that all information is accurate and honest.
            </p>
            <Grid 
                container 
                columnSpacing={{ xs: 2}}
                rowSpacing={4}
                justifyContent="center"
                alignItems="center"
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

                                        <Grid item xs = {12} w={1}>
                                            <TextField 
                                                fullWidth
                                                id="emailaddressfield"
                                                label="Email"
                                                helperText="A Northwestern Email is required to use our service."
                                            /> 
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
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="location-select-label">I want to live</InputLabel>
                                                <Select
                                                labelId="location-select-label"
                                                id="location-select"
                                                value=""
                                                label="I want to live"
                                                onChange={handleChangeLocation}
                                                >
                                                    <MenuItem value={10}>North</MenuItem>
                                                    <MenuItem value={20}>South</MenuItem>
                                                    <MenuItem value={30}>Somewhere in Between</MenuItem>
                                                </Select>
                                            <FormHelperText>Location Preferences</FormHelperText>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs = {6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="campus-select-label">I want to live in a</InputLabel>
                                                <Select
                                                labelId="campus-select-label"
                                                id="campus-select"
                                                //add a state "place"
                                                value=""
                                                label="I want to live in a"
                                                onChange={handleChangeAccomodation}
                                                >
                                                    <MenuItem value={10}>Suite On Campus</MenuItem>
                                                    <MenuItem value={20}>Dorm On Campus</MenuItem>
                                                    <MenuItem value={30}>Apartment Off Campus</MenuItem>
                                                    <MenuItem value={40}>House Off Campus</MenuItem>
                                                </Select>
                                            <FormHelperText>Housing Type</FormHelperText>
                                        </FormControl>


                                    </Grid>

                                </Grid>

                                
                                

                            </Paper>
                    </Grid>
                    <Grid item xs = {10} md = {12} style={{height:'100%'}}>
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
                                                {"More About Me"}
                                            </div>
                                        </Grid>
                                        
                                        <Grid item xs = {4} w={1}>
                                            <FormControl sx={{width: 1 }}>
                                                <InputLabel id="room-perfers-chip-label">I am</InputLabel>
                                                <Select
                                                labelId="room-perfers-chip-label"
                                                id="room-perfer-chip"
                                                multiple
                                                value={perfer}
                                                onChange={handleChangePerfers}
                                                input={<OutlinedInput id="select-room-perfers-chip" label="I am" />}
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

                                    

                                        <Grid item xs = {4} w={1}>
                                            <FormControl sx={{width: 1 }}>
                                                <InputLabel id="hobbie-chip-label">My hobbies</InputLabel>
                                                <Select
                                                labelId="hobbie-chip-label"
                                                label="My hobbies"
                                                id="hobbie-chip"
                                                multiple
                                                value={hobbies}
                                                onChange={handleChangeHobbies}
                                                input={<OutlinedInput id="select-hobbie-chip" label="My hobbies" />}
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

                                        <Grid item xs = {4} w={1}>
                                            <FormControl sx={{width: 1 }}>
                                                <InputLabel id="personality-chip-label" label="My personality can be described as">My personality can be described as</InputLabel>
                                                <Select
                                                labelId="personality-chip-label"
                                                label="My personality can be described as"
                                                id="personality-chip"
                                                multiple
                                                value={personality}
                                                onChange={handleChangePersonality}
                                                input={<OutlinedInput id="select-personality-chip" label="My personality can be described as" />}
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

                                        <Grid item xs = {6} w={2}>
                                            <TextField fullWidth id="outlined-basic" label="Enter a short bio about yourself" variant="outlined" />
                                        </Grid>

                                        <Box sx={{ display: 'flex' }}>
                                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Please check all that apply </FormLabel>
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={smoker} onChange={handleChangePersonal} name="smoker" />
                                                    }
                                                    label="I am a smoker"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={drinker} onChange={handleChangePersonal} name="drinker" />
                                                    }
                                                    label="I am a drinker (alcohol)"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={sharedRoom} onChange={handleChangePersonal} name="sharedRoom" />
                                                    }
                                                    label="I want to share a bedroom"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={petOwner} onChange={handleChangePersonal} name="petOwner" />
                                                    }
                                                    label="I am a pet owner"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={musician} onChange={handleChangePersonal} name="musician" />
                                                    }
                                                    label="I practice instruments often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={partnerOver} onChange={handleChangePersonal} name="partnerOver" />
                                                    }
                                                    label="I have my partner over often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={guestsOver} onChange={handleChangePersonal} name="guestsOver" />
                                                    }
                                                    label="I have guests over often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={excessivePossessions} onChange={handleChangePersonal} name="excessivePossessions" />
                                                    }
                                                    label="My possesions occupy a lot of space"
                                                />
                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>
                                            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Deal Breakers: Please check all that apply</FormLabel>
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isSmoker} onChange={handleChange} name="isSmoker" />
                                                    }
                                                    label="I will NOT live with someone who smokes"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isDrinker} onChange={handleChange} name="isDrinker" />
                                                    }
                                                    label="I will NOT live with someone who drinks"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={ownRoom} onChange={handleChange} name="ownRoom" />
                                                    }
                                                    label="I will NOT live in a shared a bedroom"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={diffSexes} onChange={handleChange} name="diffSexes" />
                                                    }
                                                    label="I will NOT live with roomates of a different sex"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isPetOwner} onChange={handleChange} name="isPetOwner" />
                                                    }
                                                    label="I will NOT live with a pet owner"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isMusician} onChange={handleChange} name="isMusician" />
                                                    }
                                                    label="I will NOT live with someone who plays an instrument"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={hasPartnerOver} onChange={handleChange} name="hasPartnerOver" />
                                                    }
                                                    label="I will NOT live with somene who has their partner over often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={hasGuestsOver} onChange={handleChange} name="hasGuestsOver" />
                                                    }
                                                    label="I will NOT live with somene who has guests over often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={hasExcessivePossessions} onChange={handleChange} name="hasExcessivePossessions" />
                                                    }
                                                    label="I will NOT live with somene who has excessive possesions"
                                                />
                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                </Grid>

                <Grid>
                    <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    <button onClick={uploadImage}>Upload Profile Image</button>
                </Grid>

                <Grid item xs = {3} w={1}>
                    <Button w={1} variant="contained" sx = {{
                        width: 1,
                        minHeight: "48px",
                        fontWeight: 700,
                        fontSize: "16px",
                        whiteSpace: 'nowrap',
                        textAlign: 'center'
                        }}
                        onClick={() => {
                            uploadImage();
                        }}>Match Me!</Button>
                    <img id="myimg"></img>
                </Grid>
            </Grid>
            
        </div>
    );
};

export default Form;