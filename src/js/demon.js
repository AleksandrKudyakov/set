import Character from './character';

export default class Demon extends Character {
  constructor(name, type = 'Demon', attack = 10, defens = 40) {
    super(name, type, attack, defens);
  }
}
