import React from 'react';
import { Paper, Fab } from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import '../styles/timer.css'

/*Props --
    Int  time     -- Length of the timer
    Func callBack -- Callback function for passing up timer changes
    Int  type     -- Timer type 
                            => Job:   0
                            => Short: 1
                            => Long:  2

*/


class Timer extends React.Component {
    constructor(props) {
        super()
        this.state = {
            time: {}, 
            seconds: props.time*60,
            pause: true,
            alarm: new Audio("http://www.accesscontrolsales.com/Ingram_Products/mp3/pb525dch-x.mp3")
        }
        this.timer = 0
        this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.alarm = this.alarm.bind(this)
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
            if (seconds < 0) {
                this.resetTimer()
                this.alarm()
            }
        }
    }

    alarm() {
        this.props.callBack(this.props.type)
        alert(`${"Work" ? this.props.type > 0: "Break"} over!`)
        this.state.alarm.addEventListener("canplaythrough", _event => {
            this.state.alarm.play()
        })
    }

    resetTimer() {
        clearInterval(this.timer)
        let timeLeftVar = this.secondsToTime(this.props.time * 60);
        this.setState({
            time: timeLeftVar, 
            seconds: this.props.time*60,
            pause: true
        })
        this.timer = setInterval(this.countDown, 1000);
    }


    render() {
        return (
            <div style={{marginRight: "5vw"}} >
                <Paper elevation={3} style={ {width : "15vw",height: "17vw" }} className="Timer-Container">
                    <div>
                        {this.state.time.m}m {this.state.time.s}s
                    </div>
                    <div id="controlRow" className="Control-Row">
                        <div className="Control-Item">
                            <Fab onClick={this.startTimer} color="primary" aria-label="start"  >
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
                </Paper>
            </div>
        )
    }
}
export default Timer