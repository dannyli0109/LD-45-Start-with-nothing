class ImageBox extends Box {
    constructor(x, y, w, h, image, imageWidth = 128, imageHeight = 128) {
        super(x, y, w, h)

        this.image = image

        this.imageWidth = imageWidth
        this.imageHeight = imageHeight * (24 / 16)

        this.frame = 0
    }

    show() {
        rectMode(CENTER)
        fill(255)
        rect(this.x, this.y, this.w, this.h)

        noSmooth()
        imageMode(CENTER)

        image(
            this.image,
            this.x,
            this.y + 10,
            this.imageWidth,
            this.imageHeight,
            0,
            0,
            16,
            24
        )
        this.frame++
    }

    pressed() {
        if (!this.collide()) return false
        console.log('pressed dialogue box')
    }
}