import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {WelcomePage} from "./components/welcome_page";
import {NearbyListView} from "./components/nearby_list";
import {OAuthHelper} from "./helpers/oauth_helper";
import {SpotifyHelper} from "./helpers/spotify_helper";
import { User } from "./helpers/basic_user";

interface GlobalState{
    loggedIn: User | false;
}

class App extends React.Component<undefined, GlobalState>{
    private authHelper: OAuthHelper;
    
    constructor(props){
        super(props);
        this.state = {loggedIn: false};
        this.authHelper = new SpotifyHelper(this.onLogin.bind(this), this.onLogout.bind(this));
    }

    componentDidMount(){
        this.authHelper.signInWithToken();
    }

    render(){
        return <div>
            <AppNavbar requestLogout={this.requestLogout.bind(this)} loggedIn={this.state.loggedIn}/>
            {this.state.loggedIn ? <NearbyListView/> : <WelcomePage requestLogin={this.requestLogin.bind(this)}/>}
        </div>;
    }

    public requestLogin(){
        this.authHelper.signInNoToken();
    }

    private onLogin(user: User){
        this.setState({loggedIn: user});
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