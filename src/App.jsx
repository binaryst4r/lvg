import React, { Component } from 'react';
import mycon from './images/mycon-gradient-neon.png';
import larry from './images/larry.jpg';
import Particle from './animations/particle';
import styles from './app.scss';
const colorArray = ["#f9c80e", "f86624", "#ea3546", "#662e9b", "#43bccd"]
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
      showConfirmation: false,
      email: '',
      favoriteMovie: '',
      message: '',
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

  sendMail = (email, favoriteMovie, message) => {

    let headers = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })

    let init = {
      method: 'POST',
      headers: headers,
      mode: 'no-cors',
      cache: 'default',
      body: JSON.stringify({email: email, favorite_movie: favoriteMovie, message: message})
    }
    fetch("https://lvg-api.herokuapp.com/webhooks/sendgrid", init).then((response) => {
      this.setState({
        showConfirmation: true
      })

      setTimeout(() => this.setState({
        showConfirmation: false,
        message: '',
        email: '',
        favoriteMovie: ''
      }), 5000)
    })
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

  scrollToContent = () => {
    let windowHeight = window.innerHeight;
    window.scrollTo({top: windowHeight, behavior: 'smooth'})
    this._handleScroll()
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
      invertNav: window.scrollY >= window.innerHeight - 30,
      scrollY: window.scrollY
    })
  }

  randomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  submitForm = (e) => {
    e.preventDefault()
    const {email, favoriteMovie, message} = this.state;
    if (email && favoriteMovie && message) {
      this.sendMail(email, favoriteMovie, message)
    }
  }

  render() {
    const {
      width,
      height,
      ratio,
      scrollY,
      email,
      favoriteMovie,
      message
    } = this.state;

    return (
      <div className="app">
        <nav
          className={this.state.invertNav ? styles.inverted_navigation : styles.main_navigation}>
          <div className={styles.nav_brand}>
            <img alt="" src={mycon} />
            <h1>
              Larry Gust
            </h1>
          </div>
          <h2
            style={{opacity: this.state.invertNav ? '1' : '0'}}
            className={styles.developer_designer}>
            Full Stack Engineer
          </h2>
          <div className={styles.nav_links}>
            <a
              href="https://www.github.com/binaryst4r"
              target="_blank"
              rel="noopener noreferrer">
              GitHub
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/larryvgust"
              rel="noopener noreferrer">
              LinkedIn
            </a>
            <a
              target="_blank"
              href="//lvgweb.s3.us-east-2.amazonaws.com/resume-2022.pdf"
              rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </nav>

        <div onMouseMove={this._handleMouseMove}  className={styles.top_hero}>
          <h2 style={{opacity: 1 - `${scrollY/500}`}}>
            Stay <span className={styles.funky}>Creative</span>
          </h2>

          <div onClick={() => this.scrollToContent()} className={styles.see_more}>
            see more<br/>
            &darr;
            &darr;
          </div>
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
          className={styles.main_content}>
          <section className={styles.intro_header}>
            <img alt="Larry Gust" className={styles.lvg_img} src={larry}/>
            <p>
              I'm Larry - a web developer with a knack for creating awesome user experiences.
              I'm currently living an working out of Denver, CO and loving it! At the moment, 
              I am digging using React / TypeScript and tailwindcss for building UIs.
            </p>
            <span><b>Other technology I've been using:</b></span><br/>
            <ul>
              <li>
                GraphQL
              </li>
              <li>
                AWS
              </li>
              <li>
                Ruby (on or off Rails)
              </li>
              <li>
                Firebase
              </li>
              <li>
                Terraform
              </li>
            </ul>
          </section>

          <section>
            <h3>My philosophy</h3>
            <p>
              Do what you love, love what you do.
            </p>
          </section>

          <section>
            <h3>About Me</h3>
            <p>
              Born and raised just outside Chicago, IL. I have been a professional engineer since 2013 - working for myself, startups, and even a fortune 6 company.
              Most of my experience has been working within the startup world, I enjoy the fast paced nature and wearing 
              multiple hats.
            </p>
            <p>
              In my free time I love to golf, game, see live music, camp, and ski! I also code for fun, and hope one day one of my many
              half-complete app endeavors will be useful 😄
            </p>
          </section>

          <section>
            <h3>Get in touch!</h3>
            <p>
              Even if I am working full time, I would love to hear your idea!
            </p>

            {this.state.showConfirmation ?
              <div className={styles.confirmation}>
                <img
                  alt="thanks"
                  className={styles.thanks}
                  src="https://media.giphy.com/media/KJ1f5iTl4Oo7u/giphy.gif"/>
                <br/>
                <center>
                  <p>I'll be in touch soon!</p>
                </center>

              </div>
            :
              <form
                onSubmit={this.submitForm}
                className={styles.contact_form}>
                <div className={styles.form_field}>
                  <input
                    placeholder="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => this.setState({email: e.target.value})}/>
                </div>
                <div className={styles.form_field}>
                  <input
                    onChange={(e) => this.setState({favoriteMovie: e.target.value})}
                    placeholder="What's your favorite movie?"
                    type="text"
                    value={favoriteMovie}/>
                </div>
                <div className={styles.form_field}>
                  <textarea
                    onChange={(e) => this.setState({message: e.target.value})}
                    placeholder="Introduce yourself..."
                    rows="5"
                    value={message}/>
                </div>

                <button className={styles.primary_button} type="submit">
                  Submit
                </button>
              </form>
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
