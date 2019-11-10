import React, {Component} from 'react'
import {withRouter} from 'react-router'
import auth from "../../config/firebaseauth"
import LoginView from './LoginView'
class LoginContainer extends Component {
    handleSignin = async (event) => { //sign in handler
        event.preventDefault()
        const {email, password} = event.target.elements
        try {
            
            const user = await auth.signInWithEmailAndPassword(email.value, password.value); //tries to sign in
            console.log(user)
            this.props.history.push("/");//redirects to home
        } catch (error) {
            alert(error);
        }

    }
    render() {
        return <LoginView isStudent={this.props.isStudent} onSubmit={this.handleSignin}/>
    }
}

export default withRouter(LoginContainer)