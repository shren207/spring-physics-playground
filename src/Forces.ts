import Vector2D from "./Vector";

export default class Forces {
  static zeroForce(): Vector2D {
    return new Vector2D(0, 0);
  }
  constantGravity(mass: number, g: number): Vector2D {
    return new Vector2D(0, mass * g);
  }
}
