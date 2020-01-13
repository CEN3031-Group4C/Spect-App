import React, {Component} from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import StudentSurvey from './views/StudentSurvey/StudentSurvey';
import StudentUpdate from './views/StudentUpdate/StudentUpdate';
import CompanySurvey from './views/CompanySurvey/CompanySurvey';
import CompanyUpdate from './views/CompanyUpdate/CompanyUpdate';
import NotFound from "./views/NotFound"
import StudentProfile from "./views/StudentProfile/StudentProfile"
import Login from './views/Login'
import app from './config/firebaseauth';
import PrivateRoute from './components/PrivateRoute'
import Signup from './views/Signup'
import CompanyProfile from './views/CompanyProfile/CompanyProfile';
import api from './api'
import AdminDashboard from './views/Admin/AdminDashboard'
import Matches from './views/Matches/Matches';
import PrivateCompanyRoute from './components/PrivateCompanyRoute'
import PrivateAdminRoute from './components/PrivateAdminRoute'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      authenticated: false,
      currentUser: null,
      isStudent: false,
      userinfo: {},
      collectionid: '0',
      avatarURL: null
    }
  }
  componentDidMount() {
    app.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("USER IS AUTHENTICATED")
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false,
          userinfo: sessionStorage.getItem("userinfo"),
          isStudent: sessionStorage.getItem("isStudent"),
          collectionid: sessionStorage.getItem("collectionid"),
          avatarURL: sessionStorage.getItem("avatarURL")
        });
      } else {
        console.log("USER NOT AUTHENTICATED")
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        })
      }
    })
  }
  userUpdate() {
    sessionStorage.setItem("isStudent", JSON.stringify(!this.state.isStudent))
    this.setState({
      isStudent: !this.state.isStudent
    })
  }
  userInfoUpdate(value) {
    sessionStorage.setItem("userinfo", JSON.stringify(value))
    this.setState({
      userinfo: value
    })

  }
  collectionIdUpdate(value) {
    this.setState({
      collectionid: value
    })
    sessionStorage.setItem("collectionid", JSON.stringify(value))

  }
  avatarURLUpdate(value) {
    sessionStorage.setItem("avatarURL", JSON.stringify(value))
    this.setState({
      avatarURL: value
    })
  }

  render() {
    if(this.state.loading) {
      return (<p>It is still loading</p>)
    } else {
      return (
        <div style={{height: '100%'}}>
          <Switch>
            {/****************************************************************************
            Use render instead of component in order to pass props into the react-router
            *****************************************************************************/}
            <PrivateAdminRoute exact path="/admin"
              render={(props) => <AdminDashboard userInfoUpdate={this.userInfoUpdate.bind(this)}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <PrivateRoute exact path="/"
              render={(props) => <Matches userinfo={JSON.parse(sessionStorage.getItem("userinfo")) || this.props.userinfo} userInfoUpdate={this.userInfoUpdate.bind(this)} isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            {/*<PrivateCompanyRoute exact path="/admin"
              render={(props) => <AdminDashboard></AdminDashboard>}
              user={this.state.currentUser}
              collectionId={this.state.collectionid}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />*/}
            <PrivateRoute exact path="/StudentSurvey"
              render={(props) => <StudentSurvey {...props} userInfoUpdate={this.userInfoUpdate.bind(this)} userinfo={JSON.parse(sessionStorage.getItem("userinfo"))} avatarURL={this.state.avatarURL || JSON.parse(sessionStorage.getItem("avatarURL"))}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              collectionId={this.state.collectionid}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <PrivateRoute exact path="/StudentUpdate"
              render={(props) => <StudentUpdate {...props} userInfoUpdate={this.userInfoUpdate.bind(this)} userinfo={JSON.parse(sessionStorage.getItem("userinfo"))}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              collectionId={this.state.collectionid}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <PrivateCompanyRoute exact path="/CompanySurvey"
              render={(props) => <CompanySurvey {...props} userInfoUpdate={this.userInfoUpdate.bind(this)} userinfo={JSON.parse(sessionStorage.getItem("userinfo"))} avatarURL={this.state.avatarURL || JSON.parse(sessionStorage.getItem("avatarURL"))}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              collectionId={this.state.collectionid}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <PrivateCompanyRoute exact path="/CompanyUpdate"
              render={(props) => <CompanyUpdate {...props} userInfoUpdate={this.userInfoUpdate.bind(this)} userinfo={JSON.parse(sessionStorage.getItem("userinfo"))} avatarURL={this.state.avatarURL || JSON.parse(sessionStorage.getItem("avatarURL"))}/>}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              collectionId={this.state.collectionid}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <PrivateCompanyRoute exact path="/CompanyProfile" render={(props) =>
              // <CompanyProfile {...props} collectionId={this.state.collectionid} userinfo={JSON.parse(sessionStorage.getItem("userinfo"))}/>}
              // authenticated={this.state.authenticated}
              <CompanyProfile {...props} avatarURL={JSON.parse(sessionStorage.getItem("avatarURL"))}
              userinfo={JSON.parse(sessionStorage.getItem("userinfo"))}
              />}
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}

            />
            <PrivateRoute exact path="/studentprofile" render={(props) =>
              <StudentProfile
                {...props}
                avatarURL={JSON.parse(sessionStorage.getItem("avatarURL"))}
                userinfo={JSON.parse(sessionStorage.getItem("userinfo"))}
                isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
              />
              }
              authenticated={this.state.authenticated}
              user={this.state.currentUser}
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
            />
            <Route exact path="/login" render={(props) =>
              <Login {...props }
                isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
                userUpdate={this.userUpdate.bind(this)}
                userInfoUpdate={this.userInfoUpdate.bind(this)}
                avatarURLUpdate={this.avatarURLUpdate.bind(this)}
                collectionIdUpdate={this.collectionIdUpdate.bind(this)}
              />}/>
            <Route exact path="/signup" render={(props) => <Signup {...props }
              isStudent={JSON.parse(sessionStorage.getItem("isStudent"))}
              userUpdate={this.userUpdate.bind(this)}
              collectionIdUpdate={this.collectionIdUpdate.bind(this)}
              avatarURLUpdate={this.avatarURLUpdate.bind(this)}
              />}
              />
            <Route component={NotFound}/>
          </Switch>
        </div>
      );
    }
  }
}

export default App;
