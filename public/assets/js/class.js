class Character {
    attack = 1;
    defense = 1;
    maxLife = 1;
    portrait = '';

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
        this.portrait = 'assets/img/knight.jpeg';
        this.life = 100;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.attack = 15;
        this.defense = 4;
        this.maxLife = 80;
        this.portrait = 'assets/img/sorcerer.jpeg';
        this.life = 80;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('Little Monster');
        this.attack = 4;
        this.defense = 4;
        this.maxLife = 40;
        this.portrait = 'assets/img/littlemonster.jpeg';
        this.life = 40;
    }
}

class BigMonster extends Character {
    constructor() {
        super('Big Monster');
        this.attack = 12;
        this.defense = 6;
        this.maxLife = 120;
        this.portrait = 'assets/img/bigmonster.jpeg';
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

        // Char
        this.portrait(this.char, this.charEl);
        this.info(this.char, this.charEl);
        this.charEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.char, this.monster, this.charEl, this.monsterEl);
        })

        // Monster
        this.portrait(this.monster, this.monsterEl);
        this.info(this.monster, this.monsterEl);
        this.monsterEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.monster, this.char, this.monsterEl, this.charEl);
        })
    }

    update() {
        let actualHP = (character, characterEl) => {
            let calcHP = character.life / character.maxLife * 100;
            characterEl.querySelector('.lifebar').style.width = `${calcHP}%`;
            characterEl.querySelector('.info > .hp').innerText = `HP: ${character.life}`;
            
            if (calcHP < 11) {
                characterEl.querySelector('.lifebar').style.backgroundColor = '#f00';
            }
        }
        
        // Char
        actualHP(this.char, this.charEl);

        // Monster
        actualHP(this.monster, this.monsterEl);
    }

    attack(attacker, defender, attackerEl, defenderEl) {
        if (attacker.life < 1) {
            this.log.addLog(`${attacker.name} está morto e não pode atacar.`);
            return;
        }

        if (defender.life < 1) {
            this.log.addLog(`${defender.name} já está morto.`);
            return;
        }

        attackerEl.querySelector('.btn-attack').setAttribute('disabled', '');
        defenderEl.querySelector('.btn-attack').removeAttribute('disabled');

        const attackFactor = Math.random() * 2;
        const defenderFactor = Math.random() * 2;
        const actualAttack = Math.trunc(attackFactor * attacker.attack);
        const actualDefense = Math.trunc(defenderFactor * defender.defense);
        
        if (actualDefense < actualAttack) {
            defender.life -= actualAttack;
            this.log.addLog(`${attacker.name} causou ${actualAttack} de dano em ${defender.name}.`);

            if (defender.life < 1) {
                attackerEl.querySelector('.btn-attack').removeAttribute('disabled');
                defenderEl.querySelector('.btn-attack').removeAttribute('disabled');
            }
        } else {
            this.log.addLog(`${defender.name} defendeu o ataque de ${attacker.name}.`);
        }

        this.update();
    }

    portrait(character, characterEl) {
        const imgEl = document.createElement('img');
        imgEl.src = character.portrait;

        characterEl.querySelector('.portrait').appendChild(imgEl);
    }

    info(character, characterEl) {
        characterEl.querySelector('.info').innerHTML += `<span># Name: ${character.name}</span>`;
        characterEl.querySelector('.info').innerHTML += `<span># Attack: ${character.attack}</span>`;
        characterEl.querySelector('.info').innerHTML += `<span># Defense: ${character.defense}</span>`;
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