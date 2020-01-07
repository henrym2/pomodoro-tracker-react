import React from 'react';
import { Paper, Fab } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/timer.css'

class Timer extends React.Component {
    constructor(props) {
        super()
        this.state = {
            time: {}, 
            seconds: props.time*60,
            pause: true
        }
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    secondsToTime(secs) {
        let divisor_for_mins = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_mins / 60);
        let divisor_for_secs = divisor_for_mins % 60;
        let seconds = Math.ceil(divisor_for_secs)

        let obj = {
            "m": minutes,
            "s": seconds
        }
        return obj
    }
    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.props.time * 60);
        this.setState({time: timeLeftVar })
    }

    startTimer() {
        this.setState({pause: !this.state.pause})
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        if (!this.state.pause) {
            let seconds = this.state.seconds - 1;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
            });

            // Check if we're at zero.
            if (seconds === 0) {
                clearInterval(this.timer);
            }
        }
    }

    resetTimer() {

    }


    render() {
        return (
            <div style={{marginRight: "5vw"}} >
                <Paper elevation={3} style={ {width : "15vw",height: "17vw" }} className="Timer-Container bounce-in-top">
                    <div>
                        {this.state.time.m}m {this.state.time.s}s
                    </div>
                    <div id="controlRow" className="Control-Row">
                        <Fab onClick={this.startTimer} color="primary" aria-label="start" className="Control-Item" >
                            {this.state.pause && <PlayArrowIcon/>}
                            {!this.state.pause && <PauseCircleFilledIcon/>}
                        </Fab>
                        <Fab onClick={this.resetTimer} color="secondary" aria-label="reset" className="Control-Item">
                            <HighlightOffIcon/>
                        </Fab>
                    </div>  
                </Paper>
            </div>
        )
    }
}
export default Timer