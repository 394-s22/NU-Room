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
import "../CSS/profile.css"

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
  
  export default function Profile({profile}) {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card sx={{ width: 1}}>
        <CardHeader
        //   avatar={
        //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //       R
        //     </Avatar>
        //   }
        //   action={
        //     <IconButton aria-label="settings">
        //       <MoreVertIcon />
        //     </IconButton>
        //   }
          title={profile.name[0] + " " + profile.name[1]}
        //   subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://picsum.photos/200/300"
          alt="Roommate photo"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {profile.bio}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph sx = {{fontWeight: 700}}>Hobbies:</Typography>
            <Typography paragraph>
                {profile.hobbies[0]}
            </Typography>
            <Typography paragraph>
                {profile.hobbies[1]}
            </Typography>
            <Typography paragraph sx = {{fontWeight: 700}}>Personality:</Typography>
            <Typography paragraph>
                {profile.personality[0]}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }

// const Profile = ({ profile }) => {

//     return (

//         <div className="profileCard">
//             <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                     <h1>{profile.name[0]}</h1>
                    
//                 </Grid>
//                 <Grid item xs={6}>
//                     <h1>{profile.name[1]}</h1>
//                 </Grid>

//                 <Grid item xs={12}>
//                     <h2>Bio</h2>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <p>{profile.bio}</p>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <img id="profileImg" src="https://picsum.photos/200/300" alt="Profile Image"></img>
//                 </Grid>

//                 <Grid item xs={12}>
                    
//                         <h2>Hobbies</h2>
//                             <ul>
//                                 <li>{profile.hobbies[0]}</li>
//                                 <li>{profile.hobbies[1]}</li>
//                             </ul>
//                             <h2>Personal Vibe</h2>
//                             <ul>
//                                 <li>{profile.personality[0]}</li>
//                                 <li>{profile.personality[0]}</li>
//                             </ul>
//                         <h2>___ % Match!</h2>
//                         <h3>Message Name at: @email</h3>
                    
//                 </Grid>
//             </Grid>
//         </div>


//     );
// };

// export default Profile;
