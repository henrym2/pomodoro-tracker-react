import React from 'react';
// import logo from './hourglass.svg';
import Timer from './components/timer'
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
      workCount:       0,
      shortBreakCount: 0,
      longBreakCount:  0
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Timer-Row">
          <Timer time={25} callBack={this.timerTriggered} type={TIMER_TYPES.JOB}></Timer>
          <Timer time={10} callBack={this.timerTriggered} type={TIMER_TYPES.SHORT}></Timer>
          <Timer time={5} callBack={this.timerTriggered} type={TIMER_TYPES.LONG}></Timer>
          </div>
        </div>
      </div>
    );
  }

  timerTriggered = (timer) => {
    let { workCount, shortBreakCount, longBreakCount } = this.state
    switch (timer) {
      case TIMER_TYPES.JOB:
        this.setState({workCount: workCount++})
        break;
      case TIMER_TYPES.SHORT:
        this.setState({shortBreakCount: shortBreakCount++})
        break
      case TIMER_TYPES.LONG:
        this.setState({longBreakCount: longBreakCount++})
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
    
  }
}

export default App;
