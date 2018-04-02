'use strict';
 
const React = require('react');
const ReactAnimationFrame = require('react-animation-frame');

class Timer extends React.Component {
    onAnimationFrame(time, last) {
        const progress = Math.round(time / this.props.durationMs);
        this.bar.style.width = `${progress}%`;
        this.props.metronome();
        if (progress === 100) {
            this.props.endAnimation();
        }
    }
 
    render() {
        return (
            <div className="timer">
                <p>{this.props.message}</p>
                <div className="timer__bar" ref={node => this.bar = node}></div>
            </div>
        );
    }
}

exports.TimerComponent = Timer;
exports.timer = (time) => { ReactAnimationFrame(Timer, 1000); }