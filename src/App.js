import React from 'react';
import logo from './hourglass.svg';
import Timer from './components/timer'
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="Timer-Row">
        <Timer time={25}></Timer>
        <Timer time={10}></Timer>
        <Timer time={5}></Timer>
        </div>
      </div>
    </div>
  );
}

export default App;
