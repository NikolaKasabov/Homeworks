// 81/100 points

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
