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

        this.equipments = [''].map(item => {
            return {
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

        this.stats[0].item = 'STR: ' + player.baseStr + '(+' + (player.weapon.str + player.armor.str) + ')'
        this.stats[1].item = 'INT: ' + player.baseInt + '(+' + (player.weapon.int + player.armor.int) + ')'
        this.stats[2].item = 'AGI: ' + player.baseAgi + '(+' + (player.weapon.agi + player.armor.agi) + ')'
        this.stats[3].item = 'ATK: ' + player.baseAttack + '(+' + (player.weapon.attack + player.armor.attack) + ')'
        this.stats[4].item = 'DEF: ' + player.baseDefence + '(+' + (player.weapon.defence + player.armor.defence) + ')'



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

            if (i === 1) {
                this.createBar(x, y, w, h, 2, player.exp, player.levelExp)
            }

            if (i === 2) {
                this.createBar(x, y, w, h, 2, player.hp, player.hpMax)
            }

            if (i === 3) {
                this.createBar(x, y, w, h, 2, player.mp, player.mpMax)
            }


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
            this.createEquipment(
                STATUS_WIDTH / 2 + STATUS_WIDTH,
                STATUS_TITLE_HEIGHT / 2 + STATUS_BAR_HEIGHT,
                STATUS_WIDTH,
                STATUS_TITLE_HEIGHT,
                player.weapon,
                this.equipments[0].index
            )
            this.createEquipment(
                STATUS_WIDTH / 2 + STATUS_WIDTH + STATUS_WIDTH,
                STATUS_TITLE_HEIGHT / 2 + STATUS_BAR_HEIGHT,
                STATUS_WIDTH,
                STATUS_TITLE_HEIGHT,
                player.armor,
                this.equipments[0].index
            )
            if (this.frame % 2 === 0) {
                this.equipments[0].index++
            }
        } else {
            this.stats.forEach((_, i) => {
                this.stats[i].index = 0
                this.equipments[0].index = 0
            })
        }

        this.frame++
        // spriteFont.showFont(this.text, this.x, this.y, this.w, this.h)
    }

    createEquipment(x, y, w, h, equipment, index) {
        rectMode(CENTER)
        stroke(0)
        strokeWeight(1)
        fill(255)
        rect(x, y, w, h)

        textLeading(0)
        textAlign(CENTER, CENTER)
        textFont(font)
        textSize(this.fontSize)
        fill(0)
        stroke(0)
        strokeWeight(1)

        let textToShow = equipment.name.split('').slice(0, index).join('')
        text(textToShow, x + this.fontSize / 8, y - this.fontSize / 8, w, h)

        rectMode(CENTER)
        stroke(0)
        strokeWeight(1)
        fill(255)
        rect(x,
            y + h / 2 + w / 4,
            w,
            w / 2)

        noSmooth()
        imageMode(CENTER)
        image(
            equipment.img,
            x,
            y + h / 2 + w / 4,
            w / 2,
            w / 2,
            0,
            0,
            16,
            16
        )

        let stats = []
        if (equipment.attack > 0) {
            stats.push('ATTACK +' + equipment.attack)
        }
        if (equipment.defence > 0) {
            stats.push('DEFENCE +' + equipment.defence)
        }
        if (equipment.str > 0) {
            stats.push('STR +' + equipment.str)
        }
        if (equipment.int > 0) {
            stats.push('INT +' + equipment.int)
        }
        if (equipment.agi > 0) {
            stats.push('AGI +' + equipment.agi)
        }

        stats.forEach((stat, i) => {
            stroke(0)
            strokeWeight(1)
            fill(255)
            let textToShow = stat.split('').slice(0, index).join('')
            rect(x,
                y + w / 4 + w / 2 - h / 2 + i * (h),
                w, h)
            fill(0)
            text(
                textToShow,
                x + this.fontSize / 8,
                y - this.fontSize / 8 + w / 4 + w / 2 - h / 2 + i * (h),
                w,
                h
            )
        })
    }

    createBar(x, y, w, h, padding, from, to) {

        w = w - padding * 2
        h = h - padding * 2
        let percentage = constrain(from / to || 0, 0, 1)
        let barW = w * percentage
        let barH = 10
        let barX = x - w / 2 + barW / 2
        let barY = y - h / 2 + barH / 2
        noFill()
        stroke(0)
        strokeWeight(1)
        rect(x, barY, w, barH)

        fill(0)
        noStroke()
        rect(barX, barY, barW, barH)
    }

    drawBox(x, y, w, h, item, index, i) {
        rectMode(CENTER)
        stroke(0)
        strokeWeight(1)
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

        // image(
        //     this.image,
        //     this.x,
        //     this.y,
        //     this.currentWidth,
        //     this.currentHeight,
        //     0,
        //     0,
        //     16,
        //     16
        // )

        if (index > item.split('').length) {
            index = item.split('').length
        }
    }

    pressed() {
        if (!this.collide()) return false
        console.log('pressed status bar')
    }
}