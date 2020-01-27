import React from 'react';
import Timer from './components/timer'
import StopWatch from './components/stopwatch'
import { Select, AppBar, Toolbar, MenuItem } from '@material-ui/core';
import './styles/App.css';

const TIMER_TYPES = {
  JOB: 0,
  SHORT: 1,
  LONG: 2
}

class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      work:  0,
      short: 0,
      long:  0,
      timerType: {
        length: 25,
        type: TIMER_TYPES.JOB
      }
    }
    this.timerTriggered = this.timerTriggered.bind(this)
  }

  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <div style={{marginLeft: "auto"}}>
              <Timer callBack={this.timerTriggered} type={this.state.timerType.type}></Timer>
              <StopWatch></StopWatch>
            </div>
          </Toolbar>
        </AppBar>
        <div className="App-header">
          <div className="Timer-Row">
            <div className="details-row bounce-in-top" style={{"--length": "1.1s"}}>
              <p className="counter">{this.state.work}</p>
            </div>
            <div className="details-row bounce-in-top" style={{"--length": "1.2s"}}>
              <p className="counter">{this.state.long}</p>
            </div>
            <div className="details-row bounce-in-top" style={{"--length": "1.3s"}}>
              <p className="counter">{this.state.short}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  timerTriggered = (timer) => {
    switch (timer) {
      case TIMER_TYPES.JOB:
        this.setState((prevState, _props) => {
          return {work: prevState.work+1}
        })
        break;
      case TIMER_TYPES.SHORT:
        this.setState((prevState, _props) => {
          return {short: prevState.short+1}
        })
        break
      case TIMER_TYPES.LONG:
        this.setState((prevState, _props) => {
          return {long: prevState.long+1}
        })
        break
      default:
        break;
    }
  }

  isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
  }

  componentDidMount() {
    if(this.isPushNotificationSupported()){
      Notification.requestPermission().then(function(result) {
        console.log(result);
      });
    }
    if(this.state.work > 3){
      alert("Long break time!")
      this.setState({work: 0})
    }
    
  }
}

export default App;
