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
    App.instance = this;

    this.canvas = document.createElement("canvas");
    this.canvas.width = 640;
    this.canvas.height = 360;
    this.delta = 0;
    this.context = this.canvas.getContext("2d")!;
    // this.context.fillStyle = "black";
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.spring = new Spring(this.canvas.width / 2, 10, 100);
    this.bob = new Bob(this.canvas.width / 2, 100);
    app.appendChild(this.canvas);
  }

  frameRequest = () => {
    // draw 역할을 하는 함수.
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

    // 이런 식으로 작성하면 안됨
    // this.spring.render(this.context);
    // this.bob.render(this.context);
    // this.spring.connect(this.bob);

    // 1. update를 하고,
    // 2. render(display)를 한다.
  };
}

window.addEventListener("load", () => {
  new App();
});
