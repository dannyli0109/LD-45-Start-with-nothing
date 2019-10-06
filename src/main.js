let font
let spriteFont

let currentScene
let sceneManager

let player

// icons
let iconBattle, iconEvent, iconOpportunity


function preload() {
    font = loadFont('./assets/BitPotionExt.ttf')
    iconBattle = loadImage('./assets/icon-battle.png')
    iconEvent = loadImage('./assets/icon-event.png')
    iconOpportunity = loadImage('./assets/icon-opportunity.png')
}

function setup() {
    noSmooth();
    rectMode(CENTER)
    const canvas = createCanvas(WIDTH, HEIGHT)
    canvas.elt.id = 'game'
    player = new Player()
    sceneManager = new SceneManager()
    currentScene = sceneManager.scenes[sceneManager.index]
}

function draw() {
    background(255)
    currentScene.show()
}

function mousePressed(e) {
    currentScene.pressed()
}
