let font
let spriteFont

let currentScene
let sceneManager

let player

// icons
let iconBattle, iconEvent, iconOpportunity, iconBoss

let swordImage

let icons = []

function preload() {
    font = loadFont('./assets/BitPotionExt.ttf')
    iconBattle = loadImage('./assets/icon-battle.png')
    iconEvent = loadImage('./assets/icon-event.png')
    iconOpportunity = loadImage('./assets/icon-opportunity.png')
    iconBoss = loadImage('./assets/icon-boss.png')
    swordImage = loadImage('./assets/sword.png')

    icons.push(...[iconBattle, iconEvent, iconOpportunity, iconBoss])
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
    if (sceneManager.index > 0) {
        sceneManager.statusBar.show()
    }
}

function mousePressed(e) {
    currentScene.pressed()
    if (sceneManager.index > 0) {
        sceneManager.statusBar.pressed()
    }
}
