import "./style.css";
import Bob from "./Bob";
import Spring from "./Spring";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Spring Physics</h1>
  <canvas width="640" height="480"></canvas>
`;

export default class App {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  // delta: number;
  startTime: number;
  // frameRequestHandle: number;

  spring: Spring;
  bob: Bob;

  constructor() {
    this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.canvas.width = 640;
    this.canvas.height = 360;
    // this.delta = 0;
    this.context = this.canvas.getContext("2d")!;
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.startTime = Date.now();
    // this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    this.spring = new Spring(this.canvas.width / 2, 10, 100);
    this.bob = new Bob(this.canvas.width / 2, 100);
    // this.bob.display(this.context);
  }
}

window.addEventListener("load", () => {
  new App();
});
