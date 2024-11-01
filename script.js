let circles = [];
let numCircles = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numCircles; i++) {
    let angle = random(TWO_PI);
    let radius = random(100, min(width, height) / 2);
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);
    circles.push(new Circle(x, y));
  }
}

function draw() {
  background(0);
  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}

class Circle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.originalPosition = this.position.copy();
    this.radius = 5;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let d = dist(mouse.x, mouse.y, this.position.x, this.position.y);
    if (d < 150) {  // Increased the interaction distance
      let force = p5.Vector.sub(this.position, mouse);
      force.setMag(10 / d);  // Increased the magnitude of the force
      this.position.add(force);
    } else {
      // Return to original position if not affected by mouse
      this.position.lerp(this.originalPosition, 0.05);
    }
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

