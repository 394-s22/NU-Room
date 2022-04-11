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
import FullProfile from "./FullProfile";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../CSS/profile.css";

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

export default function Profile({ profile, setCurrentProfile, setDisplayPage }) {
  const [expanded, setExpanded] = React.useState(false);
  const [fullProfilePage, setFullProfilePage] = React.useState(false);
  
  const showFullProfilePage = () => {
    setFullProfilePage(true);
    console.log('inside showFull', fullProfilePage)
    return true;
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const randomNumber = Math.floor(Math.random() * (500 - 10 + 1)) + 10;
  const link = `https://picsum.photos/200/${randomNumber}`;

  return (
    <Card sx={{ width: 1 }}>
      <CardHeader
        title={profile.name[0] + " " + profile.name[1]}
      //   subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={link}
        alt="Roommate photo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {profile.bio} 
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Box textAlign='center'
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
          setCurrentProfile(profile);
          setDisplayPage('FullProfile');
        }}>
          View Full Profile</Button>
      </Box>

    {/* <Router>
      <Routes>
        <Route exact path="/FullProfile" 
            component={FullProfile}>
        </Route>
        <Route>
    
              <Link to="/FullProfile" target="_blank">
                View Person's Profile ...
              </Link>
  
        </Route>
      </Routes>
    </Router> */}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
    </Card>
  );
}

