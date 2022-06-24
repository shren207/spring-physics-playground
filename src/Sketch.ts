import "./style.css";
import Bob from "./Bob";
import Spring from "./Spring";
import CreateVector from "./CreateVector";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Spring Physics</h1>
`;

export default class App {
  static instance: App;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  delta: number = 0;
  startTime: number;
  frameRequestHandle: number;
  spring: Spring;
  bob: Bob;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.canvas = document.createElement("canvas");
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.canvas.addEventListener("mousedown", this.mousePressed);
    this.canvas.addEventListener("mousemove", this.mouseDragged);
    this.canvas.addEventListener("mouseup", this.mouseReleased);
    // this.canvas.addEventListener("drag", this.mouseDragged);

    this.context = this.canvas.getContext("2d")!;
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.spring = new Spring(this.canvas.width / 2, 10, 100);
    this.bob = new Bob(this.canvas.width / 2, 100);
    app.appendChild(this.canvas);
  }

  mousePressed = (event: MouseEvent) => {
    // event type : https://www.w3schools.com/jsref/dom_obj_event.asp (여기서 확인가능)
    const shiftX = event.clientX - this.canvas.getBoundingClientRect().left;
    const shiftY = event.clientY - this.canvas.getBoundingClientRect().top;
    this.bob.handleClick(shiftX, shiftY);
  };

  mouseDragged = (event: MouseEvent) => {
    if (!this.bob.dragging) {
      return;
    }
    const shiftX = event.clientX - this.canvas.getBoundingClientRect().left;
    const shiftY = event.clientY - this.canvas.getBoundingClientRect().top;
    this.bob.handleDrag(shiftX, shiftY);
  };

  mouseReleased = () => {
    this.bob.stopDragging();
  };

  frameRequest = () => {
    // p5.js에서 draw 역할을 하는 함수.
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // fill canvas background
    this.context.fillStyle = "#333333";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const gravity = new CreateVector(0, 2);
    this.bob.applyForce(gravity);

    this.spring.connect(this.bob);
    this.spring.constrainLength(this.bob, 30, 200);

    this.bob.update();

    this.spring.displayLine(this.bob, this.context);
    this.bob.display(this.context);
    this.spring.displayAnchor(this.context);
  };
}

window.addEventListener("load", () => {
  new App();
});
