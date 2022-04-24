import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from "@mui/material/Grid";
import Button, { ButtonProps } from '@mui/material/Button';
import Box from '@mui/material/Box';
import "../CSS/profile.css";
import SpeedDial from '@mui/material/SpeedDial';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Stack } from '@mui/material';
import Divider from '@mui/material/Divider';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
// import { setData, useData } from "../utilities/firebase";

// const [data, loadingData, errorData] = useData("/");

// useEffect(() => {
//   if (data === undefined) return;
//   console.log("data", data);
// }, [data])


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FullProfile = ({ profile, setCurrentProfile, setDisplayPage }) => {
  const [expanded, setExpanded] = React.useState(false);
  console.log('full profile:',profile)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="stretch"

    >
      <Grid item md={6} paddingX={3} paddingY={2}>
        <Card sx={{ borderRadius: 3, flexGrow: 1 }} >
          <CardMedia
            component="img"
            height="194"
            image="https://picsum.photos/200/400"
            alt="Background"
          />
          <CardContent>

            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={1}
            >
              <Box sx={{ minHeight: 80 }}>
                <Avatar
                  alt="User Name"
                  src="https://picsum.photos/200/300"
                  sx={{ width: 100, height: 100, marginTop: -6 }}
                  style={{
                    border: '3px solid white'
                  }}
                />

              </Box>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={0}

              >
                <Typography sx={{ fontWeight: 'bold' }}>
                  {profile.basicInfo.fname + " " + profile.basicInfo.lname}
                </Typography>
                <Typography style={{ color: "grey" }}>
                  {"Computer Science"}
                </Typography>

              </Stack>

            </Stack>

          </CardContent>

        </Card>
      </Grid>

      <Grid item xs={12} md={6} paddingX={3}>

        <Card sx={{ flexGrow: 1, borderRadius: 3 }}>
          {/* <CardHeader
              title={"About"}
            //   subheader="September 14, 2016"
            /> */}
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={0}
            paddingTop={2}
          >

            <IconButton

              href="https://facebook.com"
              fontSize={80}
            >
              <FacebookOutlinedIcon sx={{ color: '#4267B2', fontSize: "80px" }} />
            </IconButton>
            <IconButton

              href="https://twitter.com"
            >
              <TwitterIcon sx={{ color: '#1DA1F2' }} />
            </IconButton>
            <IconButton

              href="https://instagram.com"
            >
              <InstagramIcon sx={{ color: '#E1306C' }} />
            </IconButton>
          </Stack>

          <CardContent>
            <Divider />
            <Typography variant="body2" color="text.secondary" paddingTop={2} sx={{ fontSize: 20, color: 'black' }}>
              {"About"}
            </Typography>
            <br />
            <Typography variant="body2" color="text.secondary" >
              {profile.bio}
            </Typography>
            <br />
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
              paddingY={1}
            >
              <LocationOnIcon />

              <Typography variant="body2" color="black" >
                {"Lives in"} <span style={{fontWeight: 'bold'}}>{profile.basicInfo.whereYouFrom}</span>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
              paddingY={1}
            >
              <MailIcon />
              <Typography variant="body2" color="black" >
                {profile.basicInfo.email}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
              paddingY={1}
            >
              <PhoneIcon />
              <Typography variant="body2" color="black" >
                {"224-688-3129"}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
              paddingY={1}
            >
              <SchoolIcon />
              <Typography variant="body2" color="black" >
              {"Next Year Grade: "} <span style={{fontWeight: 'bold'}}>{profile.basicInfo.nextYearGrade}</span>
              </Typography>
            </Stack>




          </CardContent>
        </Card>


      </Grid>



      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<ArrowBackIcon />}
        onClick={() => {
          setDisplayPage('Matches');
          console.log("Hello");
        }}
      >

      </SpeedDial>

      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>

      </Box>

    </Grid>

  );
}

export default FullProfile;
