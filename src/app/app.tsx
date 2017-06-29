import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {WelcomePage} from "./components/welcome_page";
import {NearbyListView} from "./components/nearby_list";
import {OAuthHelper} from "./helpers/oauth_helper";
import {SpotifyHelper} from "./helpers/spotify_helper";
import { User } from "./helpers/user";
import { StatusBar } from "./components/status_bar";
import { MusicHelper } from "./helpers/music_helper";
import { Track } from "./helpers/track";

interface GlobalState{
    loggedIn: User | false;
    currentTrack: Track;
}

class App extends React.Component<undefined, GlobalState>{
    private authHelper: OAuthHelper & MusicHelper;
    private trackChangePoller;
    
    constructor(props){
        super(props);
        this.state = {loggedIn: false, currentTrack: null};
        this.authHelper = new SpotifyHelper(this.onLogin.bind(this), this.onLogout.bind(this));
    }

    componentDidMount(){
        this.authHelper.signInWithToken();
    }

    render(){
        return <div>
            <AppNavbar requestLogout={this.requestLogout.bind(this)} loggedIn={this.state.loggedIn}/>
            {this.state.loggedIn ? <NearbyListView/> : <WelcomePage requestLogin={this.requestLogin.bind(this)}/>}
            {this.state.loggedIn ? <StatusBar trackInfo={this.state.currentTrack}/> : null}
        </div>;
    }

    public requestLogin(){
        this.authHelper.signInNoToken();
    }

    private onLogin(user: User){
        this.authHelper.getCurrentTrack(this.onGetCurrentTrack.bind(this));
        this.setState({loggedIn: user});
    }

    private onGetCurrentTrack(response){
        clearInterval(this.trackChangePoller);

        if(response.is_playing){
            this.trackChangePoller = setInterval(this.authHelper.getCurrentTrack(this.onGetCurrentTrack.bind(this)), response.item.duration_ms - response.progress_ms);
        }

        this.setState({currentTrack: {name: response.item.name, artists: response.item.artists.map((artist) => artist.name), uri: response.item.uri, album_art: "", length: response.item.duration_ms, playing: response.is_playing ? {timestamp: response.progress_ms} : false}});
    }

    public requestLogout(){
        this.authHelper.logOut();
    }

    private onLogout(){
        this.setState({loggedIn: false, currentTrack: null});
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);