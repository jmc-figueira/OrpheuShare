import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import * as Redux from "redux";
import {AppNavbar} from "./components/navbar";
import {WelcomePage} from "./components/welcome_page";

interface GlobalState{
    loggedIn: boolean
}

class App extends React.Component<undefined, GlobalState>{
    render(){
        return <div>
            <AppNavbar/>
            <WelcomePage/>
        </div>;
    }

    static reducer(state: GlobalState, action: Redux.Action): GlobalState{
        switch(action.type){
            case "LogIn":
                if(!state.loggedIn)
                    return {loggedIn: true};
                return state;
            case "LogOut":
                if(state.loggedIn)
                    return {loggedIn: false};
                return state;
        }
    }
}

let store = Redux.createStore(App.reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);