let ballz = [];
let numBallz = 80;
let maxDist = 100,
  minDist = 50;
let play = true;
function setup() {
  createCanvas(windowWidth, windowHeight, cnv);
  // pixelDensity(1);
  for (let i = 0; i < numBallz; i++) {
    let size = random(10, 30);
    ballz.push(
      new Ball(random(size, width - size), random(size, height - size), size, i)
    );
  }

  // let pos = createVector(50, 50);
  // let otherPos = createVector(80, 20);
  // let dist = pos.dist(otherPos);
  // let trig = 30 * 30 + 30 * 30;
  // let dist2 = sqrt(trig);
}

function draw() {
  background(255);
  // fill(255);
  for (let i = 0; i < ballz.length; i++) {
    for (let j = i; j < ballz.length; j++) {
      if (i != j) {
        ballz[i].checkProximity(ballz[j].pos, ballz[j].size);
        // ballz[j].show();
      }
    }
    ballz[i].run();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight, cnv);
}
