export default class CreateVector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  copy() {
    // p5.js => https://p5js.org/reference/#/p5.Vector/copy
    // call signature : v2 = v1.copy()
    return new CreateVector(this.x, this.y);
  }
  normalize() {
    // p5.js => https://p5js.org/ko/reference/#/p5.Vector/normalize
    // call signature : v1.normalize()
    const length = Math.sqrt(this.x ** 2 + this.y ** 2);
    if (length > 0) {
      this.x /= length;
      this.y /= length;
    }
  }
  add(v) {
    // p5.js => https://p5js.org/reference/#/p5.Vector/add
    // call signature 1 : v1.add(v2)
    // call signature 2 : v3 = p5.vector.add(v1, v2)
    this.x += v.x;
    this.y += v.y;
    // === incrementBy (in spring-vanillaJS)
  }
  sub(v) {
    // p5.js => https://p5js.org/reference/#/p5.Vector/sub
    // call signature 1 : v1.sub(v2)
    // call signature 2 : v3 = p5.vector.sub(v1, v2)
    this.x -= v.x;
    this.y -= v.y;
    // === decrementBy (in spring-vanillaJS)
  }
  div(n) {
    // p5.js => https://p5js.org/reference/#/p5.Vector/div
    this.x /= n;
    this.y /= n;
  }
  mult(n) {
    // p5.js => https://p5js.org/reference/#/p5.Vector/mult
    this.x *= n;
    this.y *= n;
  }
}
