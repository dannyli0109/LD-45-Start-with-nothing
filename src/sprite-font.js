class SpriteFont {
    constructor() {
        this.map = `ABCDEFGHIJKLMNOPQRSTUVWXYZ    abcdefghijklmnopqrstuvwxyz    1234567890!?.%;:$#'"/\\()&*+,-<>=@[]^_\`{}°€£~™`.split('').reduce(
            (obj, ele, index) => {
                if (!obj[ele]) {
                    obj[ele] = index
                }
                return obj
            }, {}
        )
        this.spriteWidth = 7
        this.spriteHeight = 7
        this.w = 10
        this.h = 11
        this.spacingX = 0
        this.spacingY = 2
        this.charWidth = 7
        this.charHeight = 7
        this.padding = 10
    }

    showFont(text, x, y, boxWidth, boxHeight) {
        tint(0, 0, 0)
        imageMode(CENTER)

        let textArr = text.split('')

        textArr.forEach((char, i) => {
            let index = this.map[char]
            let charX = index % this.w
            let charY = Math.floor(index / this.w)

            noSmooth()

            let maxFit = Math.floor((boxWidth - this.padding * 2) / this.charWidth)
            // console.log(maxFit)

            let row = Math.floor(i / (maxFit - 1))

            let rows = Math.floor(textArr.length / maxFit)
            // console.log(row)
            image(fontSprite,
                x + this.padding / 2 + (i % (maxFit - 1)) * (this.charWidth + this.spacingX) - (maxFit - 1) * (this.charWidth + this.spacingX) / 2 - this.padding / 2,
                y + row * (this.charHeight + this.spacingY) - rows * (this.charHeight + this.spacingY) / 2,
                this.charWidth, this.charHeight,
                charX * this.spriteWidth, charY * this.spriteHeight, this.spriteWidth, this.spriteHeight)
        })
    }
}