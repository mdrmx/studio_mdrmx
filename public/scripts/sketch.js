let cnv;
let cnvHeight;

let pg;
let charSet;
let font;
let resolution;
let mode;
let asciifier;

let inc;
let inc2 = 0.0016;
let zoff = 0;
let start = 2;

let c = [];
let diam;
let logoHeight, menuHeight, contactHeight;

let x, y;
function preload() {
  font = loadFont("../fonts/C64_Pro_Mono-STYLE.otf");
  logoHeight = document.getElementById("logo").offsetHeight;
  menuHeight = document.getElementById("menu-bar").offsetHeight;
  // contactHeight = document.getElementById("bottom-bar").offsetHeight;
  contactHeight = 0;
}

function setup() {
  pixelDensity(1);

  cnv = document.getElementById("cnv");
  createCanvas(
    windowWidth,
    windowHeight - (logoHeight + menuHeight + contactHeight),
    cnv
  );

  pg = createGraphics(width, height);
  pg.pixelDensity(1);
  mode = floor(random(2) + 1);
  charSet = "  ▔▝▔▗▘▓▔ ▔▝▗ ▔ ▓ ▜ ▟";

  if (windowWidth < 600) {
    resolution = 8;
    inc = 0.029;
  } else {
    resolution = 12;
    inc = 0.029;
  }

  c = [random(200), random(255), random(255)];

  asciifier = new Asciifier(pg, charSet, font, resolution, 1);
  startDeviceRotationDetect();
}

function draw() {
  pg.background(0);
  background(0);
  console.log(windowWidth);
  let xoff = start;
  for (let x = 0; x < pg.width; x += resolution) {
    let yoff = start;
    for (let y = 0; y < pg.height; y += resolution) {
      let nc = map(noise(xoff, yoff, zoff), 0, 1, 0, 255);
      let ng = map(noise(xoff + 10, yoff + 10, zoff + 10), 0, 1, 0, 255);
      let nb = map(noise(xoff + 20, yoff + 20, zoff + 20), 0, 1, 0, 255);
      let p1 = createVector(x, y);
      let p2 = createVector(windowWidth / 2, windowHeight / 2);
      diam = width / 1.5;
      let minDist = width;
      let dist = p1.dist(p2);
      if (dist < minDist) {
        pg.fill(nc, ng, nb);
      } else {
        pg.fill(nb, nc, ng, 100);
      }
      pg.noStroke();
      pg.rect(x, y, resolution);
      yoff += inc;
    }
    xoff += inc;
  }
  zoff += inc2;
  // start += acl.x;
  // pg.fill(255, 20);
  // pg.ellipse(width / 2, height / 2, width / 2);
  // pg.fill(random(255));
  // pg.textSize(width / 3.8);
  // pg.textAlign(CENTER, CENTER);
  // pg.text("MDRMX", width / 2, height / 2 + 50);

  pg.loadPixels();
  // image(pg, 0, 0, width, height);
  asciifier.asciify(pg);
  textSize(20);
  fill(200, 200, 0);
  strokeWeight(2);
  if (rotationX && rotationZ) {
    fill(100, 100, 250);
    // Here I am multiplying these values by 2 to get them in a range
    // that I like but I could just as easily use map()
    // Note that rotationX corresponds to left and write movement
    // and rotationY corresponds to up and down movement
    // This is because the axes of your device are reversed
    circle(xPos + rotationY * 2, yPos + rotationX * 2, 100);
  }
  text("x:" + rotationX, 10, 10);
  text("y:" + rotationY, 10, 100);
}

function windowResized() {
  logoHeight = document.getElementById("logo").offsetHeight;
  menuHeight = document.getElementById("menu-bar").offsetHeight;
  contactHeight = document.getElementById("bottom-bar").offsetHeight;

  resizeCanvas(
    windowWidth,
    windowHeight - (logoHeight + menuHeight + contactHeight),
    cnv
  );
  pg = createGraphics(
    windowWidth,
    windowHeight - (logoHeight + menuHeight + contactHeight)
  );
  if (windowWidth < 600) {
    resolution = 8;
    asciifier.resolution = 8;
    inc = 0.029;
  } else {
    resolution = 12;
    asciifier.resolution = 12;
    inc = 0.029;
  }
}

function startDeviceRotationDetect() {
  // iOS 13 added a new security wall that prevents
  // access to sensors without requesting access through the OS
  // Access must be requested inside of a mousePressed event on
  // a HTML button
  //So first we check to see if this iOS by seeing if the
  // DeviceMotionEvent.requestPermission exists as a function
  // Otherwise it is not iOS 13+ so we can skip this step
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    // If it does we make a button
    let button = createButton("click to allow access to sensors");
    let div = document.getElementById("content1");
    // button.parent(div);
    button.style("position", "relative");
    // Then we set it's text big so it is easy to see
    button.style("font-size", "28px");
    // Then we make its 'mousePressed' functionality into another function
    // we write below
    button.mousePressed(DeviceMotionEvent.requestPermission);
  }
}
