class Particle {
  constructor(ctx, x, y, radius, color) {
    this.originalPosition = {
      x: x,
      y: y
    }
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    // spinning velocity, remove to remove spin effect
    this.velocity = 0.0003;
    this.distanceFromCenter = this.randomIntFromRange(0, window.innerWidth/2)
  }


  randomIntFromRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update = (mouse, shoot = false) => {
    const lastPoint = {
      x: this.x,
      y: this.y
    }

    // drag effect
    this.originalPosition.x += (mouse.x - this.originalPosition.x) * (Math.random() * 0.002);
    this.originalPosition.y += (mouse.y - this.originalPosition.y) * (Math.random() * 0.002);
    this.radians += this.velocity
    this.x = this.originalPosition.x + Math.cos(this.radians) * this.distanceFromCenter
    this.y = this.originalPosition.y + Math.sin(this.radians) * this.distanceFromCenter
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

export default Particle;
