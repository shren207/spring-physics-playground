class Spring {
  constructor(x, y, length) {
    this.anchor = createVector(x, y);
    this.restLength = length;
    this.k = 0.2;
  }
  // Calculate and apply spring force
  connect(bob) {
    // Vector pointing from anchor to bob location
    let force = p5.Vector.sub(bob.position, this.anchor);
    // What is distance
    let d = force.mag();
    // Stretch is difference between current distance and rest length
    let stretch = d - this.restLength;

    // Calculate force according to Hooke's Law
    // F = k * stretch
    force.normalize();
    force.mult(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  // Constrain the distance between bob and anchor between min and max
  constrainLength(b, minLength, maxLength) {
    let dir = p5.Vector.sub(b.position, this.anchor);
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

  displayAnchor() {
    // 여기가 anchor
    // "#222555"
    stroke(255); // https://p5js.org/ko/reference/#/p5/stroke
    fill(127); // https://p5js.org/ko/reference/#/p5/fill
    strokeWeight(2); // https://p5js.org/ko/reference/#/p5/strokeWeight
    ellipse(this.anchor.x, this.anchor.y, 10); // https://p5js.org/ko/reference/#/p5/ellipse
  }

  displayLine(b) {
    // 여기가 spring
    // b: Bob;
    strokeWeight(2);
    stroke(255);
    line(b.position.x, b.position.y, this.anchor.x, this.anchor.y); // https://p5js.org/ko/reference/#/p5/line
  }
}
