class Asciifier {
  constructor(img, chars, font, res, c) {
    this.srcImage = img;
    this.font = font;
    this.resolution = res;
    this.c = c;
    this.chars = chars;
    this.ascii = [];
    for (let i = 0; i < 256; i++) {
      let index = int(map(i, 0, 256, 0, chars.length));
      this.ascii[i] = this.chars.charAt(index);
    }
  }

  asciify(srcImage) {
    let wordFlash = ["M", "D", "R", "M", "X"];
    // srcImage.loadPixels();
    for (let i = 0; i < srcImage.width; i += this.resolution) {
      for (let j = 0; j < srcImage.height; j += this.resolution) {
        const pixelIndex = (i + j * srcImage.width) * 4;
        const r = srcImage.pixels[pixelIndex];
        const g = srcImage.pixels[pixelIndex + 1];
        const b = srcImage.pixels[pixelIndex + 2];
        const avg = int((r + g + b) / 3);

        const clr = color(r, g, b);
        // noStroke();
        strokeWeight(1);
        if (this.c === 1) fill(240, 248, 255, 255);
        else if (this.c === 2) fill(clr);
        // textFont(font);
        textSize(this.resolution);
        textAlign(CENTER, CENTER);
        text(this.ascii[avg], i, j);
      }
    }
  }
}
