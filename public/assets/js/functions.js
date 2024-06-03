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