class Person {
  constructor(value) {
    
  }

  get name() {
    return this._name;
  }

  set name(value) {
    console.log(value);
    this._name = { ime: value };
    // this._name = name;
  }
}

let p = new Person('Pesho');
// p.name = 'Gosho';

// console.log(0 || '' || false);
// console.log(5 && true && 'false' && 'asd');
