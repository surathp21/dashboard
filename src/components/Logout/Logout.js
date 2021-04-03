import React, { Fragment } from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";

const clientId = '760706219025-j8oc0o3rftfg3l5eapbtta4n8csnt8nb.apps.googleusercontent.com';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: localStorage.getItem("isUserLoggedIn") || false
        };
        this.logout = this.logout.bind(this);
    }

    logout = () => {

        localStorage.removeItem("isUserLoggedIn");
        localStorage.removeItem("tokenId");
        localStorage.removeItem("tokenObj");
        this.setState({isUserLoggedIn: false});
        //this.props.history.push("/")
        //this.props.history.push("/home");
    }
    ;
    render() {
        return (  
            <Fragment>
                {this.state.isUserLoggedIn ? (<GoogleLogout clientId="760706219025-j8oc0o3rftfg3l5eapbtta4n8csnt8nb.apps.googleusercontent.com" buttonText="Logout" onLogoutSuccess={this.logout}/>) : (<Redirect to="/" />)}                
            </Fragment>
            
        )
    }
}

export default Logout;