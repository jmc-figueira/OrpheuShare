import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";

class App extends React.Component<undefined, undefined>{
    render(){
        return <AppNavbar/>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);