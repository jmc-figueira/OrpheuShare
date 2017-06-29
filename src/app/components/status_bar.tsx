import * as React from "react";
import {Panel, Grid, Row, Col, ButtonGroup, Button, Glyphicon, ProgressBar} from "react-bootstrap";
import { Track } from "../helpers/track";
import { MusicHelper } from "../helpers/music_helper";

interface StatusBarProps{
    trackInfo: Track,
}

export class StatusBar extends React.Component<StatusBarProps, undefined>{
    private currentProgress: number = 0;
    private progressListener;

    componentWillReceiveProps(newProps){
        this.props = newProps;
        this.calculateTrackPercentage();
    }

    render(){
        return <Panel className="media-controls">
            <Grid fluid>
                <Row>
                    <Col xsHidden smHidden md={4}>
                        <h5>{this.props.trackInfo ? this.props.trackInfo.name + " -" + this.props.trackInfo.artists.map((artist) => " " + artist): null}</h5>
                    </Col>
                    <Col xs={8} mdHidden lgHidden>
                        <h6>{this.props.trackInfo ? this.props.trackInfo.name + " -" + this.props.trackInfo.artists.map((artist) => " " + artist): null}</h6>
                    </Col>
                    <Col xsHidden smHidden md={4} className="center-content">
                        <ButtonGroup>
                            <Button><Glyphicon glyph="star"/></Button>
                            <Button><Glyphicon glyph={this.props.trackInfo && this.props.trackInfo.playing ? "pause" : "play"}/></Button>
                        </ButtonGroup>
                    </Col>
                    <Col xs={4} mdHidden lgHidden className="right-content">
                        <ButtonGroup>
                            <Button><Glyphicon glyph="star"/></Button>
                            <Button><Glyphicon glyph={this.props.trackInfo && this.props.trackInfo.playing ? "pause" : "play"}/></Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} className="center-content">
                        <ProgressBar now={this.currentProgress}/>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    }

    private calculateTrackPercentage(){
        clearInterval(this.progressListener);

        if(!this.props.trackInfo || !this.props.trackInfo.playing){
            this.currentProgress = 0;
        } else{
            this.currentProgress = this.props.trackInfo.playing.timestamp / this.props.trackInfo.length * 100

            this.progressListener = setInterval(() => {
                this.currentProgress = Math.min(100, this.currentProgress + 1);
                this.forceUpdate();
            }, 1000);
        }
    }
}