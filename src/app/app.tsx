import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {WelcomePage} from "./components/welcome_page";
import {NearbyListView} from "./components/nearby_list";
import {GoogleAuthHelper} from "./helpers/google_auth_helper";

interface GlobalState{
    loggedIn: boolean
}

class App extends React.Component<undefined, GlobalState>{
    private authHelper: GoogleAuthHelper;
    
    constructor(props){
        super(props);
        this.state = {loggedIn: false};
        this.authHelper = new GoogleAuthHelper(this.onLogin.bind(this), this.onLogout.bind(this));
    }

    componentDidMount(){
        this.authHelper.googleSignInWithToken();
    }

    render(){
        return <div>
            <AppNavbar requestLogout={this.requestLogout.bind(this)} loggedIn={this.state.loggedIn}/>
            {this.state.loggedIn ? <NearbyListView/> : <WelcomePage requestLogin={this.requestLogin.bind(this)}/>}
        </div>;
    }

    public requestLogin(){
        this.authHelper.googleSignInNoToken();
    }

    private onLogin(){
        this.setState({loggedIn: true});
    }

    public requestLogout(){
        this.authHelper.logOut();
    }

    private onLogout(){
        this.setState({loggedIn: false});
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);