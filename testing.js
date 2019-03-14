class Person {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = { ime: value };
  }
}

let p = new Person('Pesho');
console.log(p);
p.name = 'Gosho';
console.log(p);
