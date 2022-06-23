import createVector from "./CreateVector";

export default class Bob {
  position: createVector;
  velocity: createVector;
  acceleration: createVector;
  mass: number;
  damping: number;
  dragOffset: createVector;
  dragging: boolean;

  constructor(x: number, y: number) {
    this.position = new createVector(x, y); // https://p5js.org/ko/reference/#/p5.Vector
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.mass = 24;
    // Arbitrary damping to simulate friction / drag
    this.damping = 0.98;
    // For user interaction
    this.dragOffset = new createVector(0, 0);
    this.dragging = false;
  }

  // Standard Euler integration
  update() {
    // move the bob
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Newton's law: F = M * A
  applyForce(force: createVector) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  display(context: CanvasRenderingContext2D) {
    // draw(render) the bob
    context.arc(this.position.x, this.position.y, this.mass, 0, 2 * Math.PI);
    context.strokeStyle = "#FFFFFF";
    context.fillStyle = "#7F7F7F";
    context.lineWidth = 2;
    context.fill();
    context.stroke();
    if (this.dragging) {
      context.strokeStyle = "#c8c8c8";
      context.fill();
    }
  }

  handleClick(mx: number, my: number) {
    let d = Math.sqrt(
      Math.abs(mx - this.position.x) ** 2 + Math.abs(my - this.position.y) ** 2
    );
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx: number, my: number) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}
