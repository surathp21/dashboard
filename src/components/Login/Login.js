import React from "react";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router-dom";

import Box from "@material-ui/core/Box";
import './Login.css';
import Dashboard from "../../Container/Dashboard/Dashboard";


const clientId = '760706219025-j8oc0o3rftfg3l5eapbtta4n8csnt8nb.apps.googleusercontent.com';
//import "./App.scss";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                "imageUrl": "",
                "givenName": "",
                "familyName": "",
                "email": "",
            },
            isUserLoggedIn: false
            // isUserLoggedIn: localStorage.getItem("isUserLoggedIn") || 
        };
        this.isUserLoggedIn = false;

        this.responseGoogle = this.responseGoogle.bind(this);

    }

    responseGoogle = (response) => {
        console.log("responseGoogle called.")
        console.log(response);
        this.setState({isUserLoggedIn : true});

        if (true) {
            localStorage.setItem("isUserLoggedIn", true);
            localStorage.setItem("tokenId", response.tokenId);
            localStorage.setItem("tokenObj", response.tokenObj);
        } else {
            localStorage.setItem("isUserLoggedIn", false);
            // Display error msg to user.

        } 

        this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    }
        ;
    logout = () => {

        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("tokenId");
        localStorage.removeItem("tokenObj");
        this.setState({ isUserLoggedIn: false })
    }
        ;
    render() {
        return (
            <div>
                {this.state.isUserLoggedIn ? (<Redirect to="/dashboard"/>) : (

                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                        <GoogleLogin
                            clientId="760706219025-j8oc0o3rftfg3l5eapbtta4n8csnt8nb.apps.googleusercontent.com"
                            render={
                                renderProps => (
                                    <button className="button loginBtn loginBtn--google" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Log in with Google
                                    </button>
                                )
                            }
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </Box>
                )}
            </div>
        );
    }
}

export default Login;