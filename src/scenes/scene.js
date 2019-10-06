class Scene {
    constructor(id, elements) {
        this.id = id
        this.elements = elements
        this.showHiddenElement = false
        this.events = []
        this.index = 0
    }

    show() {
        let hovered = false
        this.elements.filter(element => !element.hidden).forEach(element => {
            element.show()
            if (element.collide()) {
                hovered = true
            }
        })

        if (this.events.length > 0) {
            this.events[this.index].show()
        }

        if (hovered) {
            this.elements.filter(element => element.hidden).forEach(element => {
                element.show()
            })
        } else {
            this.elements.filter(element => element.hidden).forEach(element => {
                element.index = 0
            })
        }

    }

    pressed() {
        this.elements.forEach(element => {
            element.pressed()
        })

        if (this.events.length > this.index) {
            this.events[this.index].pressed()
        }
    }
}