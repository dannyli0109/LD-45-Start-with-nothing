class Weapon {
    constructor(type, quality) {
        this.type = type
        this.quality = quality

        this.attack = 0
        this.str = 0
        this.agi = 0
        this.int = 0
        this.img = swordImage
        switch (this.type) {
            case SWORD:
                if (quality === RARE) {
                    this.attack = Math.round(random(3 * (player.baseStr + 1), 7 * (player.baseStr + 1))) * (player.level + 1) * Math.round(random(3, 7))
                    this.str = Math.round(random(1, 3) * 0.1 * (player.baseStr + 1))
                } else {
                    this.attack = Math.round(random(1 * (player.baseStr + 1), 3 * (player.baseStr + 1))) * (player.level + 1) * Math.round(random(1, 3))
                }
                break;
            default:
                break;
        }
    }


}