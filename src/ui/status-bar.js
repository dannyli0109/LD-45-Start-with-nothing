class StatusBar extends Box {
    constructor() {
        let x = width / 2
        let y = STATUS_BAR_HEIGHT / 2
        let w = width
        let h = STATUS_BAR_HEIGHT
        super(x, y, w, h)
        this.fontSize = 24

        this.items = ['', '', '', '', '', ''].map(item => {
            return {
                item: item,
                index: 0
            }
        })

        this.stats = ['', '', '', '', ''].map(item => {
            return {
                item: item,
                index: 0
            }
        })

        this.frame = 0
    }

    updateStatus() {
        this.items[0].item = player.name
        this.items[1].item = 'Level: ' + player.level
        this.items[2].item = 'HP: ' + player.hp + ' / ' + player.hpMax
        this.items[3].item = 'MP: ' + player.mp + ' / ' + player.mpMax
        this.items[4].item = '$: ' + player.money
        this.items[5].item = 'Material: ' + player.material

        this.stats[0].item = 'STR: ' + player.baseStr + ' + ' + player.weapon.str
        this.stats[1].item = 'INT: ' + player.int
        this.stats[2].item = 'AGI: ' + player.agi
        this.stats[3].item = 'ATTACK: ' + player.baseAttack + ' + ' + player.weapon.attack
        this.stats[4].item = 'DEFENCE: ' + player.defence
    }


    show() {
        this.updateStatus()
        // STATUS_WIDTH / 2 + i * STATUS_WIDTH, STATUS_BAR_HEIGHT / 2, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0
        this.items.forEach(({ item, index }, i) => {
            let x = STATUS_WIDTH / 2 + i * STATUS_WIDTH
            let y = STATUS_BAR_HEIGHT / 2
            let w = STATUS_WIDTH
            let h = STATUS_BAR_HEIGHT

            this.drawBox(x, y, w, h, item, index, i)
            if (this.frame % 2 === 0) {
                this.items[i].index++
            }
        })

        if (this.collide()) {
            this.stats.forEach(({ item, index }, i) => {
                let x = STATUS_WIDTH / 2
                let y = STATUS_BAR_HEIGHT / 2 + (i + 1) * STATUS_BAR_HEIGHT
                let w = STATUS_WIDTH
                let h = STATUS_BAR_HEIGHT

                this.drawBox(x, y, w, h, item, index, i)
                if (this.frame % 2 === 0) {
                    this.stats[i].index++
                }
            })
        } else {
            this.stats.forEach((_, i) => {
                this.stats[i].index = 0
            })
        }



        this.frame++
        // spriteFont.showFont(this.text, this.x, this.y, this.w, this.h)
    }

    drawBox(x, y, w, h, item, index, i) {
        rectMode(CENTER)

        fill(255)
        rect(x, y, w, h)

        textLeading(0)
        textAlign(CENTER, CENTER)
        textFont(font)
        textSize(this.fontSize)
        fill(0)
        stroke(0)
        strokeWeight(1)


        let textToShow = item.split('').slice(0, index).join('')
        text(textToShow, x + this.fontSize / 8, y - this.fontSize / 8, w, h)

        if (index > item.split('').length) {
            index = item.split('').length
        }
    }

    pressed() {
        if (!this.collide()) return false
        console.log('pressed status bar')
    }
}