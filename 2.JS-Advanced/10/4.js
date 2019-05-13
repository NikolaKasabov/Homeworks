function solve() {
  let obj = {};

  obj.extend = function (template) {
    const objPrototype = Object.getPrototypeOf(this);
    for (const key in template) {
      if (typeof template[key] === 'function') {
        objPrototype[key] = template[key];
      } else {
        this[key] = template[key];
      }
    }
  }

  return obj;
}

console.log();
