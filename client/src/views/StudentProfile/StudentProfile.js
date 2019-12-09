import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CompanyPopup from '../../components/CompanyPopup.js';
import Navbar from '../../components/Navbar/Navbar';

function StudentProfile(props) {
    //styling for material- ui
    const useStyles = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        companyCard: {
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'white',
          minWidth: '200px',
          maxWidth: '50%',
          border: '1px solid #dfe1e5',
          margin: 30,
        },
        skillCard: {
            color: 'black',
            marginRight: 30,
            marginLeft: 30,
          },
        avatar: {
            width: 100,
            height: 100,
            
          },
          heroContent: {
            backgroundColor: 'whitesmoke',
            padding: theme.spacing(6, 0, 6),
          },
      }));
      const classes = useStyles();
      //props contains userinfo from database, which is used to render relevant information to the page
      const person = props.userinfo;
      
        return(
            <div className={classes.root}>
                <Navbar isStudent={props.isStudent}/>
                <div className={classes.heroContent} >
                    <Grid container spacing={4} justify="center" alignItems="center">
                        <Grid container item sm={4} md={2} style={{textAlign: 'center', justifyContent: 'center'}}>
                            <Avatar className={classes.avatar} src="https://i.pravatar.cc/300"></Avatar>
                        </Grid>
                        <Grid item sm={4} md={2} style={{textAlign: 'left', justifyContent: 'center'}}>
                            <Typography noWrap variant="h5" style={{color: 'black', display: 'block'}}>
                                {person.firstName + " " + person.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs = {12} sm={12} md={8} style={{textAlign: 'center', justifyContent: 'center'}}>
                            <Typography noWrap style={{color: "black", display: 'block'}} variant="h6" gutterBottom>Your Top 3 Soft Skills</Typography>     
                            <Grid container spacing = {2}>
                                {Object.entries(person.strongSkills).map(([key, value]) => {return(
                                    <Grid key={key} item xs = {12} sm={12} md={4}>
                                        <Card className={classes.skillCard}>
                                            <CardContent textAlign = "center">
                                                    <Typography noWrap style={{display: 'block'}}>{value}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )})}
                                </Grid>
                        </Grid>      
                    </Grid>            
                </div>
                <Grid container spacing = {4} style={{paddingTop: '4%'}}>
                    {person.matches.map((item, index) => {return(
                        <Grid key={index} item xs = {12} sm={6} md={4} align="center">
                            <Card className={classes.companyCard} boxShadow={3}>
                                <CardContent>
                                    <Typography noWrap style={{display: 'block'}}>
                                        {item.companyName}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{textAlign: 'center', justifyContent: 'center'}}>
                                    <CompanyPopup></CompanyPopup>
                                </CardActions>
                            </Card>
                    </Grid>
                    )})}
                </Grid>
            </div>
        );
    }
    
export default StudentProfile;
