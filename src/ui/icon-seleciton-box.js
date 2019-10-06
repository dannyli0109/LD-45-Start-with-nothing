class IconSelectionBox extends Box {
    constructor(x, y, w, h, image) {
        super(x, y, w, h)
        this.image = image
    }

    show() {
        rectMode(CENTER)
        image(
            this.image,
            this.x,
            this.y,
            this.w,
            this.h,
            0,
            0,
            16,
            16
        )
        // fill(255)
        // if (this.collide()) {
        //     strokeWeight(5)
        // } else {
        //     strokeWeight(1)
        // }
        // rect(this.x, this.y, this.w, this.h)

        // let t = this.collide() ? this.hoverText : this.text
        // textLeading(0)
        // textAlign(CENTER, CENTER)
        // textFont(font)
        // textSize(this.fontSize)
        // fill(0)
        // stroke(0)
        // strokeWeight(1)
        // text(t, this.x + this.fontSize / 8, this.y - this.fontSize / 8, this.w, this.h)
    }

    pressed() {
        if (!this.collide()) return
        sceneManager.next()
    }
}