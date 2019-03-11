class Human{
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length > 3) {
      this._name = value;
    } else {
      console.log('tcu');
    }
  }
}

let h = new Human('as');
console.log(h);
console.log(h.name);