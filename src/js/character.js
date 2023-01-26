const typeList = [
  'Archer',
  'Swordsman',
  'Magician',
  'Demon',
  'Undead',
  'Zombie',
];
const lenName = {
  min: 2,
  max: 10,
};

export default class Character {
  constructor(name, type, attack, defence, health = 100, level = 1) {
    if (name.length < lenName.min || name.length > lenName.max) {
      throw new Error('Ошибка: длина name имеет недопустимое значение');
    } else if (typeof name !== 'string') {
      throw new Error('Ошибка: установите строковое значение полю name');
    } else {
      this.name = name;
    }

    if (!typeList.includes(type)) {
      throw new Error('Ошибка: тип персонажа не соответствует заданному');
    } else {
      this.type = type;
    }

    this.health = health;
    this.level = level;
    this.attack = attack;
    this.defence = defence;
  }

  levelUp(level = 1, attack = 0.2, defence = 0.2) {
    if (this.health > 0) {
      this.level += level;
      this.attack += this.attack * attack;
      this.defence += this.defence * defence;
      this.health = 100;
    } else {
      throw new Error('Ошибка: нельзя повысить левел умершего');
    }
    return this;
  }

  damage(points) {
    if (this.health > 0) {
      this.health -= points * (1 - this.defence / 100);
    } else {
      throw new Error('Ошибка: нельзя убить умершего');
    }
    return this;
  }
}
