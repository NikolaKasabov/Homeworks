class Human{
  constructor(name) {
    console.log('in constructor1');
    this.name = name;
    console.log('in constructor2');
  }

  get name() {
    console.log('in getter');
    return this._name;
  }

  set name(value) {
    console.log('in setter');
    if (value.length > 3) {
      this._name = value;
    } else {
      console.log('tcu');
    }
  }
}

let h = new Human('kj');
h.name = 'werwerewr';
console.log(h.name);