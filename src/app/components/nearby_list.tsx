import * as React from "react";
import {Jumbotron, ListGroup, ListGroupItem} from "react-bootstrap";

export interface Listener{
    Username: string,
    TrackName: string,
    TrackID: string
}

export interface ListenerList{
    listeners: Listener[]
}

export interface NearbyListState{
    error: boolean
}

export class NearbyListView extends React.Component<undefined, NearbyListState>{
    private delegate: NearbyListDelegate;

    constructor(){
        super();
        this.state = {error: false};
        this.delegate = new NearbyListDelegate(function(newState: NearbyListState){
            this.setState(newState);
        }.bind(this));
    }

    render(){
        return this.state.error ? (
            <Jumbotron>
                <div className="container">
                    <h1 className="text-center">We're sorry</h1>
                    <p className="text-center">It appears our service is currently unavailable.</p>
                    <p className="text-center">Please try again at a later time.</p>
                </div>
            </Jumbotron>
        ) : (
            <ListGroup>
                {this.delegate.getCurrentListeners().listeners.map(NearbyListView.renderItem)}
            </ListGroup>
        )
    }

    private static renderItem(listener: Listener){
        return <ListGroupItem header={listener.Username}>{listener.TrackName}</ListGroupItem>
    }
}

class NearbyListDelegate{
    updateListState: (newState: NearbyListState) => void;
    private listeners: ListenerList = {listeners: []};

    constructor(updateListState: (newState: NearbyListState) => void){
        this.updateListState = updateListState;

        this.updateListeners();
        setInterval(this.updateListeners.bind(this), 300000);
    }

    getCurrentListeners(): ListenerList{
        return this.listeners;
    }

    private updateListeners(){
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/rest/v1/now",
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            success: this.serverSuccess.bind(this),
            error: this.serverError.bind(this)
        });
    }

    private serverSuccess(response: any){
        let listenerJSON = JSON.parse(response);
        for(let listener of listenerJSON){
            this.listeners.listeners.push(listener);
        }

        this.updateListState({error: false});
    }

    private serverError(){
        this.updateListState({error: true});
    }
}