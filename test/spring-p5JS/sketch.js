// Mover object
let bob;

// Spring object
let spring;

function setup() {
  createCanvas(640, 360); // https://p5js.org/ko/reference/#/p5/createCanvas
  setFrameRate(60); // https://p5js.org/ko/reference/#/p5.Image/setFrame
  // Create objects at starting position
  // Note third argument in Spring constructor is "rest length"
  spring = new Spring(width / 2, 10, 100);
  bob = new Bob(width / 2, 100);
}

function draw() {
  // 원래 무언가를 display하려면 HTML5에서는 context를 argument로 보내줘야 하는데,
  // p5.js에서는 아무것도 보내줄 필요없이 그냥 함수를 호출하기만 하면 된다.

  // draw가 일종의 frameRequest 역할을 하는 듯.
  background(51); // https://p5js.org/ko/reference/#/p5/background (색깔 정하는 옵션)

  // Apply a gravity force to the bob
  let gravity = createVector(0, 2);
  bob.applyForce(gravity);

  // Connect the bob to the spring (this calculates the force)
  spring.connect(bob);
  // Constrain spring distance between min and max
  spring.constrainLength(bob, 30, 200);

  // Update bob
  bob.update();

  // Draw everything
  spring.displayLine(bob); // Draw a line between spring and bob
  bob.display(); // p5.js는 render
  spring.displayAnchor();
}

function mousePressed() {
  bob.handleClick(mouseX, mouseY);
}

function mouseDragged() {
  bob.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  bob.stopDragging();
}
