class Weapon {
    constructor(type, quality) {
        this.type = type
        this.quality = quality

        this.name = 'Bare hand'

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
                } else {
                    this.attack = 20 + player.level * 2
                    this.img = swordImage
                    this.name = 'Sword'
                }
                break
            default:
                break
        }
    }


}