class SelectionBox extends Box {
    constructor(x, y, w, h, text, hoverText) {
        super(x, y, w, h)
        this.padding = 10
        this.text = text
        this.fontSize = 24
        this.hoverText = hoverText ? hoverText : text
        this.hoverDistance = 10
    }

    show() {
        rectMode(CENTER)
        fill(255)
        if (this.collide()) {
            strokeWeight(5)
        } else {
            strokeWeight(1)
        }
        rect(this.x, this.y, this.w, this.h)

        let t = this.collide() ? this.hoverText : this.text
        textLeading(0)
        textAlign(CENTER, CENTER)
        textFont(font)
        textSize(this.fontSize)
        fill(0)
        stroke(0)
        strokeWeight(1)
        text(t, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h)
    }

    pressed() {
        if (!this.collide()) return
        sceneManager.next()
    }
}