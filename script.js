let circles = [];
let numCircles = 100;
let circleRadius = 2;  // Made the circles much smaller
let gridSpacing = circleRadius * 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let cols = floor(width / gridSpacing);
  let rows = floor(height / gridSpacing);
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let posX = x * gridSpacing + gridSpacing / 2;
      let posY = y * gridSpacing + gridSpacing / 2;
      circles.push(new Circle(posX, posY));
    }
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
    this.radius = circleRadius;
    this.moving = false;
  }

  update() {
    let mouse = createVector(mouseX, mouseY);
    let d = dist(mouse.x, mouse.y, this.position.x, this.position.y);
    if (d < 100 && !this.moving) {  // Increased interaction distance
      let force = p5.Vector.sub(this.position, mouse);
      force.setMag(5 / d);
      this.position.add(force);
      this.moving = true;
    }

    for (let other of circles) {
      if (other !== this && this.isOverlapping(other)) {
        let overlap = p5.Vector.sub(this.position, other.position).setMag(this.radius);
        other.position.add(overlap);
        other.moving = true;
      }
    }
  }

  isOverlapping(other) {
    let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    return d < this.radius * 2;
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
