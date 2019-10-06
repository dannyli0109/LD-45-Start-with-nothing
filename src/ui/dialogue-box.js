class DialogueBox extends Box {
    constructor(x, y, w, h, text, padding = 20, border = true, fontSize = 24) {
        super(x, y, w, h)
        this.text = text
        this.padding = padding
        this.border = border
        this.fontSize = fontSize
        this.hidden = false
        this.index = 0
        this.frame = 0
        this.atTheEnd = false
    }

    show() {
        rectMode(CENTER)
        fill(255)
        rect(this.x, this.y, this.w, this.h)

        textLeading(0)
        textAlign(CENTER, CENTER)
        textFont(font)
        textSize(this.fontSize)
        fill(0)
        stroke(0)
        strokeWeight(1)

        let textToShow = this.text.split('').slice(0, this.index).join('')
        text(textToShow, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h)

        if (this.frame % 2 === 0) {
            this.index++

        }
        if (this.index > this.text.split('').length || this.atTheEnd) {
            this.index = this.text.split('').length
            this.atTheEnd = true
        }

        this.frame++
        // spriteFont.showFont(this.text, this.x, this.y, this.w, this.h)
    }

    pressed() {
        if (!this.collide()) return false
        console.log('pressed dialogue box')
    }
}