import React from 'react';
import Timer from './components/timer'
import StopWatch from './components/stopwatch'
import ProjectSelector from './components/project_selector'
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
      stopWatchElapsed: 0,
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
          <ProjectSelector callBack={this.projectSelect_Callback}></ProjectSelector>
            <div style={{marginLeft: "auto"}}>
              {/* <Timer callBack={this.timerTriggered} type={this.state.timerType.type}></Timer> */}
              <StopWatch callBack={this.stopwatch_Callback}></StopWatch>
            </div>
          </Toolbar>
        </AppBar>
        <div className="App-header">
          <div className="Dashboard">
  
          </div>
        </div>
      </div>
    );
  }

  projectSelect_Callback = (project) => {
    console.log(project)
  }

  stopwatch_Callback = (elapsed) => {
    this.setState({stopWatchElapsed: elapsed})
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
