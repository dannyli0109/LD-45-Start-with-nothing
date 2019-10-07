class SceneManager {
    constructor() {
        this.index = 0
        this.scenes = []
        this.statusBar = this.createStatusBar()
        this.createScenes()

        this.events = [
            () => {
                return new SelectionEvent(
                    ...[
                        [
                            'You found a homeless person on the street...'
                        ],
                        [
                            'Give him: $' + (Math.ceil(player.money * 0.8) === 0 ? 1 : Math.ceil(player.money * 0.8)),
                            'No way!'
                        ],
                        {
                            paddingX: 50,
                            results: [
                                () => {
                                    if (player.money < (Math.ceil(player.money * 0.8) === 0 ? 1 : Math.ceil(player.money * 0.8))) return
                                    player.money -= Math.ceil(player.money * 0.8)
                                    currentScene.events.push(
                                        new DialogueEvent(
                                            [
                                                'HOMELESS: THANK YOU SO MUCH!!!'
                                            ]
                                        )
                                    )

                                    if (Math.random() > 0.5) {
                                        let weapon = new Weapon(SWORD, NORMAL)
                                        player.equipWeapon(weapon)
                                    } else {
                                        let armor = new Armor(PLATE, NORMAL)
                                        player.equipArmor(armor)
                                    }

                                    currentScene.events.push()
                                    currentScene.index++
                                },
                                () => {
                                    this.next()
                                }
                            ]
                        }
                    ]
                )
            }
        ]
    }

    createScenes() {
        this.createMainMenu()
        this.createGameScene()
        // this.createGameScene()
    }

    createMainMenu() {
        let elements = []
        // let dialogueBox = new DialogueBox(width / 2, height / 4, width, height / 2, 'Before changing the example, it might be helpful to submit a feature request to whomever handles these kinds of issues at Mozilla/Webkit citing the noSmooth() documentation as an example of why this type of boolean control for graphics smoothing (not image smoothing) would be practical for developers.')
        let startButton = new SelectionBox(width / 2, height / 2, BUTTON_WIDTH, BUTTON_HEIGHT, 'NOTHING', 'START')

        elements.push(startButton)
        this.scenes.push(new Scene(this.scenes.length, elements))
    }

    createStatusBar() {
        return new StatusBar()
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

        // elements.push(this.createStatusBar())

        // elements.push(...this.createStatsCol([
        //     'STR: ' + player.str,
        //     'INT: ' + player.int,
        //     'AGI: ' + player.agi
        // ]))

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



        events.push(new SelectionEvent(
            [
                'You are gonna choose...'
            ],
            [
                BATTLE,
                EVENT,
                OPPORTUNITY,
                BOSS
            ],
            {
                isIcon: true,
                col: 4,
                buttonWidth: 64,
                buttonHeight: 64,
                paddingX: 50
            }
        ))

        let scene = new Scene(this.scenes.length, elements)
        scene.events = events

        this.scenes.push(scene)
    }

    createIconSelection() {
        let elements = []
        let events = []

        let amountOfChoices = Math.round(random(1, 4))
        let allE = [
            BATTLE,
            EVENT,
            OPPORTUNITY,
            BOSS
        ]
        let e = []

        for (let i = 0; i < amountOfChoices; i++) {
            e.push(random(allE))
        }

        events.push(new SelectionEvent(
            [
                'Make another choice...'
            ],
            e,
            {
                isIcon: true,
                col: amountOfChoices,
                buttonWidth: 64,
                buttonHeight: 64,
                paddingX: 50
            }
        ))

        let scene = new Scene(this.scenes.length, elements)
        scene.events = events

        this.scenes.push(scene)
    }




    next() {
        this.index++
        if (this.scenes.length <= this.index) {
            player.gainExp(1)
            this.createIconSelection()
        }
        currentScene = this.scenes[this.index]
    }
}