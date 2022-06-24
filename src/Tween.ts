type Easing = (t: number) => number;
type Subscription = (x: number) => void;

export class Tween {
  constructor(
    from: number,
    to: number,
    easing: Easing = (t) => t,
    duration: number = 1000
  ): Tween {}

  start(): void {}

  stop(): void {}

  reset(): void {}

  subscribe(subscription: Subscription): void {}

  unsubscribe(subscription: Subscription): void {}
}

const a = new Tween(0, 1, 1000);

a.start();
a.stop();
a.reset();

a.subscribe((x: number) => {});

a.subscribe((x: number) => {});
