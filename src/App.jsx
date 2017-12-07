import React, { Component } from 'react';
import mycon from './images/mycon-gradient-neon.png';
import larry from './images/larry.jpg';
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
    ctx.strokeStyle = "#fff";
    ctx.lineWidth =  Math.random() * 10;
    ctx.moveTo(Math.random() * window.innerWidth);
    ctx.lineTo()
    ctx.stroke();
    ctx.closePath();
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
      funkMeter: 20,
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: 1,
      scrollY: 0,
      particleCtx: null,
      invertNav: false,
      mouse: {
        x: window.innerWidth/2,
        y: window.innerHeight/2
      }
    }

    this.objects = []
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount() {
    window.addEventListener('resize',  this.handleResize);
    window.addEventListener('scroll',  this._handleScroll);
    // window.addEventListener('click',  this.shootStar);
    let particleCtx = this.refs.canvas.getContext('2d');
    this.setState({
      particleCtx: particleCtx,
      mouse: {
        x: window.screenX,
        y: window.screenY
      }
    })
    this.initParticle(particleCtx);
    this.animate(particleCtx);
    this.setBackground();
  }


  animate = (particleCtx) => {
    requestAnimationFrame(() => this.animate(particleCtx));
    particleCtx.fillStyle = 'rgba(0,0,0,0.05)';
    particleCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    this.objects.forEach(object => {object.update(this.state.mouse)});
  }

  initParticle = (particleCtx) => {
    const startingX = this.state.mouse.x;
    const startingY = this.state.mouse.y;
    for (let i = 0; i < 150; i++) {
      const radius = (Math.random() * 3) + 1;
      this.objects.push(new Particle(particleCtx, startingX, startingY, radius, this.randomColor()))
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
    for (let i = 0; i < 250; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
      bg.beginPath();
      bg.shadowBlur = 30;
      bg.shadowColor = "#fff";
      bg.arc(x, y, Math.random() * 4, 0, Math.PI * 2, false);
      bg.fillStyle = '#fff';
      bg.fill();
    }

    // moon
    bg.beginPath();
    bg.shadowBlur = 20;
    bg.shadowColor = '#fff';
    bg.arc(window.innerWidth,0, 40, 0, Math.PI * 2, false);
    bg.fillStyle = "#fff";
    bg.fill()
    // this.shootStar()
  }

  // update() {
  //   let ctx = this.refs.canvas.getContext('2d');
  //   // circle
  //
  //   requestAnimationFrame(() => {this.update()});
  // }

  _handleMouseMove = (e) => {
    this.setState({
      mouse: {
        x: e.screenX,
        y: e.screenY
      }
    })
  }

  _handleScroll = () => {
    this.setState({
      invertNav: window.scrollY > window.innerHeight-40,
      scrollY: window.scrollY
    })
  }

  randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  render() {
    const {heroText, width, height, ratio, scrollY} = this.state;

    return (
      <div id="app">
        <nav
          className={this.state.invertNav ? 'inverted' : ''}
          id='main-navigation'>
          <div id="nav-brand">
            <img alt="" src={mycon} id="mycon"/>
            <h1>
              Larry Gust
            </h1>
          </div>

          <div id="nav-links">
            <a href="https://www.github.com/binaryst4r" target="_blank">github</a>
            <a>linkedin</a>
          </div>
        </nav>

        <div onMouseMove={this._handleMouseMove}  id="top-hero">
          <h2 style={{opacity: 1 - `${scrollY/500}`}}>
            <span className="funky">Experience</span> the Web
          </h2>
          {/* <p className="subheader">
            (move mouse for more effect)
          </p> */}
          <canvas width={width * ratio} height={height * ratio} style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: -1
          }} ref='bg'/>

          <canvas width={width * ratio} height={height * ratio} style={{
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: -2
          }} ref='canvas'/>
        </div>

        <div
          style={{top: window.innerHeight}}
          id="main-content">
          <img id="lvg-img" src={larry}/>
          <section id="top-section">
            <h2>Developer.designer( )</h2>
            <p>
              I'm Larry - a web developer with a knack for creating awesome user experiences.
              I'm currently living in my hometown of Chicago, IL and working as a freelance web developer.
              At the moment, I am digging react, using a ruby backend when needed.
            </p>

          </section>

          <section>
            <h3>My philosophy</h3>
            <p>
              Whether it's a simple website, or a complex web-application, the focus should be on users of the product.
              Knowing how to <em>design for your user</em> is the key to providing the best experience.
            </p>
          </section>

          <section>
            <h3>Background</h3>
            <p>
              I've worked on projects in a wide array of industries, doing design and development. Most recently,
              I worked with a startup called <a href="https://www.getwiseapple.com">Wise Apple</a>,
              where I built and managed the consumer-facing web platform, as well as the internal tools, with 2 other devs.
            </p>
          </section>

          <section className="wrapper">
            <div className="content">
              <h3>Get in touch!</h3>
              <p>
                I am currently taking new work so please hit me up if you have a cool idea!
                I am also open to full time opportunities with the right company. Cheers!
              </p>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
