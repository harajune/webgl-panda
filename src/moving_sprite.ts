import * as PIXI from "pixi.js"

class MovingSprite extends PIXI.Sprite {
  public vx = 0.0
  public vy = 0.0

  constructor(...parameters: any) {
    super(...parameters)
  }

  public move() {
    this.x += this.vx
    this.y += this.vy
  }

  public accelerate(gravity: number) {
    this.vy += gravity
  }

  public bounceX(x: number) {
    this.vx = -1 * this.vx * x
  }

  public bounceY(y: number) {
    this.vy = -1 * this.vy * y
  }

}

export default MovingSprite