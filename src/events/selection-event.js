class SelectionEvent {
    constructor(dialoguesTextArray, selectionsTextArray, { row = 2, col = 2, paddingX = 20, paddingY = 10, dialoguePortion = 0.5, buttonWidth = BUTTON_WIDTH, buttonHeight = BUTTON_HEIGHT, isIcon = false, results = [], dialogueTextSize = 48 } = {}) {
        this.dialoguesTextArray = dialoguesTextArray
        this.selectionsTextArray = selectionsTextArray
        this.height = height - STATUS_BAR_HEIGHT
        this.dialogues = []
        this.selections = []
        this.index = 0

        this.results = results

        this.dialoguePortion = dialoguePortion

        this.buttonWidth = buttonWidth
        this.buttonHeight = buttonHeight

        this.paddingX = paddingX
        this.paddingY = paddingY

        this.width = width - this.paddingX * 2

        this.row = row
        this.col = col

        this.dialogueTextSize = dialogueTextSize

        this.isIcon = isIcon

        this.createDialogues()
        if (this.isIcon) {
            this.createIconSelections()
        } else {
            this.createSelections()
        }
    }

    createDialogues() {

        let dialogueHeight = this.height * this.dialoguePortion

        this.dialoguesTextArray.forEach(element => {
            this.dialogues.push(new DialogueBox(
                width / 2,
                dialogueHeight / 2 + STATUS_BAR_HEIGHT,
                width, dialogueHeight, element, 20, false, this.dialogueTextSize))
        })
    }

    createSelections() {

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
            this.dialogues[this.dialogues.length - 1].show()
            this.selections.forEach(selection => {
                selection.show()
            })
        }
    }

    pressed() {
        this.index++

        this.selections.forEach((selection, index) => {
            selection.pressed(this.results[index])
        })
    }
}