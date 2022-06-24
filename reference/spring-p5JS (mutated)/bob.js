class Bob {
  constructor(x, y) {
    this.position = createVector(x, y); // https://p5js.org/ko/reference/#/p5.Vector
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 24;
    // Arbitrary damping to simulate friction / drag
    this.damping = 0.98;
    // For user interaction
    this.dragOffset = createVector();
    this.dragging = false;
  }

  // Standard Euler integration
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Newton's law: F = M * A
  applyForce(force) {
    // force is a p5.Vector
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Draw the bob
  display() {
    stroke(255);
    strokeWeight(2);
    fill(127);
    if (this.dragging) {
      fill(200);
    }
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
  }

  handleClick(mx, my) {
    let d = Math.sqrt(
      Math.abs(mx - this.position.x) ** 2 + Math.abs(my - this.position.y) ** 2
    );
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
    console.log(`mx : ${mx}`);
    console.log(`my : ${my}`);
    console.log(`X : ${this.position.x}`);
    console.log(`Y : ${this.position.y}`);
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}
