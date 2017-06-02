import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {WelcomePage} from "./components/welcome_page";

class App extends React.Component<undefined, undefined>{
    render(){
        return <div>
            <AppNavbar/>
            <WelcomePage/>
        </div>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);