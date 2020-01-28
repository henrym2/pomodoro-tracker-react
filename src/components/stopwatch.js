import React from "react";

import { Fab } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import "./App.css";

/*
    Props -> Value callback
*/

import '../styles/timer.css'
class Stopwatch extends React.Component {

    constructor() {
        super()
        this.state = {
            timerOn: false,
            timerStart: 0,
            timerTime: 0
        };
        this.stopTimer = this.stopTimer.bind(this)
    }

    controlStopwatch = () => {
        if(this.state.timerOn){
            this.stopTimer()
        }else{
            this.startTimer()
        }
    }

    startTimer = () => {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            });
        }, 10);
    };

    stopTimer = () => {
        this.setState({
            timerOn: false
        });
        this.props.callBack(this.state.timerTime)
        clearInterval(this.timer);
    };

    resetTimer = () => {
        this.setState({
            timerStart: 0,
            timerTime: 0
        });
    };


    render() {
        const { timerTime } = this.state;
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        return ( 
        <div style={{marginRight: "5vw"}} className="Timer-Container">
            <div className="timer-ticker">
                {hours} : {minutes} : {seconds} : {centiseconds}
            </div>
            <div id="controlRow" className="Control-Row">
                <div className="Control-Item">
                    <Fab onClick={this.controlStopwatch} color="primary" aria-label="start"  >
                        {this.state.pause && <PlayArrowIcon/>}
                        {!this.state.pause && <PauseCircleFilledIcon/>}
                    </Fab>
                </div>
                <div className="Control">
                    <Fab onClick={this.resetTimer} color="secondary" aria-label="reset" >
                        <HighlightOffIcon/>
                    </Fab>
                </div>
            </div>
        </div>
        );
    }
}
export default Stopwatch;