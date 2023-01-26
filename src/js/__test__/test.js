import Archer from '../archer';
import Demon from '../demon';
import Team from '../app';
import Character from '../character';

const demon1 = new Demon('Scot');
const archer1 = new Archer('Good');
const archer2 = new Archer('Ali');

const expected = new Set();

test('Проверка добавления персонажа в команду', () => {
  const team1 = new Team();
  expected.add(archer1);
  expect(team1.add(archer1)).toEqual(expected);
});

test('Проверка добавления дубликата персонажа в команду', () => {
  try {
    expected.add(archer1);
    const team1 = new Team();
    team1.add(archer1);
    expect(team1.add(archer1)).toEqual(expected);
  } catch (Error) {
    expect('Ошибка: данный объект уже в команде').toContain(Error.message);
  }
});

test('Проверка добавления нескольких персонажей в команду', () => {
  const team1 = new Team();
  expected.add(archer1).add(demon1).add(archer2).add(archer1);
  expect(team1.addAll(archer1, demon1, archer2, archer1)).toEqual(expected);
});

test('Преобразование коллекции Set в массив', () => {
  const team1 = new Team();
  expected.add(archer1).add(demon1).add(archer2).add(archer1);
  team1.addAll(archer1, demon1, archer2, archer1);
  expect(team1.toArray()).toEqual([...expected]);
});

describe('Создание персонажа', () => {
  test('проверка характеристик', () => {
    try {
      const recived = new Archer('Nik');
      const ex = {
        name: 'Nik',
        type: 'Archer',
        health: 100,
        level: 1,
        attack: 25,
        defence: 25,
      };
      expect(recived).toEqual(ex);
    } catch (Error) {
      expect('Ошибка: длина name имеет недопустимое значение').toContain(Error.message);
    }
  });

  test('проверка длины имени менее 2', () => {
    try {
      const recived = new Archer('Q');
      const ex = {
        name: 'Q',
        type: 'Archer',
        health: 100,
        level: 1,
        attack: 25,
        defence: 25,
      };
      expect(recived).toEqual(ex);
    } catch (Error) {
      expect('Ошибка: длина name имеет недопустимое значение').toContain(Error.message);
    }
  });

  test('проверка длины имени более 10', () => {
    try {
      const recived = new Archer('Qwertyasdfg');
      const ex = {
        name: 'Qwertyasdfg',
        type: 'Archer',
        health: 100,
        level: 1,
        attack: 25,
        defence: 25,
      };
      expect(recived).toEqual(ex);
    } catch (Error) {
      expect('Ошибка: длина name имеет недопустимое значение').toContain(Error.message);
    }
  });

  test('проверка типа поля name', () => {
    try {
      const recived = new Archer(456);
      const ex = {
        name: 456,
        type: 'Archer',
        health: 100,
        level: 1,
        attack: 25,
        defence: 25,
      };
      expect(recived).toEqual(ex);
    } catch (Error) {
      expect('Ошибка: установите строковое значение полю name').toContain(Error.message);
    }
  });

  test('проверка типа персонажа', () => {
    try {
      const recived = new Archer('Tady', 'Boy');
      const ex = {
        name: 'Tady',
        type: 'Boy',
        health: 100,
        level: 1,
        attack: 25,
        defence: 25,
      };
      expect(recived).toEqual(ex);
    } catch (e) {
      expect('Ошибка: тип персонажа не соответствует заданному').toContain(e.message);
    }
  });
});

test('Проверяем levelUp', () => {
  const king = new Character('King', 'Swordsman', 15, 25, 15, 1);
  const ex = {
    name: 'King',
    type: 'Swordsman',
    health: 100,
    level: 2,
    attack: 18,
    defence: 30,
  };
  expect(king.levelUp()).toEqual(ex);
});

test('Проверяем levelUp', () => {
  try {
    const king = new Character('King', 'Swordsman', 15, 25, 0, 1);
    const ex = {
      name: 'King',
      type: 'Swordsman',
      health: 0,
      level: 2,
      attack: 18,
      defence: 30,
    };
    expect(king.levelUp()).toEqual(ex);
  } catch (e) {
    expect('Ошибка: нельзя повысить левел умершего').toContain(e.message);
  }
});

test('Проверяем damage', () => {
  const king = new Character('King', 'Swordsman', 15, 25, 100, 1);
  const ex = {
    name: 'King',
    type: 'Swordsman',
    health: 85,
    level: 1,
    attack: 15,
    defence: 25,
  };
  expect(king.damage(20)).toEqual(ex);
});

test('Проверяем damage', () => {
  try {
    const king = new Character('King', 'Swordsman', 15, 25, 0, 1);
    const ex = {
      name: 'King',
      type: 'Swordsman',
      health: 0,
      level: 2,
      attack: 18,
      defence: 30,
    };
    expect(king.damage(20)).toEqual(ex);
  } catch (e) {
    expect('Ошибка: нельзя убить умершего').toContain(e.message);
  }
});
