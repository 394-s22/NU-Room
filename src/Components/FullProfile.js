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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"

    >
      <Grid item xs={12} p={3}>
        <Card sx={{ width: 1 }} >

          {/* <CardHeader
            title={profile.name[0] + " " + profile.name[1]}
          //   subheader="September 14, 2016"
          /> */}
          <CardMedia
            component="img"
            height="194"
            image="https://picsum.photos/200/300"
            alt="Roommate photo"
          />
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
              >
                <Box sx={{ minHeight: 100 }}>
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
                    {profile.name[0] + " " + profile.name[1]}
                  </Typography>
                  <Typography style={{ color: "grey" }}>
                    {"Computer Science"}
                  </Typography>

                </Stack>

              </Stack>


              <Grid item md={12} xs={12}>
                <Typography variant="body2" color="text.secondary" >
                  {profile.bio}
                </Typography>
              </Grid>
            </Grid>

          </CardContent>
          {/* <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions> */}

          {/* <Box textAlign='center'
            m={2}
          >
            <Button w={1} variant="contained" sx={{
              width: 0.75,
              minHeight: "48px",
              fontWeight: 700,
              fontSize: "16px",
              whiteSpace: 'nowrap',
              textAlign: 'center'
            }}
              onClick={() => {
                setDisplayPage('Matches');
                console.log("Hello");
              }}
            >Back to Matches</Button>
          </Box> */}


          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph sx={{ fontWeight: 700 }}>Hobbies:</Typography>
              <Typography paragraph>
                {profile.hobbies[0]}
              </Typography>
              <Typography paragraph>
                {profile.hobbies[1]}
              </Typography>
              <Typography paragraph sx={{ fontWeight: 700 }}>Personality:</Typography>
              <Typography paragraph>
                {profile.personality[0]}
              </Typography>
            </CardContent>
          </Collapse> */}
        </Card>


      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ width: 1 }}>
          <CardHeader
            title={"About"}
          //   subheader="September 14, 2016"
          />
          <CardContent>

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
