import Character from './character';

export default class Archer extends Character {
  constructor(name, type = 'Archer', attack = 25, defens = 25) {
    super(name, type, attack, defens);
  }
}
