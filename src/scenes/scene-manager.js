class SceneManager {
    constructor() {
        this.index = 1
        this.scenes = []
        this.createScenes()
    }

    createScenes() {
        this.createMainMenu()
        this.createGameScene()
    }

    createMainMenu() {
        let elements = []
        // let dialogueBox = new DialogueBox(width / 2, height / 4, width, height / 2, 'Before changing the example, it might be helpful to submit a feature request to whomever handles these kinds of issues at Mozilla/Webkit citing the noSmooth() documentation as an example of why this type of boolean control for graphics smoothing (not image smoothing) would be practical for developers.')
        let startButton = new SelectionBox(width / 2, height / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 'NOTHING', 'START')

        elements.push(startButton)
        this.scenes.push(new Scene(this.scenes.length, elements))
    }

    createStatusBar(items) {
        return items.map((item, i) => {
            return new DialogueBox(STATUS_WIDTH / 2 + i * STATUS_WIDTH, STATUS_BAR_HEIGHT / 2, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0)
        })
    }

    createStatsCol(items) {
        return items.map((item, i) => {
            let ele = new DialogueBox(STATUS_WIDTH / 2, STATUS_BAR_HEIGHT / 2 + (i + 1) * STATUS_BAR_HEIGHT, STATUS_WIDTH, STATUS_BAR_HEIGHT, item, 0)
            ele.hidden = true
            return ele
        })
    }

    createGameScene() {
        let elements = []

        elements.push(...this.createStatusBar([
            player.name,
            'Level: ' + player.level,
            'HP: ' + player.hp + ' / ' + player.hpMax,
            'MP: ' + player.mp + ' / ' + player.mpMax,
            '$: ' + player.money,
            'Material: ' + player.material
        ]))

        elements.push(...this.createStatsCol([
            'STR: ' + player.str,
            'INT: ' + player.int,
            'AGI: ' + player.agi
        ]))

        let events = []
        events.push(new DialogueEvent([
            'You have NOTHING...',
            'You don\'t know where you are...',
            'You are weak...',
            'Even the weakest slime kills you in one hit...',
            'But you want to stay alive...',
            'To find the purpose of your pathetic life...',
            'You walk and walk around this place...',
            'After some time, you found serval paths in front of you...'
        ]))

        events.push(new SelectionEvent([
            'You are gonna choose...'
        ], [
            'BATTLE',
            'EVENT',
            'CHANCE'
        ]))

        let scene = new Scene(this.scenes.length, elements)
        scene.events = events

        this.scenes.push(scene)


    }

    next() {
        this.index++
        currentScene = this.scenes[this.index]
    }
}