export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  lengthSquared(): number {
    return this.x * this.x + this.y * this.y;
  }
  length(): number {
    return Math.sqrt(this.lengthSquared());
  }
  clone(): Vector2D {
    return new Vector2D(this.x, this.y);
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
  }
  normalize(): number {
    const length = this.length();
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
    return this.length();
  }
  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }
  incrementBy(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
  }
  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }
  decrementBy(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
  }
  scaleBy(k: number) {
    this.x *= k;
    this.y *= k;
  }
  dotProduct(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }
  static distance(v1: Vector2D, v2: Vector2D): number {
    return v1.subtract(v2).length();
  }
  static angleBetween(v1: Vector2D, v2: Vector2D): number {
    return Math.acos(v1.dotProduct(v2) / (v1.length() * v2.length()));
  }
}
