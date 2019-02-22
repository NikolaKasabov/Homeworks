const Extensible = (function iife() {
  let counter = 0;

  class Inner {
    constructor() {
      this.id = counter;
      counter += 1;
    }

    extend(templateObj) {
      const arrOfArr = Object.entries(templateObj);
      arrOfArr.forEach((arr) => {
        if (typeof arr[1] === 'function') {
          Inner.prototype[arr[0]] = arr[1];
        } else {
          this[arr[0]] = arr[1];
        }
      });
    }
  }

  return Inner;
})();

const obj1 = new Extensible();
const obj2 = new Extensible();
const obj3 = new Extensible();
console.log(obj1.id);
console.log(obj2.id);
console.log(obj3.id);

obj1.extend({
  extensionMethod: function () {return 'asdasdasd' },
  extensionProperty: 'someString',
});

console.log(obj1);
console.log(obj1.__proto__);
