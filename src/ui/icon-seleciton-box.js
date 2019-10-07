class IconSelectionBox extends Box {
    constructor(x, y, w, h, type) {
        super(x, y, w, h)
        this.type = type
        this.image = icons[type]

        this.scale = 1.2

        this.hoverWidth = this.w * this.scale
        this.hoverHeight = this.h * this.scale

        this.currentWidth = this.w
        this.currentHeight = this.h
    }

    show() {
        noSmooth()
        imageMode(CENTER)

        if (this.collide()) {
            this.currentWidth = lerp(this.currentWidth, this.hoverWidth, 0.1)
            this.currentHeight = lerp(this.currentHeight, this.hoverHeight, 0.1)
        } else {

            this.currentWidth = lerp(this.currentWidth, this.w, 0.1)
            this.currentHeight = lerp(this.currentHeight, this.h, 0.1)
        }

        image(
            this.image,
            this.x,
            this.y,
            this.currentWidth,
            this.currentHeight,
            0,
            0,
            16,
            16
        )
    }

    pressed() {
        if (!this.collide()) return
        switch (this.type) {
            case EVENT:
                currentScene.events.push(sceneManager.events[0]())
                currentScene.index++
                // sceneManager.next()
                break;
            case BATTLE:
                currentScene.events.push(sceneManager.createBattle(CREEP))
                currentScene.index++
                break
            case BOSS:
                currentScene.events.push(sceneManager.createBattle(BOSS))
                currentScene.index++
                break
            case OPPORTUNITY:
                currentScene.events.push(sceneManager.opportunity[0]())
                currentScene.index++
                break;
            default:
                break;
        }
        // console.log(this.type)
        // sceneManager.next()
    }
}