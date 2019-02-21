const assert = require('chai').assert;

class StringBuilder {
  constructor(string) {
    if (string !== undefined) {
      StringBuilder._vrfyParam(string);
      this._stringArray = Array.from(string);
    } else {
      this._stringArray = [];
    }
  }

  append(string) {
    StringBuilder._vrfyParam(string);
    for (let i = 0; i < string.length; i++) {
      this._stringArray.push(string[i]);
    }
  }

  prepend(string) {
    StringBuilder._vrfyParam(string);
    for (let i = string.length - 1; i >= 0; i--) {
      this._stringArray.unshift(string[i]);
    }
  }

  insertAt(string, startIndex) {
    StringBuilder._vrfyParam(string);
    this._stringArray.splice(startIndex, 0, ...string);
  }

  remove(startIndex, length) {
    this._stringArray.splice(startIndex, length);
  }

  static _vrfyParam(param) {
    if (typeof param !== 'string') throw new TypeError('Argument must be string');
  }

  toString() {
    return this._stringArray.join('');
  }
}



describe('testing', function () {
  it('can be instantiated with a passed in string argument or without anything', function () {
    let str = new StringBuilder('hello');
    assert.isTrue(str instanceof StringBuilder);
    assert.isObject(str);
    assert.isArray(str._stringArray);
    assert.isString(str.toString());
    assert.isFunction(str.append);
    assert.isFunction(str.insertAt);
    assert.isFunction(str.prepend);
    assert.isFunction(str.remove);
    assert.isFunction(str.toString);

    assert.isTrue(StringBuilder.prototype.hasOwnProperty('append'));
    assert.isTrue(StringBuilder.prototype.hasOwnProperty('insertAt'));
    assert.isTrue(StringBuilder.prototype.hasOwnProperty('prepend'));
    assert.isTrue(StringBuilder.prototype.hasOwnProperty('remove'));
    assert.isTrue(StringBuilder.prototype.hasOwnProperty('toString'));

    let str2 = new StringBuilder();
    assert.isTrue(str2 instanceof StringBuilder);
    assert.isObject(str2);
    assert.equal(str2.toString(), '');
  });

  it('append(string) – converts the passed in string argument to an array and adds it to the end of the storage', function () {
    let str = new StringBuilder('hello');
    str.append('asd');
    str.append('asd');
    str.append('asd');
    assert.equal(str.toString(), 'helloasdasdasd');
  });

  it('prepend(string) – converts the passed in string argument to an array and adds it to the beginning of the storage', function () {
    let str = new StringBuilder('hello');
    str.prepend('asd');
    str.prepend('asd');
    str.prepend('asd');
    assert.equal(str.toString(), 'asdasdasdhello');
  });

  it('insertAt(string, index) – converts the passed in string argument to an array and adds it at the given index', function () {
    let str = new StringBuilder('hello');
    str.insertAt('asd', 0);
    assert.equal(str.toString(), 'asdhello');
    str = new StringBuilder('hello');
    str.insertAt('asd', 3);
    assert.equal(str.toString(), 'helasdlo');
    str = new StringBuilder('hello');
    str.insertAt('asd', 5);
    assert.equal(str.toString(), 'helloasd');
  });

  it('remove(startIndex, length) – removes elements from the storage, starting at the given index (inclusive), length number of characters', function () {
    let str = new StringBuilder('hello');
    str.remove(2, 3);
    assert.equal(str.toString(), 'he');
    str = new StringBuilder('hello');
    str.remove(0, 3);
    assert.equal(str.toString(), 'lo');
  });

  it('toString() – returns a string with all elements joined by an empty string', function () {
    let str = new StringBuilder('hello');
    assert.equal(str.toString(), 'hello');
  });

  it('All passed in arguments should be strings. If any of them are not, throws a type error with the following message: "Argument must be string"', function () {
    assert.throw(function () {
      new StringBuilder(5)
    }, 'Argument must be string');

    assert.throw(function () {
      let str = new StringBuilder('hello');
      str.append(5);
    }, 'Argument must be string');

    assert.throw(function () {
      let str = new StringBuilder('hello');
      str.prepend(5);
    }, 'Argument must be string');

    assert.throw(function () {
      let str = new StringBuilder('hello');
      str.insertAt(5, 2);
    }, 'Argument must be string');

    assert.throw(function () {
      StringBuilder._vrfyParam(5);
    }, 'Argument must be string');
  });
});

let str = new StringBuilder('hello');
str.append(', there');
str.prepend('User, ');
str.insertAt('woop', 5);
console.log(str.toString());
str.remove(6, 3);
console.log(str.toString());
