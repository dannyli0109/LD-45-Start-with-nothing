class Player {
    constructor() {
        this.name = 'NOBODY'
        this.hpMax = 1
        this.hp = this.hpMax
        this.mpMax = 0
        this.mp = this.mpMax
        this.level = 0
        this.str = 0
        this.int = 0
        this.agi = 0
        this.stats = [this.str, this.int, this.agi]
        this.money = 0
        this.material = 0
        this.mainStat = random(this.stats)
    }

    levelUp() {
        this.level++
        this.stats.forEach(stat => {
            stat++
        })
        this.mainStat += (this.level - 1)
        this.updateStats()
    }

    updateStats() {
        let newHp = this.str ^ 2 * 5
        let hpDifference = newHp - this.hpMax
        this.hpMax = newHp
        this.hp += hpDifference

        let newMp = this.int ^ 2 * 5
        let mpDifference = newMp - this.mpMax
        this.mpMax = newMp
        this.mp += mpDifference
    }
}