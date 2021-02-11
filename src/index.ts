import * as PIXI from "pixi.js"
import MovingSprite from "./moving_sprite"
import PandaContainer from "./panda_container"

// assets
import pandaImage from "./img/panda.png"

const app = new PIXI.Application({width: 400, height: 300})

document.getElementById("stage")?.appendChild(app.view)

app.renderer.view.style.position = "absolute"
app.renderer.view.style.display = "block"
app.renderer.resize(window.innerWidth, window.innerHeight)

PIXI.Loader.shared
  .add(pandaImage)
  .load(setup)

let pandaContainer = new PandaContainer()
let counter: PIXI.Text

function setup() {
  const panda = new MovingSprite(
    PIXI.Loader.shared.resources[pandaImage].texture
  )
  
  panda.x = 96
  panda.y = 96

  app.stage.addChild(panda)

  pandaContainer.addPanda(panda)

  app.renderer.plugins.interaction.on('pointerdown', onClick)

  const textStyle = new PIXI.TextStyle({
    fontSize: 36,
    fill: "white",
    strokeThickness: 4
  })

  counter = new PIXI.Text("1 pandas", textStyle)
  app.stage.addChild(counter)

  app.ticker.add(delta => gameLoop(delta))
  
}

function gameLoop(delta: number) {
  pandaContainer.movePanda(app.renderer.width, app.renderer.height)
}

function onClick(event: PIXI.InteractionEvent) {
  const position = event.data.global
  addRandomPanda(position.x, position.y)
  counter.text = `${pandaContainer.length} pandas`
}

function addRandomPanda(positionX: number, positionY: number) {

  for (let i = 0; i < 10; i++) {
    const panda = new MovingSprite(
      PIXI.Loader.shared.resources[pandaImage].texture
    )

    const scale = Math.random() * 0.5 + 0.5
    const speedX = Math.random() * 20 - 10

    panda.x = positionX
    panda.vx = speedX
    panda.y = positionY
    panda.scale.x = scale
    panda.scale.y = scale

    pandaContainer.addPanda(panda)

    app.stage.addChild(panda)

    }
}


// https://github.com/kittykatattack/learningPixi