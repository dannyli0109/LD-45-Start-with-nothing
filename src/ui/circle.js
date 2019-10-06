class Circle {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }
    show() {
        rectMode(CENTER)
        fill(255)
        if (this.collide()) {
            fill(255, 0, 0)
        }
        ellipse(this.x, this.y, this.r * 2, this.r * 2)
    }

    collide() {
        if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
            return true
        }
        return false
    }
}