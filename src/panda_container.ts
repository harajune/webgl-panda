
import MovingSprite from "./moving_sprite"

const enum Collision {
  NONE,
  TOP,
  RIGHT,
  BOTTOM,
  LEFT
}

class PandaContainer {
  private _pandas = new Array<MovingSprite>()

  get length(): number {
    return this._pandas.length
  }

  public addPanda(panda: MovingSprite) {
    this._pandas.push(panda)
  }

  public movePanda(width: number, height: number) {
    for (const p of this._pandas) {
      p.move()

      switch (this._collisionDetect(p, width, height)) {
        case Collision.TOP:
          p.bounceY(1)
          
          continue
        
        case Collision.RIGHT:
          p.bounceX(1)
          continue

        case Collision.BOTTOM:
          p.bounceY(1)
          continue

        case Collision.LEFT:
          p.x = 0
          p.bounceX(1)
          continue
      }

      p.accelerate(0.5)

    }
  }

  private _collisionDetect(panda: MovingSprite, width: number, height: number): Collision {
    
    if (panda.x < 0) {
      return Collision.LEFT
    }

    if (panda.x + panda.width > width) {
      return Collision.RIGHT
    }

    if (panda.y + panda.height > height) {
      return Collision.BOTTOM
    }

    return Collision.NONE
  }

}

export default PandaContainer