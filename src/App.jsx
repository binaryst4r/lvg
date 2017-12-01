import React, { Component } from 'react';
import mycon from './images/mycon-gradient-neon.png';
import Particle from './animations/particle.js';
let moveDirection = 1;


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
  },
  update() {

  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      secondsElapsed: 0,
      heroText: '',
      funkMeter: 200,
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.devicePixelRatio || 1
    }

    this.objects = []
  }

  componentWillMount() {

  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  _changeHeroText = (value) => {
    this.setState({
      heroText: value
    })

    if (value === 'cuck') {
      this.shootStar()
    }
  }

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize)
    let ctx = this.refs.canvas.getContext('2d');
    this.initParticle(ctx);
    this.animate(ctx);
    this.setBackground();
  }


  animate = (ctx) => {
    requestAnimationFrame(() => this.animate(ctx));
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.objects.forEach(object => {object.update()});
  }

  initParticle = (ctx) => {
    for (let i = 0; i < 50; i++) {
      const radius = (Math.random() * 2) + 1;
      this.objects.push(new Particle(ctx, window.innerWidth/2, window.innerHeight/2, radius, this.randomColor()))
    }
  }

  shootStar(){
    const {funkMeter} = this.state;
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

    requestAnimationFrame(() => {this.shootStar()});
  }

  setBackground = () => {
    let bg = this.refs.bg.getContext('2d');
    for (let i = 0; i < 100; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      bg.beginPath();
      bg.shadowBlur = 30;
      bg.shadowColor = fillColor;
      bg.arc(x, y, Math.random() * 4, 0, Math.PI * 2, false);
      bg.fillStyle = '#fff';
      bg.fill();
    }

    // moon
    // bg.beginPath();
    // bg.shadowBlur = 100;
    // bg.shadowColor = '#fff';
    // bg.arc(window.innerWidth,0, 100, 0, Math.PI * 2, false);
    // bg.fillStyle = "#fff";
    // bg.fill()
    // this.shootStar()
  }

  // update() {
  //   let ctx = this.refs.canvas.getContext('2d');
  //   // circle
  //
  //   requestAnimationFrame(() => {this.update()});
  // }

  _handleMouseMove = (e) => {
    // console.log(e.screenX, e.screenY)
  }

  randomColor = () => {
    const colorArray = ["#47FF0A", "0AC2FF", "#FF0AC2", "#C2FF0A", "#FF0A47"];
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  render() {
    const {heroText, width, height, ratio} = this.state;
    return (
      <div onMouseMove={this._handleMouseMove} id="app">
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
        <div id="homepage-hero-text">
          <span>Designer.developer</span>
          <div id="hero-input">
            <input
              onChange={(e) => this._changeHeroText(e.target.value)}
              autoFocus='true'
              value={`${heroText}`}
              type="text"/>
          </div>
        </div>
        <div id="main-content">
          <canvas width={width * ratio} height={height * ratio} style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: -1
          }} ref='bg'/>
          
          <canvas width={width * ratio} height={height * ratio} style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: -2
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
