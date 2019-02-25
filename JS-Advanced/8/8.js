class Kitchen {
  constructor(budget) {
    this.budget = +budget;
    this.menu = {};
    this.productsInStock = {};
    this.actionsHistory = [];
  }

  loadProducts(arr) {
    arr.forEach((string) => {
      let [productName, quantity, price] = string.split(' ');
      quantity = +quantity;
      price = +price;

      if (this.budget >= price) {
        this.budget -= price;
        if (!this.productsInStock.hasOwnProperty(productName)) {
          this.productsInStock[productName] = quantity;
        } else {
          this.productsInStock[productName] += quantity;
        }

        this.actionsHistory.push(`Successfully loaded ${quantity} ${productName}`);
      } else {
        this.actionsHistory.push(`There was not enough money to load ${quantity} ${productName}`);
      }
    });

    return this.actionsHistory.join('\n');
  }

  addToMenu(meal, neededProducts, price) {
    if (!this.menu.hasOwnProperty(meal)) {
      this.menu[meal] = {
        neededProducts: neededProducts,
        price: +price,
      };

      const numberOfMeals = Object.keys(this.menu).length;
      return `Great idea! Now with the ${meal} we have ${numberOfMeals} meals in the menu, other ideas?`;
    }

    return `The ${meal} is already in our menu, try something different.`;
  }

  showTheMenu() {
    let result = [];
    if (Object.keys(this.menu).length === 0) {
      return 'Our menu is not ready yet, please come later...';
    }

    Object.entries(this.menu).forEach((arr) => {
      result.push(`${arr[0]} - $ ${arr[1].price}`);
    });

    return result.join('\n');
  }
}



let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));

console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));

console.log(kitchen.showTheMenu());
// kitchen.showTheMenu();
