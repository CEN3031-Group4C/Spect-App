import React from 'react';
import logo from '../../assets/logo.svg';
import auth from '../../config/firebaseauth'
import Button from '@material-ui/core/Button'
import Navbar from '../../components/Navbar/Navbar'
import CompanyCard from '../../components/CompanyCard'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import data from './MatchData'
import api from '../../api'

const styles = theme => ({
    cardList: {
        display: 'inline-block',
        paddingLeft: '8%',
    },
    card: {
        maxWidth: 345,
        margin: 50,
        border: '1px solid #2EA7EB',
        float: "left",
    },
    media: {
        height: 80,
        width: 'maxWidth',
        position: 'relative',

    },
    logo: {
        display: 'block',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    actions: {
        justifyContent: 'center',
    },
    matchButtonFalse: {
        background: 'linear-gradient(45deg, #FA4616 30%, #FA0700 90%)',
    },
    matchButtonTrue: {
        background: 'black',
    },
    actionDiv: {
        display: 'inline',
    },
    matchButton1: {
        background: 'black',
    }
})

class Matches extends React.Component {
    constructor(props)
    {
        super(props);

        this.state =
        {
            jobs: data,
            postModalShow: false,
            editShow: false,
            matchButtonState: false,
        }
        this.matchButtonClicked = this.matchButtonClicked.bind(this);
    }

    signOut() {
        auth.signOut().then(()=> {
            alert('Signed Out')
        }).catch((error) => {
            alert('Cant sign out')
        })
    }

    matchButtonClicked() {
        // const payload = {
        //     theid: this.props.userinfo.id,
        //     company: 
        // }
        // api.updatematch(payload)
        //api call
        //make a function in api js
        // make a route in student routes
        // make a functiuon in student controller
        // connect it together using patch api call 
    }

    componentDidMount() {
        api.getrecommendations(this.props.userinfo).then((res) => {
            this.setState({
                jobs: res.data
            })
        }
        )
        console.log(this.props.userinfo)
        console.log(typeof this.props.userinfo)
    }
    render(){
        const btnPrefix = "matchButton";
        const {classes} = this.props;
        const CompanyCardList = this.state.jobs.map(company => {
            return (
                <Card className={classes.card} key={company.id}>
                    <CardActionArea>
                        <div className={classes.media}>
                            <img
                            className={classes.logo}
                            src={logo}
                            />
                        </div>
                    </CardActionArea>
                    <CardActions className={classes.actions}>
                        <div className="actionDiv">
                            <h3>{company.companyName}</h3>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                startIcon={<FavoriteIcon />} 
                                onClick={this.matchButtonClicked}
                                style={ 
                                    company.matched ?
                                    { background: 'linear-gradient(45deg, #FA4616 30%, #FA0700 90%)'}
                                    : {background: 'gray'}
                                }
                                >
                                    Match  
                            </Button>  
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            )
        }) 


        return (
            <div className="App">
                <Navbar page={"Matches"}/>
                <div className={classes.cardList}>
                    {CompanyCardList}
                </div>
                
            </div>
        );
    }
}

export default withStyles(styles)(Matches);
