import React, { Component } from 'react';

class AudioNone extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const canvas = this.canvas.current;
    const height = canvas.height;
    const width = canvas.width;
    let c = document.getElementById("audioCanvas");
    let ctx = c.getContext("2d");

    let gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop("0", "#ff8934");
    gradient.addColorStop("0.5" ,"#ef0348");
    gradient.addColorStop("1.0", "#971e63");

    ctx.lineWidth = 3;
    ctx.strokeStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
  }

  render() {
    return <canvas id='audioCanvas' width="600" height="150" ref={this.canvas} />;
  }
}

export default AudioNone;