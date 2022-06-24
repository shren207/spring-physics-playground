import Bob from "./Bob";
import createVector from "./CreateVector";

export default class Spring {
  length: number;
  anchor: createVector;
  restLength: number;
  k: number = 0.2;

  constructor(x: number, y: number, length: number) {
    this.anchor = new createVector(x, y);
    this.length = length;
    this.restLength = length;
  }

  connect(bob: Bob) {
    const force = bob.position.copy();
    force.sub(this.anchor);

    let d = force.mag();
    let stretch = d - this.restLength;

    force.normalize();
    force.mult(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  constrainLength(b: Bob, minLength: number, maxLength: number) {
    const dir = b.position.copy();
    dir.sub(this.anchor);
    // sub(v1, v2)
    let d = dir.mag();
    // Is it too short?
    if (d < minLength) {
      dir.normalize();
      dir.mult(minLength);
      // Reset location and stop from moving (not realistic physics)
      const newPosition = this.anchor.copy();
      newPosition.add(dir);
      b.position = newPosition;
      // add(v1, v2)
      b.velocity.mult(0);
      // Is it too long?
    } else if (d > maxLength) {
      dir.normalize();
      dir.mult(maxLength);
      // Reset location and stop from moving (not realistic physics)
      const newPosition = this.anchor.copy();
      newPosition.add(dir);
      b.position = newPosition;
      // add(v1, v2)
      b.velocity.mult(0);
    }
  }
  render(context: CanvasRenderingContext2D) {
    // 1. render anchor
    context.beginPath();
    context.arc(this.anchor.x, this.anchor.y, 5, 0, Math.PI * 2);
    context.strokeStyle = "#FFFFFF";
    context.fillStyle = "#7F7F7F";
    context.lineWidth = 2;
    context.fill();
    context.stroke();

    // 2. render spring
    context.beginPath();
    context.moveTo(this.anchor.x, this.anchor.y);
    context.lineTo(this.anchor.x + this.length, this.anchor.y);
    context.strokeStyle = "#FFFFFF";
    context.lineWidth = 2;
    context.stroke();
  }
  // https://www.kirupa.com/canvas/drawing_multiple_things.htm
  // https://stackoverflow.com/questions/22432036/do-i-have-to-have-the-content-beginpath-and-content-closepath
}
