class BattleEvent {
    constructor(creep, selectionsTextArray, { row = 2, col = 2, paddingX = 20, paddingY = 10, dialoguePortion = 0.1, creepPortion = 0.5, buttonWidth = BUTTON_WIDTH, buttonHeight = BUTTON_HEIGHT, isIcon = false, results = [], dialogueTextSize = 48 } = {}) {
        this.dialoguesTextArray = [creep.name]
        this.selectionsTextArray = selectionsTextArray
        this.height = height - STATUS_BAR_HEIGHT
        this.dialogues = []
        this.selections = []
        this.index = 0

        this.shouldEnd = false

        this.turn = 0

        this.creep = creep

        this.results = results

        this.dialoguePortion = dialoguePortion
        this.creepPortion = creepPortion

        this.buttonWidth = buttonWidth
        this.buttonHeight = buttonHeight

        this.paddingX = paddingX
        this.paddingY = paddingY

        this.width = width - this.paddingX * 2

        this.row = row
        this.col = col

        this.dialogueTextSize = dialogueTextSize

        this.isIcon = isIcon

        this.resolved = false

        this.createCreepPortion()
        this.createDialogues()
        if (this.isIcon) {
            this.createIconSelections()
        } else {
            this.createSelections()
        }
    }
    createCreepPortion() {
        let creepBoxHeight = this.height * this.creepPortion

        this.creepBox = new ImageBox(
            width / 2,
            STATUS_BAR_HEIGHT + creepBoxHeight / 2,
            width, creepBoxHeight, this.creep.img)

    }

    healthBar() {
        let creepBoxHeight = this.height * this.creepPortion

        let w = 128
        let barH = 10
        let barY = STATUS_BAR_HEIGHT + creepBoxHeight / 2 - 128 / 2 - 30
        let x = width / 2

        let healthPorporation = constrain(this.creep.hp / this.creep.hpMax, 0, 1)
        let barW = healthPorporation * w
        let barX = x - w / 2 + barW / 2

        noFill()
        stroke(0)
        strokeWeight(1)
        rect(x, barY, w, barH)

        fill(0)
        stroke(0)
        strokeWeight(1)
        rect(barX, barY, barW, barH)
    }

    createDialogues() {

        let dialogueHeight = this.height * this.dialoguePortion
        let creepBoxHeight = this.height * this.creepPortion

        this.dialoguesTextArray.forEach(element => {
            this.dialogues.push(new DialogueBox(
                width / 2,
                dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                width, dialogueHeight, element, 20, false, this.dialogueTextSize))
        })
    }


    createSelections() {

        this.selectionsTextArray.forEach((element, index) => {
            let x = index % this.col
            let y = Math.floor(index / this.col)

            let dialogueHeight = this.height * (this.dialoguePortion + this.creepPortion)
            let containerHeight = this.height * (1 - this.dialoguePortion - this.creepPortion)
            let rowHeight = containerHeight / this.row


            let shouldCenterX = (index % this.col === 0 && this.selectionsTextArray.length - 1 - index === 0)
            let shouldCenterY = Math.floor((this.selectionsTextArray.length - 1) / this.col) === 0

            let yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight

            let buttonPadding = (width - this.buttonWidth * this.col - (this.col - 1) * this.paddingX) / 2

            this.selections.push(new SelectionBox(
                shouldCenterX ? width / 2 : buttonPadding + this.buttonWidth / 2 + x * (this.paddingX + this.buttonWidth),
                shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight,
                this.buttonWidth,
                this.buttonHeight,
                element
            ))
        })
    }

    createIconSelections() {
        this.selectionsTextArray.forEach((element, index) => {
            let x = index % this.col
            let y = Math.floor(index / this.col)

            let dialogueHeight = this.height * (this.dialoguePortion)
            let containerHeight = this.height * (1 - this.dialoguePortion)
            let rowHeight = containerHeight / this.row


            let shouldCenterX = (index % this.col === 0 && this.selectionsTextArray.length - 1 - index === 0)
            let shouldCenterY = Math.floor((this.selectionsTextArray.length - 1) / this.col) === 0

            let yCenter = containerHeight / 2 + STATUS_BAR_HEIGHT + dialogueHeight

            let buttonPadding = (width - this.buttonWidth * this.col - (this.col - 1) * this.paddingX) / 2

            this.selections.push(new IconSelectionBox(
                shouldCenterX ? width / 2 : buttonPadding + this.buttonWidth / 2 + x * (this.paddingX + this.buttonWidth),
                shouldCenterY ? yCenter : yCenter - rowHeight / 2 + y * rowHeight,
                this.buttonWidth,
                this.buttonHeight,
                element
            ))
        })
    }

    show() {
        if (this.dialogues.length - 1 > this.index) {
            this.dialogues[this.index].show()
        } else {
            if (this.dialogues.length > 0) {
                // console.log(this.dialogues)
                this.dialogues[this.dialogues.length - 1].show()
            }

            if (this.turn % 2 == 0 && !this.resolved) {
                this.selections.forEach(selection => {
                    selection.show()
                })
            }

        }

        this.creepBox.show()
        this.healthBar()
    }

    attack() {
        //this.creep.name + ' took ' + player.attack + ' damages!'
        let dialogueHeight = this.height * this.dialoguePortion
        let creepBoxHeight = this.height * this.creepPortion
        // currentScene.events[currentScene.index].creep.hp -= player.attack
        this.dialogues.push(new DialogueBox(
            width / 2,
            dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
            width, dialogueHeight,
            this.creep.name + ' took ' + constrain(player.attack - this.creep.defence, 0, Infinity) + ' damages!',
            20, false, this.dialogueTextSize,
            () => {
                currentScene.events[currentScene.index].creep.hp -= constrain(player.attack - currentScene.events[currentScene.index].creep.defence, 0, Infinity)
                this.resolved = true
            }
        ))
        // this.turn++
    }

    ability() {
        //this.creep.name + ' took ' + player.attack + ' damages!'
        let dialogueHeight = this.height * this.dialoguePortion
        let creepBoxHeight = this.height * this.creepPortion
        // currentScene.events[currentScene.index].creep.hp -= player.attack
        this.dialogues.push(new DialogueBox(
            width / 2,
            dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
            width, dialogueHeight,
            this.creep.name + ' took ' + constrain(player.weapon.abilityAttack - this.creep.defence, 0, currentScene.events[currentScene.index].creep.hp) + ' damages!',
            20, false, this.dialogueTextSize,
            () => {
                currentScene.events[currentScene.index].creep.hp -= constrain(player.weapon.abilityAttack - currentScene.events[currentScene.index].creep.defence, 0, currentScene.events[currentScene.index].creep.hp)
                player.mp -= Math.round(player.weapon.mp * player.mpMax)
                this.resolved = true
            }
        ))
    }

    creepAttack() {
        let dialogueHeight = this.height * this.dialoguePortion
        let creepBoxHeight = this.height * this.creepPortion

        this.dialogues.push(new DialogueBox(
            width / 2,
            dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
            width, dialogueHeight,
            'YOU took ' + constrain(this.creep.attack - player.defence, 0, Infinity) + ' damages!',
            20, false, this.dialogueTextSize,
            () => {
                player.hp -= constrain(this.creep.attack - player.defence, 0, Infinity)
                this.resolved = true
            }
        ))
        // this.turn++
    }

    pressed() {

        if (this.shouldEnd) {

            if (this.index < (this.dialogues.length - 1)) {
                this.index++
                return
            }
            return
        }

        if (this.resolved) {
            if (this.creep.hp <= 0) {
                let dialogueHeight = this.height * this.dialoguePortion
                let creepBoxHeight = this.height * this.creepPortion
                let creep = currentScene.events[currentScene.index].creep
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'VICTORY!',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'Gain ' + Math.ceil(creep.exp) + ' experience!',
                    20, false, this.dialogueTextSize,
                    () => {
                        player.exp += Math.ceil(creep.exp)
                    }
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'Gain ' + Math.ceil(creep.money) + ' gold!',
                    20, false, this.dialogueTextSize,
                    () => {
                        player.money += Math.ceil(creep.money)
                    }
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'Gain ' + Math.ceil(creep.material) + ' material(s)!',
                    20, false, this.dialogueTextSize,
                    () => {
                        player.material += Math.ceil(creep.material)
                    }
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    '',
                    20, false, this.dialogueTextSize,
                    () => {
                        sceneManager.next()
                    }
                ))

                this.shouldEnd = true
                if (this.index < this.dialogues.length - 1) {
                    this.index++
                }
                return
            }

            if (player.hp <= 0) {
                let dialogueHeight = this.height * this.dialoguePortion
                let creepBoxHeight = this.height * this.creepPortion
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'YOU DIED!',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'YOU START FROM HAVING NOTHING...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'AND YOU ARE HERE...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'LIKE PUSHING A GIANT ROCK UP THE HILL...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'BUT YOU COULD NEVER GET TO THE TOP...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'LIKE A GAME DEVELOPER...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'A NEVER ENDING JOURNEY...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'BUT AT THE END...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    'THERE\'S NOTHING LEFT...',
                    20, false, this.dialogueTextSize
                ))
                this.dialogues.push(new DialogueBox(
                    width / 2,
                    dialogueHeight / 2 + STATUS_BAR_HEIGHT + creepBoxHeight,
                    width, dialogueHeight,
                    '',
                    20, false, this.dialogueTextSize,
                    () => {
                        sceneManager.gameOver()
                    }
                ))

                this.shouldEnd = true
                if (this.index < this.dialogues.length - 1) {
                    this.index++
                }
                return
            }

            this.resolved = false
            this.turn++
        }

        // console.log(this.turn % 2, this.resolved)

        if (this.turn % 2 === 1) {
            if (!this.resolved) {
                this.creepAttack()
            }
        }

        this.selections.forEach((selection, index) => {
            selection.pressed(() => {
                if (this.turn % 2 === 0) {
                    if (!this.resolved) {
                        if (index === 0) {
                            this.attack()
                        } else {
                            if (player.mp < player.weapon.mp * player.mpMax) return
                            this.ability()
                        }
                    }
                }
            })
        })


        if (this.index < this.dialogues.length - 1) {
            this.index++
        }

    }
}