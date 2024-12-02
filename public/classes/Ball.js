class Ball {
  constructor(x, y, size, id) {
    this.pos = createVector(x, y);
    this.acc = createVector(0, 0);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0.001;
    this.gravity = createVector(0.0, 0.0);
    this.wind = createVector(0.0, 0);
    this.size = size;
    // this.colour = color(0, 0, 0);
    this.colour = color(random(200, 255), random(180, 200), random(20, 10));
  }

  run() {
    this.applyForce(this.gravity);
    this.checkEdges();
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(0, 255);
    strokeWeight(1);
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  update() {
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  checkEdges() {
    if (this.pos.x > width + this.size / 2) {
      this.pos.x = -this.size / 2;
    }
    if (this.pos.x < 0 - this.size / 2) {
      this.pos.x = width + this.size / 2;
    }
    if (this.pos.y > height + this.size / 2) {
      this.pos.y = -this.size / 2;
    }
    if (this.pos.y < 0 - this.size / 2) {
      this.pos.y = height + this.size / 2;
    }
  }

  checkProximity(otherPos, sizeOther) {
    let dist = this.pos.dist(otherPos);

    if (dist < maxDist && dist > minDist) {
      stroke(0, 255);
      strokeWeight(2);
      noFill();
      beginShape();
      vertex(this.pos.x, this.pos.y);
      vertex(otherPos.x, otherPos.y);
      endShape();
    }
  }
}
