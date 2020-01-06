import React, {Component} from 'react'
import {withRouter} from 'react-router'
import app from "../../config/firebaseauth"
import LoginView from './LoginView'
import api from '../../api'
class LoginContainer extends Component {
    constructor(props) {
        super(props)
        console.log("logging from login index")
        console.log(this.props.isStudent)
    }
    handleSignin = async (event) => { //sign in handler
        event.preventDefault()
        const {email, password} = event.target.elements
        try {

            const user = await app.auth.signInWithEmailAndPassword(email.value, password.value); //tries to sign in
            console.log(user)
            var response = (this.props.isStudent)?
                await api.getstudentuser(user.user.uid).then((res) => {
                    console.log(res)
                    return res
                })
                : await api.getcompanyuser(user.user.uid).then((res) => res)
            this.props.userInfoUpdate(response)
            this.props.collectionIdUpdate(response.id)
            this.props.avatarURLUpdate(response.avatarUrl)
            console.log("logging from handle sign in")
            console.log(this.props.isStudent)
            console.log(this.props.isStudent)
            if (this.props.isStudent == true) {
                this.props.history.push("/")
            } else {
                this.props.history.push("/CompanyProfile")
            }
        } catch (error) {
            alert(error);
        }

    }
    render() {
        return <LoginView isStudent={this.props.isStudent} onSubmit={this.handleSignin} userUpdate={this.props.userUpdate}/>
    }
}

export default withRouter(LoginContainer)
