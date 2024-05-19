class Character {
    attack = 1;
    defense = 1;
    maxLife = 1;

    _life = 1;

    constructor(name) {
        this.name = name;
    }

    get life() {
        return this._life;
    }

    set life(value) {
        this._life = value < 0 ? 0 : value;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.attack = 10;
        this.defense = 8;
        this.maxLife = 100;
        this.life = 100;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.attack = 15;
        this.defense = 4;
        this.maxLife = 80;
        this.life = 80;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.attack = 4;
        this.defense = 4;
        this.maxLife = 40;
        this.life = 40;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.attack = 12;
        this.defense = 6;
        this.maxLife = 120;
        this.life = 120;
    }
}