import React from 'react';
import ReactDOM from 'react-dom';
import Tap from './Tap.jsx';
import style from './styles.css';

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          inputs: [],
          BPM: 0,
          started: false,
          count: 0,
          countDown: false
      }
    }

    handleTap () {
        var tapSound = new Audio();
        tapSound.src = "ping.mp3";
        tapSound.play();
        let tapTime = 0;
    }

    metronomeController () {
        if(this.state.started === false && this.state.BPM !== 0) {
        this.state.started = true;
        this.forceUpdate();
        let interval = (60000)/this.state.BPM;
        let startMetronome = setInterval(() => {
            var metronome = new Audio();
            metronome.src = "Metronome.mp3";
            metronome.play();
            this.state.count+=1;

            if(this.state.count === 4) {
                clearInterval(startMetronome);
                this.state.count = 0;
                this.state.started = false;
                this.forceUpdate();
                console.log(this.state)
            }
        }, interval);
        } else if(this.state.BPM === 0) {
            alert('Enter Valid BPM!')
        }
    }
 
    changeBPM (e) {
        let setBPM = e.target.value;
        this.state.BPM = setBPM;
        this.forceUpdate();
    }

    stopMetronome () {
        this.state.started = false;
        this.forceUpdate();
    }
    
    render() {
      return (
        <div>
            <h1 className="spacebar">Rhythm Trainer</h1>
            <input type="number" placeholder="Enter BPM" name="BPM" onChange={this.changeBPM.bind(this)}></input>
            <div className="metronome button" onClick={this.metronomeController.bind(this)}>Start Challenge</div>
            <div className="stopMetronome button" onClick={this.stopMetronome.bind(this)}>Stop</div>
            <Tap tapFn={this.handleTap}/>
            <p>Current BPM: {this.state.BPM}</p>
        </div>
      );
    }
  }