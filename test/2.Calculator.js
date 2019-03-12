const assert = require('chai').assert;

class Calculator {
  constructor() {
    this.expenses = [];
  }

  add(data) {
    this.expenses.push(data);
  }

  divideNums() {
    let divide;
    for (let i = 0; i < this.expenses.length; i++) {
      if (typeof (this.expenses[i]) === 'number') {
        if (i === 0 || divide === undefined) {
          divide = this.expenses[i];
        } else {
          if (this.expenses[i] === 0) {
            return 'Cannot divide by zero';
          }
          divide /= this.expenses[i];
        }
      }
    }
    if (divide !== undefined) {
      this.expenses = [divide];
      return divide;
    } else {
      throw new Error('There are no numbers in the array!')
    }
  }

  toString() {
    if (this.expenses.length > 0)
      return this.expenses.join(" -> ");
    else return 'empty array';
  }

  orderBy() {
    if (this.expenses.length > 0) {
      let isNumber = true;
      for (let data of this.expenses) {
        if (typeof data !== 'number')
          isNumber = false;
      }
      if (isNumber) {
        return this.expenses.sort((a, b) => a - b).join(', ');
      }
      else {
        return this.expenses.sort().join(', ');
      }
    }
    else return 'empty';
  }
}

describe('Calculator testing', function () {
  let calc;
  beforeEach(function () { calc = new Calculator() });

  describe('property expenses', function () {
    it('is array', function () {
      assert.isArray(calc.expenses);
      assert.deepEqual(calc.expenses, []);
    });
  });

  describe('Function add(data)', function () {
    it('empty input', function () {
      calc.add();
      assert.deepEqual(calc.expenses, [undefined]);
    });
    it('correct input', function () {
      calc.add(1);
      assert.equal(calc.expenses[0], 1);
    });
    it('invalid input', function () {
      calc.add([]);
      assert.isArray(calc.expenses[0]);
    });
    it('invalid input', function () {
      calc.add({});
      assert.isObject(calc.expenses[0]);
    });
  });

  describe('Function divideNums() ', function () {
    it('valid input', function () {
      calc.add(1);
      calc.add(2);
      calc.add(3);
      calc.divideNums();
      assert.closeTo(calc.expenses[0], 0.166, 0.001);
    });

    it('mixed input', function () {
      calc.add(1);
      calc.add(2);
      calc.add('some text');
      calc.add(3);
      calc.divideNums();
      assert.closeTo(calc.expenses[0], 0.166, 0.001);
    });

    it('divide by zero', function () {
      calc.add(1);
      calc.add(0);
      calc.add(3);
      assert.equal(calc.divideNums(), 'Cannot divide by zero');
    });

    it('no numbers', function () {
      calc.add('asd');
      calc.add(['t']);
      calc.add({ one: 1 });
      assert.throws(() => calc.divideNums(), 'There are no numbers in the array!');
    });
  });

  describe('Function toString() ', function () {
    it('no input', function () {
      assert.equal(calc.toString(), 'empty array');
    });

    it('valid input', function () {
      calc.add(1);
      calc.add(2);
      calc.add(3);
      assert.equal(calc.toString(), '1 -> 2 -> 3');
    });
  });

  describe('Function orderBy() ', function () {
    it('no input', function () {
      assert.equal(calc.orderBy(), 'empty');
    });

    it('numbers input', function () {
      calc.add(3);
      calc.add(1);
      calc.add(2);
      assert.equal(calc.orderBy(), '1, 2, 3');
    });

    it('mixed input', function () {
      calc.add(3);
      calc.add('some text');
      calc.add(2);
      assert.equal(calc.orderBy(), '2, 3, some text');
    });
  });
});