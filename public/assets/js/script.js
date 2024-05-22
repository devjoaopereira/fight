let char = new Knight('Venethok');
let monster = new BigMonster();
let log = new Log(document.querySelector('#log'));
const charEl = document.querySelector('#char');
const monsterEl = document.querySelector('#monster');

const stage = new Stage(
    char,
    monster,
    charEl,
    monsterEl,
    log
);

stage.start();