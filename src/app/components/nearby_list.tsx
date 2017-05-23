import * as React from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

export interface ListenerList{
    listeners: string[]
}

export class NearbyListView extends React.Component<ListenerList, undefined>{
    render(){
        return <ListGroup>
            {this.props.listeners.map(NearbyListView.renderItem)}
        </ListGroup>
    }

    static renderItem(listener: string){
        return <ListGroupItem>{listener}</ListGroupItem>
    }
}