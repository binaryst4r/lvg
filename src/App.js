import React, { Component } from 'react';
import mycon from './images/mycon-gradient-neon.png';
import './App.css';
let moveDirection = 1

const colorArray = ["#47FF0A", "0AC2FF", "#FF0AC2", "#C2FF0A", "#FF0A47"]

const star = {
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  radius: 10,
  dx: 5,
  dy: 4,
  draw(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      secondsElapsed: 0
    }
  }

  tick = () => {
    this.setState({
      secondsElapsed: this.state.secondsElapsed + 1
    });
  }

  componentDidMount() {
    this.setBackground();
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  animate(){
    let ctx = this.refs.canvas.getContext('2d');

    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    star.draw(ctx);

    // if (star.x > window.innerWidth/2) {
    //   star.x -= star.dx
    // } else {
    //   star.x += star.dx
    // }
    //
    // if (star.y > window.innerHeight/2) {
    //   star.y -= star.dy
    // } else {
    //   star.y += star.dy
    // }
    if (star.y + star.dy > window.innerHeight || star.y + star.dy < 0) {
      star.dy = -star.dy;
    }
    if (star.x + star.dx > window.innerWidth || star.x + star.dx < 0) {
      star.dx = -star.dx;
    }

    star.x += star.dx
    star.y += star.dy

    requestAnimationFrame(() => {this.animate()});
  }

  setBackground = () => {
    let bg = this.refs.bg.getContext('2d');
    for (let i = 0; i < 3200; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      bg.beginPath()
      bg.arc(x, y, Math.random() * 2, 0, Math.PI * 2, false);
      bg.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
      bg.fill();

    }
    bg.beginPath();
    bg.arc(300,300, 40, 0, Math.PI * 2, false);
    bg.fillStyle = "#000";
    bg.fill()
    this.animate()
  }

  // update() {
  //   let ctx = this.refs.canvas.getContext('2d');
  //   // circle
  //
  //   requestAnimationFrame(() => {this.update()});
  // }

  render() {
    return (
      <div id="app">
        <nav id='main-navigation'>
          <div id="nav-brand">
            <img alt="" src={mycon} id="mycon"/>
            <h1>
              Larry Gust {this.state.secondsElapsed}
            </h1>
          </div>

          <div id="nav-links">
            <a>github</a>
            <a>linkedin</a>
          </div>
        </nav>
        <div id="main-content">
          <canvas width={window.innerWidth} height={window.innerHeight} style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1
          }} ref='bg'/>
          <canvas width={window.innerWidth} height={window.innerHeight} style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2
          }} ref='canvas'/>
          <div id="homepage-subheader">
            <span>Designer</span>
            <span>Builder</span>
          </div>

          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.&nbsp;
            It has roots in a piece of classical Latin literature from 45 BC, making.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
