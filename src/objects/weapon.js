class Weapon {
    constructor(type, quality) {
        this.type = type
        this.quality = quality

        this.name = 'Bare hand'
        this.mp = 1
        this.ability = 'ONE PUNCH!'
        this.abilityAttack = 999999

        this.attack = 1
        this.defence = 0
        this.str = 0
        this.agi = 0
        this.int = 0
        this.img = handImage

        switch (this.type) {
            case SWORD:
                if (quality === RARE) {
                    this.attack = 50 + player.level * 5
                    this.str = Math.round(player.baseStr * 0.2) + 1
                    this.img = swordImage
                    this.name = 'Great Sword'
                    this.ability = 'Heavy Slash'
                    this.mp = 0.3
                    this.abilityAttack = 100 + player.level * 10
                } else {
                    this.attack = 20 + player.level * 2
                    this.img = swordImage
                    this.name = 'Sword'
                    this.ability = 'Slash'
                    this.mp = 0.3
                    this.abilityAttack = 40 + player.level * 4
                }
                break
            default:
                break
        }
    }


}