class DialogueEvent {
    constructor(elements) {
        this.elements = elements
        this.height = height - STATUS_BAR_HEIGHT
        this.dialogues = []
        this.index = 0
        this.createDialogues()
    }

    createDialogues() {
        this.elements.forEach(element => {
            this.dialogues.push(new DialogueBox(width / 2, this.height / 2 + STATUS_BAR_HEIGHT, width, this.height, element, 20, true, 48))
        })
    }

    show() {
        if (this.dialogues.length - 1 >= this.index) {
            this.dialogues[this.index].show()
        } else {
            currentScene.index++
            if (currentScene.events.length <= currentScene.index) {
                sceneManager.next()
            }
        }
    }

    pressed() {
        // this.dialogues[this.index]
        if (!this.dialogues[this.index].collide()) return

        if (this.dialogues[this.index].atTheEnd) {
            this.index++
        } else {
            this.dialogues[this.index].atTheEnd = true
        }
    }
}