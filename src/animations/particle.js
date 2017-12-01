import {react, Component} from 'react';

class Particle extends Component {
  constructor(ctx, x, y, radius, color) {
    super();
    this.state = {
      originalXPosition: x,
      originalYPostition: y
    }
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = this.randomIntFromRange(50,120)
  }


  randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update = () => {
    const {originalXPosition, originalYPostition} = this.state;
    const lastPoint = {
      x: this.x,
      y: this.y
    }
    this.radians += this.velocity
    this.x = originalXPosition + Math.cos(this.radians) * this.distanceFromCenter
    this.y = originalYPostition + Math.sin(this.radians) * this.distanceFromCenter
    this.draw(this.ctx, lastPoint);
  }

  draw = (ctx, lastPoint) => {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.radius;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export default Particle
