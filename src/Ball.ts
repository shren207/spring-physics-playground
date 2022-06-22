import Vector2D from "./Vector";

export default class Ball {
  radius: number;
  color: string;
  mass: number;
  charge: number;
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;

  constructor(
    radius: number = 20,
    color: string = "#0000ff",
    mass: number = 1,
    charge: number = 0
  ) {
    this.radius = radius;
    this.color = color;
    this.mass = mass;
    this.charge = charge;
  }

  get pos2D(): Vector2D {
    return new Vector2D(this.x, this.y);
  }
  set pos2D(pos: Vector2D) {
    this.x = pos.x;
    this.y = pos.y;
  }
  get velo2D(): Vector2D {
    return new Vector2D(this.vx, this.vy);
  }
  set velo2D(velo: Vector2D) {
    this.vx = velo.x;
    this.vy = velo.y;
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }
}
