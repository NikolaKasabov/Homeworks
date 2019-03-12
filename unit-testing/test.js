const assert = require('chai').assert;

class Warehouse {

  get capacity() {
    return this._capacity;
  }

  set capacity(givenSpace) {
    if (typeof givenSpace === 'number' && givenSpace > 0) {
      return this._capacity = givenSpace;
    } else {
      throw `Invalid given warehouse space`;
    }
  }

  constructor(capacity) {
    this.capacity = capacity;
    this.availableProducts = { 'Food': {}, 'Drink': {} };
  }

  addProduct(type, product, quantity) {
    let addedQuantity = ((this.capacity - this.occupiedCapacity()) - quantity);
    let output;

    if (addedQuantity >= 0) {

      if (this.availableProducts[type].hasOwnProperty(product) === false) {
        this.availableProducts[type][product] = 0;
      }

      this.availableProducts[type][product] += quantity;
      output = this.availableProducts[type];

    } else {
      throw `There is not enough space or the warehouse is already full`;
    }

    return output;
  }

  orderProducts(type) {
    let output;
    let sortedKeys = Object.keys(this.availableProducts[type])
      .sort((a, b) => this.availableProducts[type][b] - this.availableProducts[type][a]);

    let newObj = {};

    for (let product of sortedKeys) {
      if (newObj.hasOwnProperty(product) === false) {
        newObj[product] = 0;
      }

      newObj[product] += this.availableProducts[type][product];
    }

    this.availableProducts[type] = newObj;
    output = this.availableProducts[type];

    return output;
  }

  occupiedCapacity() {
    let output = 0;
    let productsCount = Object.keys(this.availableProducts['Food']).length +
      Object.keys(this.availableProducts['Drink']).length;

    if (productsCount > 0) {
      let quantityInStock = 0;

      for (let type of Object.keys(this.availableProducts)) {
        for (let product of Object.keys(this.availableProducts[type])) {
          quantityInStock += this.availableProducts[type][product];
        }
      }

      output = quantityInStock;
    }

    return output;
  }

  revision() {
    let output = "";

    if (this.occupiedCapacity() > 0) {

      for (let type of Object.keys(this.availableProducts)) {
        output += `Product type - [${type}]\n`;
        for (let product of Object.keys(this.availableProducts[type])) {
          output += `- ${product} ${this.availableProducts[type][product]}\n`;
        }
      }
    } else {
      output = 'The warehouse is empty';
    }

    return output.trim();
  }

  scrapeAProduct(product, quantity) {
    let type = Object.keys(this.availableProducts).find(t => Object.keys(this.availableProducts[t]).includes(product));
    let output;

    if (type !== undefined) {
      if (quantity <= this.availableProducts[type][product]) {
        this.availableProducts[type][product] -= quantity;
      } else {
        this.availableProducts[type][product] = 0;
      }

      output = this.availableProducts[type];

    } else {
      throw `${product} do not exists`;
    }

    return output;
  }
}

// let warehouse = new Warehouse(12);

// console.log(warehouse.capacity);



describe('testing', function () {
  it('invalid input', function () {
    assert.throws(function () { let warehouse = new Warehouse(0); }, 'Invalid given warehouse space');
    assert.throws(function () { let warehouse = new Warehouse(-1); }, 'Invalid given warehouse space');
    assert.throws(function () { let warehouse = new Warehouse('text'); }, 'Invalid given warehouse space');
    assert.throws(function () { let warehouse = new Warehouse(); }, 'Invalid given warehouse space');
  });

  it('capacity', function () {
    let warehouse = new Warehouse(100);
    assert.equal(warehouse.capacity, 100);
    assert.throws(function () { warehouse.capacity = 0; }, 'Invalid given warehouse space');
    assert.throws(function () { warehouse.capacity = -1; }, 'Invalid given warehouse space');
  })

  it('addProduct(type, product, quantity)', function () {
    let warehouse = new Warehouse(100);
    assert.isObject(warehouse);
    assert.equal(warehouse.capacity, 100);
    assert.equal(JSON.stringify(warehouse), JSON.stringify({ _capacity: 100, availableProducts: { 'Food': {}, 'Drink': {} } }));
    warehouse.addProduct('Food', 'Bread', 10);
    assert.equal(warehouse.availableProducts.Food.Bread, 10);
    assert.equal(JSON.stringify(warehouse), JSON.stringify({ _capacity: 100, availableProducts: { 'Food': { 'Bread': 10 }, 'Drink': {} } }));
    warehouse.addProduct('Food', 'Bread', 10);
    assert.equal(JSON.stringify(warehouse), JSON.stringify({ _capacity: 100, availableProducts: { 'Food': { 'Bread': 20 }, 'Drink': {} } }));
    warehouse.addProduct('Drink', 'Beer', 20);
    assert.equal(JSON.stringify(warehouse), JSON.stringify({ _capacity: 100, availableProducts: { 'Food': { 'Bread': 20 }, 'Drink': { 'Beer': 20 } } }));
    assert.throws(function () { warehouse.addProduct('Food', 'Bread', 100); }, 'There is not enough space or the warehouse is already full');
  });

  it('orderProducts(type)', function () {
    let warehouse = new Warehouse(100);
    warehouse.addProduct('Food', 'Bread', 10);
    warehouse.addProduct('Food', 'Meat', 20);
    warehouse.orderProducts('Food');
    assert.equal(JSON.stringify(warehouse), JSON.stringify({ _capacity: 100, availableProducts: { 'Food': { 'Meat': 20, 'Bread': 10 }, 'Drink': {} } }));
  });

  it('occupiedCapacity()', function () {
    let warehouse = new Warehouse(100);
    warehouse.addProduct('Food', 'Bread', 10);
    warehouse.addProduct('Food', 'Meat', 20);
    assert.isNumber(warehouse.occupiedCapacity());
    assert.equal(warehouse.occupiedCapacity(), 30);
  });

  it('revision()', function () {
    let warehouse = new Warehouse(100);
    assert.equal(warehouse.revision(), 'The warehouse is empty');
    assert.isString(warehouse.revision());
    warehouse.addProduct('Food', 'Bread', 10);
    assert.isString(warehouse.revision());
    assert.equal(warehouse.revision(), 'Product type - [Food]\n- Bread 10\nProduct type - [Drink]\n'.trim());
    warehouse.addProduct('Drink', 'Beer', 20);
    assert.equal(warehouse.revision(), 'Product type - [Food]\n- Bread 10\nProduct type - [Drink]\n- Beer 20\n'.trim());
  });

  it('scrapeAProduct(product, quantity)', function () {
    let warehouse = new Warehouse(100);
    assert.throws(function () { warehouse.scrapeAProduct('Milk', 30) }, 'Milk do not exists');
    warehouse.addProduct('Drink', 'Milk', 10);
    assert.equal(JSON.stringify(warehouse.scrapeAProduct('Milk', 5)), JSON.stringify({ Milk: 5 }));
    assert.equal(JSON.stringify(warehouse.scrapeAProduct('Milk', 20)), JSON.stringify({ Milk: 0 }));
  });
});
