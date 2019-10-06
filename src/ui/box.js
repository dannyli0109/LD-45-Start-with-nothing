class Box {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    show() {
        rectMode(CENTER)
        fill(255)
        if (this.collide()) {
            fill(255, 0, 0)
        }
        rect(this.x, this.y, this.w, this.h)
    }

    collide() {
        if (mouseX >= this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY >= this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
            return true
        }
        return false
    }


    pressed() {
        if (!this.collide()) return
        console.log('pressed box')
    }
}