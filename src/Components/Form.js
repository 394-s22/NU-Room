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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { setData } from "../utilities/firebase";

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

const pronounsList = [
    'He/him',
    'She/her',
    'They/them',
    'Other'
]

const personalityList = [
    'Introverted',
    'Extrovered',
    'I like my alone time',
    'I like to try new things',
    'I don\'t like change',
    'I like to have everything planned',
    'I like to live without a schedule',
    'I am not intrested in people I don\'t know',
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

const toleranceMarks = [
    {
        value: 0,
        label: "Low"
    },
    { 
        value: 50,
        label: "Medium"
    },
    {
        value: 100,
        label: "High"
    },

];
  
function valuetext(value) {
    return `${value}°C`;
}

const Form = ({ setDisplayPage, setLoading }) => {
    const theme = useTheme();
    const [year, setYear] = React.useState('');
    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };


    const [gender, setGender] = React.useState('');
    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };   

    const [sameSexRooming, setSameSexRooming] = React.useState('');
    const handleChangeSameSexRooming = (event) => {
        setSameSexRooming(event.target.value);
    }; 

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
    const [partnerOften, setPartnerOften] = React.useState(false);

    const handleCleaningLevel = (event) => {
        if (event.target.value != 0) {
            setCleaningLevel(false);
        } else {
            setCleaningLevel(true);
        }
    }

    const handleChangePartnerOften = (event) => {
        if (event.target.value != 0) {
            setPartnerOften(false);
        } else {
            setPartnerOften(true);
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

    const [pronouns, setPronouns] = React.useState([]);
    const handleChangePronouns = (event) => {
        const {
        target: { value },
        } = event;
        setPronouns(
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
        isPetOwner: false,
    });

    const [personal, setPersonal] = React.useState({
        smoker: false, 
        drinker: false,
        petOwner: false,
    });


    const [personalCheckBoxes, setPersonalCheckBoxes] = React.useState({
        musician: false,
        partnerOver: false,
        guestsOver: false,
    });

    const [prefCheckBoxes, setPrefCheckBoxes] = React.useState({
        isMusician: false,
        hasPartnerOver: false,
        hasGuestsOver: false,
    });

    const [personalSliders, setPersonalSliders] = React.useState({
        musicianValue: 0,
        partnerOverValue: 0,
        guestsOverValue: 0,
    });

    const [prefSliders, setPrefSliders] = React.useState({
        isMusicianValue: false,
        hasPartnerOverValue: false,
        hasGuestsOverValue: false,
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

    const [shareRoom, setShareRoom] = React.useState(false);
    const handleChangeShareRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShareRoom(event.target.checked);
        console.log(event.target.checked)
        
    };

    const [lookingFor, setLookingFor] = React.useState("");
    const [fname, setfName] = React.useState("");
    const [lname, setlName] = React.useState("");
    const [email, setEmail] = React.useState("");    

    const handleChangeLookingFor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLookingFor(event.target.value);
    };

    const handleChangefName= (event: React.ChangeEvent<HTMLInputElement>) => {
        setfName(event.target.value);
    };

    const handleChangelName= (event: React.ChangeEvent<HTMLInputElement>) => {
        setlName(event.target.value);
    };

    const handleChangeEmail= (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };
      
    const handleChangeDealbreakers = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleChangePersonalCheckBoxes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPersonalCheckBoxes({
        ...personalCheckBoxes,
        [event.target.name]: event.target.checked,
        });
        console.log(personalCheckBoxes);
    };
    const handleChangePersonalSliders = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target);
        setPersonalSliders({
        ...personalSliders,
        [event.target.name]: event.target.value,
        });
    };
    const handleChangePrefCheckBoxes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrefCheckBoxes({
        ...prefCheckBoxes,
        [event.target.name]: event.target.checked,
        });
        console.log(prefCheckBoxes);
    };
    const handleChangePrefSliders = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrefSliders({
        ...prefSliders,
        [event.target.name]: event.target.checked,
        });
        console.log(prefSliders);
    };
    const handleChangeExpectations = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExpectations({
        ...expectations,
        [event.target.name]: event.target.checked,
        });
    };
    
    const { smoker, drinker, petOwner } = personal;
    const { isSmoker, isDrinker, isPetOwner} = dealBreakers;
    const { musician, partnerOver, guestsOver } = personalCheckBoxes;
    const { isMusician, hasPartnerOver, hasGuestsOver } = prefCheckBoxes;
    const { musicianValue, partnerOverValue, guestsOverValue } = personalSliders;
    const { isMusicianValue, hasPartnerOverValue, hasGuestsOverValue } = prefSliders;
    const { weeklyCleanRoom, biweeklyCleanRoom, monthlyCleanRoom, noisyBackground, quietBackground, warmRoom, coldRoom, friendRoommate, strangerRoommate} = expectations;

    const [country, setCountry] = React.useState("");
    const [state, setState] = React.useState("");
    const [city, setCity] = React.useState("");
    

    const [image , setImage] = useState(null);
    const [upload , setUpload] = useState(false);

    const uploadData = () => {
        if (upload === false) {
            setUpload(!upload);
        }
    };

    const [wakeUpTime, setWakeUpTime] = React.useState(null);
    const [bedTime, setBedTime] = React.useState(null);

    useEffect(async () => {
        if (upload === true) {

            setLoading(true);

            const userData = {};
        
            // TODO: Display error message if REQUIRED Fields 
            // are left blank

            userData["basicInfo"] = {
                fname: fname,
                lname: lname,
                email: email,
                gender: gender,
                pronouns: pronouns,
                nextYearGrade: year
            }

            userData["housingPrefs"] = {
                location: loct,
                accomodation: accomodation,
                sameSexRooming: sameSexRooming,
                shareRoom: shareRoom
            };

            userData["aboutMe"] = {
                personal: {...personal},
                personalCheckBoxes: {...personalCheckBoxes},
                personalSliders: {...personalSliders}
            };

            userData["roomingPrefs"] = {
                dealBreakers: {...dealBreakers},
                prefCheckBoxes: {...prefCheckBoxes},
                prefSliders: {...prefSliders}
            };
        
            userData["expectations"] = {
                ...expectations
            };

            userData["moreAboutMe"] = {
                hobbies: hobbies,
                personality: personality,
                background: {
                    country: country,
                    state: state,
                    city: city,
                },
                lookingFor: lookingFor
            };

            // Feel free to change to a better system
            userData["ID"] = Math.floor(Math.random() * 1000000);

            const tryUpload = async () => {
                try {
                    // Upload Image
                    if(image == null) {
                        userData["profileImage"] = "DefaultProfilePicture.jpg";
                    } else {
                        const imageTag = "." + image.name.split(".")[1];
                        const imageName = fname + lname + userData["ID"] + imageTag;
                        uploadBytes(ref(storage, `/images/${imageName}`), image).then((snapshot) => {
                            console.log("Image uploaded!")
                        });
                        userData["profileImage"] = imageName;
                    }
        
                    //upload to firebase
                    setData("/profile/" + userData["ID"], userData);
        
                    //report progress
                    console.log("User data uploaded!");
                    
                    setLoading(false);
                    setDisplayPage('Matches');
                } catch {
                    alert("Upload failed. Please try again.");
                    setLoading(false);
                }
            };
            
            tryUpload();
        }
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

                                    <Grid item xs = {12} md={6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="gender-select-label">Gender</InputLabel>
                                                <Select
                                                labelId="gender-select-label"
                                                id="gender-select"
                                                value={gender}
                                                label="I identify as:"
                                                onChange={handleChangeGender}
                                                >
                                                    <MenuItem value={"Male"}>Male</MenuItem>
                                                    <MenuItem value={"Female"}>Female</MenuItem>
                                                    <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
                                                    <MenuItem value={"Other"}>Other</MenuItem>
                                                </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs = {12} md={6} w={1}>
                                            <FormControl sx={{width: 1 }}>
                                                <InputLabel id="hobbie-chip-label">My pronouns</InputLabel>
                                                <Select
                                                labelId="pronouns-chip-label"
                                                label="My pronouns"
                                                id="pronouns-chip"
                                                multiple
                                                value={pronouns}
                                                onChange={handleChangePronouns}
                                                input={<OutlinedInput id="select-pronouns-chip" label="My pronouns" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={value} />
                                                    ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                                >
                                                {pronounsList.map((name) => (
                                                    <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, pronounsList, theme)}
                                                    >
                                                    {name}
                                                    </MenuItem>
                                                ))}
                                                </Select>
                                                <FormHelperText>Please check all that apply</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                    <Grid item xs = {12} md={6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="year-select-label">Next Year Grade</InputLabel>
                                                <Select
                                                labelId="year-select-label"
                                                id="year-select"
                                                value={year}
                                                label="I identify as:"
                                                onChange={handleChangeYear}
                                                >
                                                    <MenuItem value={"First Year"}>First Year</MenuItem>
                                                    <MenuItem value={"Second Year"}>Second Year</MenuItem>
                                                    <MenuItem value={"Third Year"}>Third Year</MenuItem>
                                                    <MenuItem value={"Fourth Year"}>Fourth Year</MenuItem>
                                                    <MenuItem value={"Grad/PhD"}>Grad/PhD</MenuItem>
                                                </Select>
                                                <FormHelperText>What year will you be next year?</FormHelperText>
                                        </FormControl>
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
                                                    <MenuItem value={"North"}>North</MenuItem>
                                                    <MenuItem value={"South"}>South</MenuItem>
                                                    <MenuItem value={"No preference"}>No preference</MenuItem>
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

                                                    <MenuItem value={"Suite on Campus"}>Suite on Campus</MenuItem>
                                                    <MenuItem value={"Dorm on Campus"}>Dorm on Campus</MenuItem>
                                                    <MenuItem value={"Apartment off Campus"}>Apartment off Campus</MenuItem>
                                                    {/* <MenuItem value={40}>House off Campus</MenuItem> */}

                                                </Select>
                                            <FormHelperText>Housing Type</FormHelperText>
                                        </FormControl>


                                    </Grid>
                                    <Grid item xs = {12} md={6} w={1}>
                                        <FormControl sx={{width : 1}}>
                                            <InputLabel id="same-sex-rooming-select-label">Same sex or Mixed</InputLabel>
                                                <Select
                                                labelId="same-sex-rooming-select-label"
                                                id="same-sex-rooming-select"
                                                value={sameSexRooming}
                                                label="I identify as:"
                                                onChange={handleChangeSameSexRooming}
                                                >
                                                    <MenuItem value={true}>Same Sex</MenuItem>
                                                    <MenuItem value={false}>Mixed Gender</MenuItem>
                                                </Select>
                                                <FormHelperText>Who do you want to live with?</FormHelperText>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs = {12} md={12} w={1}>
                                    <FormControlLabel
                                                    control={
                                                    <Checkbox checked={shareRoom} onChange={handleChangeShareRoom} name="shareRoom" />
                                                    }
                                                    label="I want to share a room with my roommate"
                                                />
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
                                        {"About Me"}
                                    </div>
                                </Grid>
                                
                                <Grid item xs = {12} p = {1}>
                                    
                                    <Grid item xs = {12} w={1} pb = {2} md = {8}>
                                    <FormControl sx={{ m: 3, pb: 10 }} component="fieldset" variant="standard">
                                        <FormLabel component="legend">Please check all that apply: </FormLabel>
                                        <FormGroup row='true'>
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
                                            <Checkbox checked={petOwner} onChange={handleChangePersonal} name="petOwner" />
                                            }
                                            label="I am a pet owner"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox checked={musician} onChange={handleChangePersonalCheckBoxes} name="musician" />
                                            }
                                            label="I practice instruments"
                                        />
                                        <Grid item xs = {10} md = {12} style={{height:'100%'}} sx = {{pl: 4}}>
                                        <Typography id = "cleaning-slider" gutterBottom>Instrument Practice Frequency:</Typography>                            
                                                <Slider
                                                disabled = {!musician}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="cleaning-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={dailyMarks}
                                                onChange={handleChangePersonalSliders} 
                                                name="musicianValue"
                                                />
                                                </Grid>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={partnerOver} onChange={handleChangePersonalCheckBoxes} name="partnerOver" />
                                                    }
                                                    label="I have my partner over often"
                                                />
                                                <Grid item xs = {10} md = {12} style={{height:'100%'}} sx = {{pl: 4}}>
                                                <Typography id = "partner-slider" gutterBottom>Partner Over Frequency:</Typography>
                                                
                                                <Slider
                                                disabled = {!partnerOver}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="partner-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={dailyMarks}
                                                name="partnerOverValue"
                                                onChange={handleChangePersonalSliders} 
                                                />
                                                </Grid>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={guestsOver} onChange={handleChangePersonalCheckBoxes} name="guestsOver" />
                                                    }
                                                    label="I have guests over often"
                                                />
                                                <Grid item xs = {10} md = {12} style={{height:'100%'}} sx = {{pl: 4}}>
                                                <Typography id = "partner-slider" gutterBottom>Partner Over Frequency:</Typography>
                                                
                                                <Slider
                                                disabled = {!guestsOver}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="guest-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={dailyMarks}
                                                name="guestsOverValue"
                                                onChange={handleChangePersonalSliders} 
                                                />
                                                </Grid>

                                                <Grid item xs = {10} md = {4} style={{height:'100%'}} sx = {{pl: 0}} padding={3}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <TimePicker
                                                            label="I wake up around"
                                                            value={wakeUpTime}
                                                            onChange={(newValue) => {
                                                            setWakeUpTime(newValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                <Grid item xs = {10} md = {8} style={{height:'100%'}} sx = {{pl: 0}} padding={3}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <TimePicker
                                                            label="I go to bed around"
                                                            value={bedTime}
                                                            onChange={(newValue) => {
                                                            setBedTime(newValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>

                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>                                
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
                                        <Grid 
                                        item xs = {12} w={1} pb = {2}>
                                            <div
                                                style={{
                                                    fontSize: 35,
                                                    textAlign: "left",
                                                    fontWeight: "lighter",
                                                }}
                                                >   
                                                {"Rooming Preferences"}
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
                                            <FormControl sx={{ m: 3, pb: 10}} component="fieldset" variant="standard">
                                                
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
                        
                                                <FormGroup>
                                            
                                                <Typography id = "cleaning-slider" gutterBottom>Ideally, My roomate and I are </Typography>
                                                <InputLabel id="location-select-label">My roomate and I are </InputLabel>
                                                <Select
                                                labelId="location-select-label"
                                                id="location-select"
                                                value={loct}
                                                label="I want to live"
                                                onChange={handleChangeLocation}
                                                >
                                                    <MenuItem value={0}>Just Roomates</MenuItem>
                                                    <MenuItem value={50}>Friends</MenuItem>
                                                    <MenuItem value={100}>Close Friends</MenuItem>
                                                </Select>
                                            
                                                <Typography id = "cleaning-slider" gutterBottom>Cleaning Frequency</Typography>
                                                <FormHelperText>I would like our shared spaces to be cleaned ...</FormHelperText>
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
                                                
                                                <Typography id = "partner-slider" gutterBottom>Roomate's Partner Visiting Tolerance</Typography>
                                                <FormHelperText>I am not okay OR very okay with my roomate having their partner over</FormHelperText>
                                                <Slider
                                                disabled = {cleaningLevel}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="partner-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={toleranceMarks}
                                                />
                                                
                                            
                                                <Typography id = "partner-slider" gutterBottom>Roomate's Guests Visiting Tolerance</Typography>
                                                <FormHelperText>I am not okay OR very okay with my roomate having guests over</FormHelperText>
                                                <Slider
                                                disabled = {cleaningLevel}
                                                aria-label="Custom marks"
                                                defaultValue={0}
                                                aria-labelledby="partner-slider"
                                                // getAriaValueText={valuetext}
                                                step={null}
                                                valueLabelDisplay="off"
                                                marks={toleranceMarks}
                                                />
                                                </FormGroup>
                                                

                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>
                                            </Grid>
                                            <Grid item xs = {12} w={1} md = {4}>
                                            <FormControl sx={{ m: 10}} component="fieldset" variant="standard">
                                                <FormLabel component="legend">Dealbreakers. Please check all that apply: <b>I will NOT</b> </FormLabel>
                                                
                                                <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isSmoker} onChange={handleChangeDealbreakers} name="isSmoker" />
                                                    }
                                                    label="live with someone who smokes"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isDrinker} onChange={handleChangeDealbreakers} name="isDrinker" />
                                                    }
                                                    label="live with someone who drinks"
                                                />
                                                <FormControlLabel
                                                    control={
                                                    <Checkbox checked={isPetOwner} onChange={handleChangeDealbreakers} name="isPetOwner" />
                                                    }
                                                    label="live with a pet owner"
                                                />
                                                </FormGroup>
                                                <FormHelperText>This information will remain private.</FormHelperText>
                                            </FormControl>        
                                            </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                        
                                    </Grid>
                                </Paper>
                    </Grid>
                    <Grid justifyContent="center" item xs = {10} md = {12} style={{height:'100%'}}>
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
                                        


                                        <Grid item xs = {12} md={6} w={1}>
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

                                        <Grid item xs = {12} md={6} w={1}>
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
                                        <Grid item xs = {12} md={6} w={1}>
                                            <GeoLocation
                                                locationTitle="Country"
                                                isCountry
                                                onChange={setCountry}
                                                
                                            />
                                        </Grid>
                                        <Grid item xs = {12} md={6} w={1}>
                                            <GeoLocation
                                                locationTitle="State"
                                                onChange={setState}
                                                geoId={country}
                                            />
                                            </Grid>
                                        
                                            <Grid
                                            container
                                            spacing={0}
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            style={{ paddingTop: 15 }}
                                            >
                                        <Grid item xs = {2} w={2} md = {6}> 
                                            <TextField  
                                            multiline
                                            id="outlined-basic" 
                                            label="What are you looking for?" 
                                            onChange={handleChangeLookingFor}
                                            rows={5}
                                            sx={{width : {xs: 280, md: 700}}}
                                            maxRows={10}
                                            variant="outlined" />
                                            </Grid>
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