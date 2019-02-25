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

      if (this.budget >= quantity * price) {
        this.budget -= (quantity * price);
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
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
