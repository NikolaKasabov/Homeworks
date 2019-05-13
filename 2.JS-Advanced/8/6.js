class SortedList {
  constructor() {
    this.numbers = [];
    this.size = 0;
  }

  sort() {
    this.numbers.sort((a, b) => a - b);
  }

  add(value) {
    this.numbers.push(value);
    this.sort();
    this.size = this.numbers.length;
  }

  remove(index) {
    if (index < 0 || index >= this.numbers.length) {
      return;
    }
    this.numbers.splice(index, 1);
    this.size = this.numbers.length;
  }

  get(index) {
    if (index < 0 || index >= this.numbers.length) {
      return;
    }

    return this.numbers[index];
  }

  // get size() {
  //   return this.size;
  // }

  // set size(value) {
  //   this._size = value;
  // }
}
