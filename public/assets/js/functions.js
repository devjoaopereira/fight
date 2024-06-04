const defaultCharacter = {
    attack: 1,
    defense: 1,
    life: 1,
    maxLife: 1,
    name: '',
    portrait: ''
}

const createKnight = (name) => {
    return {
        ...defaultCharacter,
        attack: 10,
        defense: 8,
        life: 100,
        maxLife: 100,
        portrait: 'assets/img/knight.jpeg',
        name
    }
}

const createSorcerer = (name) => {
    return {
        ...defaultCharacter,
        attack: 15,
        defense: 4,
        life: 80,
        maxLife: 80,
        portrait: 'assets/img/sorcerer.jpeg',
        name
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        attack: 4,
        defense: 4,
        life: 40,
        maxLife: 40,
        name: 'Little Monster',
        portrait: 'assets/img/littlemonster.jpeg',
    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,
        attack: 12,
        defense: 6,
        life: 120,
        maxLife: 120,
        name: 'Big Monster',
        portrait: 'assets/img/bigmonster.jpeg',
    }
}

const stage = {
    char: null,
    monster: null,
    charEl: null,
    monsterEl: null,
    start(char, monster, charEl, monsterEl) {
        this.char = char;
        this.monster = monster;
        this.charEl = charEl;
        this.monsterEl = monsterEl;

        this.update();

        // Char
        this.portrait(this.char, this.charEl);
        this.info(this.char, this.charEl);
        this.charEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.char, this.monster, this.charEl, this.monsterEl);
        });

        // Monster
        this.portrait(this.monster, this.monsterEl);
        this.info(this.monster, this.monsterEl);
        this.monsterEl.querySelector('.btn-attack').addEventListener('click', () => {
            this.attack(this.monster, this.char, this.monsterEl, this.charEl);
        });
    },
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
    },
    attack(attacker, defender, attackerEl, defenderEl) {
        if (attacker.life < 1) {
            log.addLog(`${attacker.name} está morto e não pode atacar.`);
            return;
        }

        if (defender.life < 1) {
            log.addLog(`${defender.name} já está morto.`);
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
            defender.life = defender.life < 1 ? 0 : defender.life;
            log.addLog(`${attacker.name} causou ${actualAttack} de dano em ${defender.name}.`);

            if (defender.life < 1) {
                attackerEl.querySelector('.btn-attack').removeAttribute('disabled');
                defenderEl.querySelector('.btn-attack').removeAttribute('disabled');
            }
        } else {
            log.addLog(`${defender.name} defendeu o ataque de ${attacker.name}.`);
        }

        this.update();
    },
    portrait(character, characterEl) {
        const imgEl = document.createElement('img');
        imgEl.src = character.portrait;

        characterEl.querySelector('.portrait').appendChild(imgEl);
    },
    info(character, characterEl) {
        characterEl.querySelector('.info').innerHTML += `<span># Name: ${character.name}</span>`;
        characterEl.querySelector('.info').innerHTML += `<span># Attack: ${character.attack}</span>`;
        characterEl.querySelector('.info').innerHTML += `<span># Defense: ${character.defense}</span>`;
    }
}

const log = {
    logs: [],
    addLog(message)  {
        this.logs.unshift(message);
        this.showLog();
    },
    showLog() {
        const logEl = document.querySelector('#log');
        logEl.innerHTML = '';

        for (let log of this.logs) {
            let liEl = document.createElement('li');
            liEl.innerText = log;

            logEl.appendChild(liEl);
        }
    }
}