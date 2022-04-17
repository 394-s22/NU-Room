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
import AddIcon from "@mui/icons-material/AddAPhoto";
import GeoLocation from "./GeoLocation";
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

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
    'shy',
    'outgoing',
    'I like to try new things',
    'I don\'t like change',
    'I like to have everything planned',
    'I like to live without a schedule',
    'I care how others think about me',
    'I am not intrested in people I don\'t know',
    'I\'m always stressed',
    'I deal with stress well'
];

const housingList = [
    'Suite on Campus',
    'Dorm on Campus',
    'Apartment',
    'House off Campus'
]

const importanceMarks = [
    {
      value: 0,
      label: "Not At All",
    },
    {
      value: 25,
      label: 'Not Very',
    },
    {
      value: 50,
      label: 'Somewhat',
    },
    {
      value: 75,
      label: 'Very',
    },
    {
        value: 100,
        label: 'Extremely',
    },
  ];

  const dailyMarks = [
    {
      value: 0,
      label: "Every Day",
    },
    {
      value: 25,
      label: 'Few Times A Week',
    },
    {
      value: 50,
      label: 'On Weekends',
    },
    {
      value: 75,
      label: 'Once A Week',
    },
    {
        value: 100,
        label: 'Every Other Week',
    },
  ];

const weeklyMarks = [
    {
      value: 0,
      label: "Never",
    },
    {
      value: 25,
      label: 'Daily',
    },
    {
      value: 50,
      label: 'Weekly',
    },
    {
      value: 75,
      label: 'BiWeekly',
    },
    {
        value: 100,
        label: 'Monthly',
    },
  ];
  
function valuetext(value) {
    return `${value}°C`;
}

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
    const enabled = true
    const [accomodation, setAccomodation] = React.useState('');
    const handleChangeAccomodation = (event) => {
        setAccomodation(event.target.value);
        if (event.target.value == "Dorm On Campus" || event.target.value == "Suite On Campus") {
            setDormTrue(true);
        } else if (event.target.value == "House Off Campus" || event.target.value == "Apartment Off Campus") {
            setDormTrue(false);
        }
    }

    

    const [dormTrue, setDormTrue] = React.useState(false);
    const [cleaningLevel, setCleaningLevel] = React.useState(true);
    const [instrumentPracticeLevel, setInstrumentPracticeLevel] = React.useState(true);

    const handleCleaningLevel = (event) => {
        if (event.target.value != 0) {
            setCleaningLevel(false);
        } else {
            setCleaningLevel(true);
        }
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

    const [expectations, setExpectations] = React.useState({
        weeklyCleanRoom: false,
        biweeklyCleanRoom: false,
        monthlyCleanRoom: false, 
        noisyBackground: false, 
        quietBackground: false,
        warmRoom: false,
        coldRoom: false,
        friendRoommate: false,
        strangerRoommate: false
    });

    const [fname, setfName] = React.useState("");
    const [lname, setlName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const handleChangefName= (event: React.ChangeEvent<HTMLInputElement>) => {
        setfName(event.target.value);
    };

    const handleChangelName= (event: React.ChangeEvent<HTMLInputElement>) => {
        setlName(event.target.value);
    };

    const handleChangeEmail= (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
      
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
        console.log(event.target.checked)
        if (event.target.checked == true || event.target.checked == undefined) {
            setInstrumentPracticeLevel(false);
        } else {
            setInstrumentPracticeLevel(true);
        }
    };

    const handleChangeExpectations = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpectations({
        ...expectations,
        [event.target.name]: event.target.checked,
        });
    };
    
    const { smoker, drinker, sharedRoom, petOwner, musician, partnerOver, guestsOver, excessivePossessions } = personal;
    const { isSmoker, isDrinker, ownRoom, diffSexes, isPetOwner, isMusician, hasPartnerOver, hasGuestsOver, hasExcessivePossessions } = dealBreakers;
    const { weeklyCleanRoom, biweeklyCleanRoom, monthlyCleanRoom, noisyBackground, quietBackground, warmRoom, coldRoom, friendRoommate, strangerRoommate} = expectations;

    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    

    const [image , setImage] = useState(null);
    const [upload , setUpload] = useState(false);

    const uploadData = () => {
        setUpload(!upload)
    };

    useEffect(() => {
        const userData = {};

        // TODO: Display error message if REQUIRED Fields 
        // are left blank

        userData["basicInfo"] = {
            fname: fname,
            lname: lname,
            email: email
        }

        userData["housingPrefs"] = {
            location: loct,
            accomodation: accomodation
        };

        // Uploads Image
        if(image == null) {
            userData["profileImage"] = "DefaultProfilePicture";
        } else {
            const imageName = fname + lname + Math.floor(Math.random() * 1000000);
            uploadBytes(ref(storage, `/images/${imageName}`), image).then((snapshot) => {
                console.log("Image uploaded!")
            });
            userData["profileImage"] = imageName;
        }
        
        // setDisplayPage('Matches');
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
                                            <TextField fullWidth id="fName" label="First Name" value={fname} onChange={handleChangefName} variant="outlined"  w={1}/>
                                        </Grid>

                                        <Grid item xs = {6}>
                                            <TextField fullWidth id="lName" label="Last Name" value={lname} onChange={handleChangelName} variant="outlined" />
                                        </Grid>

                                        <Grid item xs = {12} w={1}>
                                            <TextField 
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                helperText="A Northwestern Email is required to use our service."
                                                value={email}
                                                onChange={handleChangeEmail}
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

                                    <Grid item xs = {12} md={6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="location-select-label">I want to live</InputLabel>
                                                <Select
                                                labelId="location-select-label"
                                                id="location-select"
                                                value={loct}
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

                                    <Grid item xs = {12} md={6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="campus-select-label">I want to live in a</InputLabel>
                                                <Select
                                                labelId="campus-select-label"
                                                id="campus-select"
                                                //add a state "place"
                                                value={accomodation}
                                                label="I want to live in a"
                                                onChange={handleChangeAccomodation}
                                                >

                                                    <MenuItem value={10}>Suite on Campus</MenuItem>
                                                    <MenuItem value={20}>Dorm on Campus</MenuItem>
                                                    <MenuItem value={30}>Apartment off Campus</MenuItem>
                                                    <MenuItem value={40}>House off Campus</MenuItem>

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
                                        <Grid 
                                        item xs = {12} w={1} pb = {2}>
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
                                        
                                        <Grid item xs = {12} p = {1}>
                                            <Grid w={1} pb = {2}
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            >
                                            <Grid item xs = {12} w={1} pb = {2} md = {4}>
                                            <FormControl sx={{ m: 3, pb: 10 }} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Please check all that apply: </FormLabel>
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
                                                    disabled = {dormTrue}
                                                    control={
                                                    <Checkbox checked={sharedRoom} onChange={handleChangePersonal} name="sharedRoom" />
                                                    }
                                                    label="I want to share a bedroom"
                                                />
                                                <FormControlLabel
                                                    disabled = {dormTrue}
                                                    control={
                                                    <Checkbox checked={petOwner} onChange={handleChangePersonal} name="petOwner" />
                                                    }
                                                    label="I am a pet owner"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={musician} onChange={handleChangePersonal} name="musician" />
                                                    }
                                                    label="I practice instruments"
                                                />
                                                <Typography id = "cleaning-slider" gutterBottom>Instrument Practice Frequency</Typography>
                                                <Slider
                                                disabled = {instrumentPracticeLevel}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="cleaning-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={dailyMarks}
                                                onChange={handleChangePersonal}
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
                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>
                                            </Grid>
                                            <Grid item xs = {12} w={1} pb = {2} md = {4}>
                                            <FormControl sx={{ m: 3, pb: 10}} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Please check all that apply: <b>I will NOT</b> </FormLabel>
                                                
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isSmoker} onChange={handleChange} name="isSmoker" />
                                                    }
                                                    label="live with someone who smokes"
                                                />
                                                <Typography id = "cleaning-slider" gutterBottom>Cleaning Importance</Typography>
                                                <Slider
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="cleaning-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={importanceMarks}
                                                onChange={handleCleaningLevel}
                                                />
                                                 <Typography id = "cleaning-slider" gutterBottom>Cleaning Frequency</Typography>
                                                <Slider
                                                disabled = {cleaningLevel}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="cleaning-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={weeklyMarks}
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isDrinker} onChange={handleChange} name="isDrinker" />
                                                    }
                                                    label="live with someone who drinks"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={ownRoom} onChange={handleChange} name="ownRoom" />
                                                    }
                                                    label="live in a shared a bedroom"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={diffSexes} onChange={handleChange} name="diffSexes" />
                                                    }
                                                    label="live with roomates of a different sex"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isPetOwner} onChange={handleChange} name="isPetOwner" />
                                                    }
                                                    label="live with a pet owner"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isMusician} onChange={handleChange} name="isMusician" />
                                                    }
                                                    label="live with someone who plays an instrument"
                                                />
                                                <Typography id = "cleaning-slider" gutterBottom>Cleaning Frequency</Typography>
                                                <Slider
                                                disabled = {cleaningLevel}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="cleaning-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={weeklyMarks}
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={hasPartnerOver} onChange={handleChange} name="hasPartnerOver" />
                                                    }
                                                    label="live with somene who has their partner over often"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={hasGuestsOver} onChange={handleChange} name="hasGuestsOver" />
                                                    }
                                                    label="live with somene who has guests over often"
                                                />
                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>
                                            </Grid>
                                            <Grid item xs = {12} w={1} md = {4}>
                                            <FormControl sx={{ m: 10}} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Please check all that apply: <b>I expect</b> </FormLabel>
                                                
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={weeklyCleanRoom} onChange={handleChangeExpectations} name="weeklyCleanRoom" />
                                                    }
                                                    label="to clean the room weekly"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={biweeklyCleanRoom} onChange={handleChangeExpectations} name="biweeklyCleanRoom" />
                                                    }
                                                    label="to clean the room biweekly"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={monthlyCleanRoom} onChange={handleChangeExpectations} name="monthlyCleanRoom" />
                                                    }
                                                    label="to clean the room monthly"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={noisyBackground} onChange={handleChangeExpectations} name="noisyBackground" />
                                                    }
                                                    label="to have background noise/music when working"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={quietBackground} onChange={handleChangeExpectations} name="quietBackground" />
                                                    }
                                                    label="the room to be quiet when working"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={warmRoom} onChange={handleChangeExpectations} name="warmRoom" />
                                                    }
                                                    label="the room to be on the warm side"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={coldRoom} onChange={handleChangeExpectations} name="coldRoom" />
                                                    }
                                                    label="the room to be on the cool side"
                                                />
                                                </FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={friendRoommate} onChange={handleChangeExpectations} name="friendRoommate" />
                                                    }
                                                    label="to be friends with my roommate"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={strangerRoommate} onChange={handleChangeExpectations} name="strangerRoommate" />
                                                    }
                                                    label="to never hang out with my roommate"
                                                />
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>        
                                            </Grid>
                                            </Grid>
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
                                        
                                        <Grid item xs = {12} md={4} w={1}>
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


                                        <Grid item xs = {12} md={4} w={1}>
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

                                        <Grid item xs = {12} md={4} w={1}>
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
                                        <Grid item xs = {12} md={4} w={1}>
                                            <GeoLocation
                                                locationTitle="Country"
                                                isCountry
                                                onChange={setCountry}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs = {12} md={4} w={1}>
                                            <GeoLocation
                                                locationTitle="State"
                                                onChange={setState}
                                                geoId={country}
                                            />
                                            </Grid>
                                        <Grid item xs = {12} md={4} w={1}>
                                            <GeoLocation
                                                locationTitle="County"
                                                onChange={setCity}
                                                geoId={state}
                                            />
                                        </Grid>
                                        

                                        

                                        <Grid item xs = {2} w={2} md = {6}> 
                                            <TextField  
                                            multiline
                                            id="outlined-basic" 
                                            label="What are you looking for?" 
                                            rows={5}
                                            sx={{width : {xs: 280, md: 500}}}
                                            maxRows={10}
                                            variant="outlined" />
                                            
                                        </Grid>

                                       

                                        
                                    </Grid>
                                </Paper>
                    </Grid>
                </Grid>
                    

                </Grid>
                
                <Grid item xs={4}>
                    <Stack 
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        
                        <label for="profile-image">
                            <Button 
                                variant="contained" 
                                component="label" 
                                color="primary"
                                sx={{
                                    textAlign: 'center'
                                }}>
                                {" "}
                                <AddIcon />  Upload profile image
                                <input accept="image/*" type="file" hidden onChange={(e)=>{setImage(e.target.files[0])}}/>
                            </Button>   
                        </label>
                        
                        
                        
                    
                    <Divider variant="middle" />
                    
                    <Button w={1} variant="contained" sx = {{
                        width: 300,
                        minHeight: "48px",
                        fontWeight: 700,
                        fontSize: "16px",
                        whiteSpace: 'nowrap',
                        textAlign: 'center'
                        
                        }}
                        onClick={() => {
                            uploadData();
                        }}>Match Me!</Button>
                    <img id="myimg"></img>
                    

                    </Stack>                                       
                </Grid>
            </Grid>
            
        </div>
    );
};

export default Form;