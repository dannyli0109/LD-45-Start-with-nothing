class Armor {
    constructor(type, quality) {
        this.type = type
        this.quality = quality

        this.name = 'Naked'

        this.attack = 0
        this.defence = 0
        this.str = 0
        this.agi = 0
        this.int = 0
        this.img = bodyImage
        switch (this.type) {
            case PLATE:
                if (quality === RARE) {
                    this.defence = Math.round(player.str * 0.8 + 20)
                    this.img = plateArmorImage
                    this.name = 'Bikini Plate Armor'
                } else {
                    this.defence = Math.round(player.str * 0.5 + 10)
                    this.img = plateArmorImage
                    this.name = 'Plate Armor'
                }
                break
            default:
                break
        }
    }


}