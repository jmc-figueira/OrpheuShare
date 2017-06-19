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
        this.authHelper = new GoogleAuthHelper(this.onLogin.bind(this));
    }

    componentDidMount(){
        this.authHelper.googleSignIn();
    }

    render(){
        return <div>
            <AppNavbar/>
            {this.state.loggedIn ? <NearbyListView/> : <WelcomePage authHelper={this.authHelper}/>}
        </div>;
    }

    onLogin(){
        this.setState({loggedIn: true});
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);