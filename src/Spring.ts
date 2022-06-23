import Bob from "./Bob";
import createVector from "./CreateVector";

// type ConstrainLength = {
//   ();
// };

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
    force.add(this.anchor);

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
      b.position = p5.Vector.add(this.anchor, dir);
      // add(v1, v2)
      b.velocity.mult(0);
      // Is it too long?
    } else if (d > maxLength) {
      dir.normalize();
      dir.mult(maxLength);
      // Reset location and stop from moving (not realistic physics)
      b.position = p5.Vector.add(this.anchor, dir);
      // add(v1, v2)
      b.velocity.mult(0);
    }
  }
}
