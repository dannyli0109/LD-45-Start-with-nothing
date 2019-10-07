class Player {
    constructor() {
        this.name = 'NOBODY'

        this.level = 0
        this.str = 0
        this.int = 0
        this.agi = 0

        this.baseStr = this.str
        this.baseInt = this.int
        this.baseAgi = this.agi

        this.stats = [this.str, this.int, this.agi]
        this.money = 0
        this.material = 0
        this.mainStat = random(this.stats)
        this.exp = 0
        this.levelExp = 1

        this.hpMax = this.str * 2 + 1
        this.hp = this.hpMax
        this.mpMax = this.int * 2 + 1
        this.mp = this.mpMax

        this.baseAttack = this.str * 2

        this.attack = this.baseAttack
        this.defence = 0

        this.weapon = false
        this.armor = false
        // this.updateStats()
    }

    equipWeapon(weapon) {
        this.weapon = weapon
        this.updateStats()

    }
    equipArmor(armor) {
        this.armor = armor
        this.updateStats()

    }

    gainExp(amt) {
        this.exp += amt
        if (this.exp >= this.levelExp) {
            this.exp -= this.levelExp
            this.levelUp()
        }
    }

    levelUp() {
        // currentScene.events.push(
        //     new DialogueEvent(
        //         [
        //             'Level Up!'
        //         ]
        //     )
        // )
        // currentScene.index++
        this.level++
        this.baseStr += Math.round(random(1, this.level))
        this.baseInt += Math.round(random(1, this.level))
        this.baseAgi += Math.round(random(1, this.level))

        this.hp = this.hpMax
        this.mp = this.mpMax
        // this.mainStat += (this.level - 1)
        this.updateStats()
    }



    updateStats() {

        this.str = this.baseStr + this.weapon.str + this.armor.str
        this.int = this.baseInt + this.weapon.int + this.armor.int
        this.agi = this.baseAgi + this.weapon.agi + this.armor.agi

        this.baseAttack = Math.round(this.str * 0.5)
        this.baseDefence = Math.ceil(this.agi * 0.5)

        this.attack = this.baseAttack + this.weapon.attack + this.armor.attack
        this.defence = this.baseDefence + this.weapon.defence + this.armor.defence

        let newHp = this.str * 5 + 1
        let hpDifference = newHp - this.hpMax
        this.hpMax = newHp
        this.hp += hpDifference

        let newMp = this.int * 5 + 1
        let mpDifference = newMp - this.mpMax
        this.mpMax = newMp
        this.mp += mpDifference
        this.levelExp = this.level * this.level + 1
    }
}