class Creep {
    constructor(type = CREEP) {
        this.attack = player.level * 5 + 1
        this.defence = 0
        this.hpMax = player.level * 10 + 1
        this.hp = this.hpMax
        this.img = mageImage
        this.name = 'MAGE'
        this.exp = Math.ceil(player.levelExp * 0.5)
        this.money = Math.ceil(player.level * 10 + 1)
        this.type = type

        this.initStats()
    }

    initStats() {
        if (this.type === BOSS) {
            this.attack = Math.round(player.level * 10 + 10 + player.defence * 0.5)
            this.hpMax = Math.round(player.level * 50 + 20)
            this.defence = Math.round(player.attack * 0.2)
            this.name = 'GAINT SWORD GUY'
            this.exp = Math.ceil(player.levelExp)
            this.img = giantSwordGuyImage
            this.hp = this.hpMax
            this.money = Math.ceil(player.level * 50 + 1)
        }
    }
}