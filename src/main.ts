import "./style.css";
import Bob from "./Bob";

const app = document.querySelector<HTMLDivElement>("#app")!;
let bob: Bob = new Bob(100, 100);

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
    bob.display(this.context);
  }
}

window.addEventListener("load", () => {
  new App();
});
