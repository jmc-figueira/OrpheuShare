import * as React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export interface ListenerList{
    listeners: string[]
}

class NearbyListView extends React.Component<ListenerList, undefined>{
    render(){
        return <ListGroup>
            {this.props.listeners.map(NearbyListView.renderItem)}
        </ListGroup>
    }

    private static renderItem(listener: string){
        return <ListGroupItem>{listener}</ListGroupItem>
    }
}

export class NearbyListDelegate{
    private listeners: ListenerList;

    constructor(){
        this.listeners = NearbyListDelegate.getCurrentListeners();
    }

    private static getCurrentListeners(): ListenerList{
        let newListeners: ListenerList = {listeners: ['Hello', 'World!']};

        /*$.ajax({

        });*/

        return newListeners;
    }

    renderView(){
        return <NearbyListView listeners={this.listeners.listeners}/>;
    }

}