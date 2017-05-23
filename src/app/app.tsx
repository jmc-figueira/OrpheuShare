import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNavbar} from "./components/navbar";
import {NearbyListView} from "./components/nearby_list";

class App extends React.Component<undefined, undefined>{
    render(){
        return <div>
            <AppNavbar/>
            <NearbyListView listeners={['Hello', 'World!']}/>
        </div>;
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);