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

class Stage {
    constructor(char, monster, charEl, monsterEl, log) {
        this.char = char;
        this.monster = monster;
        this.charEl = charEl;
        this.monsterEl = monsterEl;
        this.log = log;
    }

    start() {
        this.update();

        // Char Attack
        this.charEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.char, this.monster);
        })

        // Monster Attack
        this.monsterEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.monster, this.char);
        })
    }

    update() {
        // Char
        this.charEl.querySelector('.info').innerText = `${this.char.name} - ${this.char.life} HP`;
        let calcCharHP = this.char.life / this.char.maxLife * 100;
        this.charEl.querySelector('.lifebar').style.width = `${calcCharHP}%`;

        // Monster
        this.monsterEl.querySelector('.info').innerText = `${this.monster.name} - ${this.monster.life} HP`;
        let calcMonsterHP = this.monster.life / this.monster.maxLife * 100;
        this.monsterEl.querySelector('.lifebar').style.width = `${calcMonsterHP}%`;
    }

    attack(attacker, defender) {
        if (attacker.life < 1) {
            this.log.addLog(`${attacker.name} está morto e não pode atacar.`);
            return;
        }

        if (defender.life < 1) {
            this.log.addLog(`${defender.name} já está morto.`);
            return;
        }

        const attackFactor = Math.random() * 2;
        const defenderFactor = Math.random() * 2;
        const actualAttack = Math.trunc(attackFactor * attacker.attack);
        const actualDefense = Math.trunc(defenderFactor * defender.defense);
        
        if (actualDefense < actualAttack) {
            defender.life -= actualAttack;
            this.log.addLog(`${attacker.name} causou ${actualAttack} de dano em ${defender.name}.`);
        } else {
            this.log.addLog(`${defender.name} defendeu o ataque de ${attacker.name}.`);
        }

        this.update();
    }
}

class Log {
    logs = [];
    
    constructor(logEl) {
        this.logEl = logEl;
    }

    addLog(message) {
        this.logs.unshift(message);
        this.showLog();
    }

    showLog() {
        this.logEl.innerHTML = '';

        for (log of this.logs) {
            let liEl = document.createElement('li');
            liEl.innerText = log;
            this.logEl.appendChild(liEl);
        }
    }
}