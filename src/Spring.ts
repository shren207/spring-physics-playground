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
    force.add(this.anchor);

    let d = force.mag();
    let stretch = d - this.restLength;

    force.normalize();
    force.mult(-1 * this.k * stretch);

    bob.applyForce(force);
  }
}
