import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {NearbyListDelegate} from "./components/nearby_list";

class App extends React.Component<undefined, undefined>{
    render(){
        return <div>
            <AppNavbar/>
            {new NearbyListDelegate().renderView()}
        </div>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);