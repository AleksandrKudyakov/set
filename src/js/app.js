export default class Team {
  constructor() {
    this.members = new Set();
  }

  add(character) {
    if (this.members.has(character)) {
      throw new Error('Ошибка: данный объект уже в команде');
    }
    return this.members.add(character);
  }

  addAll(...characters) {
    for (const character of characters) {
      this.members.add(character);
    }
    return this.members;
  }

  toArray() {
    return [...this.members];
  }
}
