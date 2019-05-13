function solve() {
  let firstInputEl, secondInputEl, resultElement;
  // let addButton = document.querySelector('#sumButton');
  // let subtractButton = document.querySelector('#subtractButton');

  return {
    init: (selector1, selector2, resultSelector) => {
      firstInputEl = document.querySelector('#num1');
      secondInputEl = document.querySelector('#num2');
      resultElement = document.querySelector('#result');
    },
    add: () => {
      const firstNum = +(firstInputEl.value);
      const secondNum = +(secondInputEl.value);
      resultElement.value = firstNum + secondNum;
    },
    subtract: () => {
      const firstNum = +(firstInputEl.value);
      const secondNum = +(secondInputEl.value);
      resultElement.value = firstNum - secondNum;
    }
  }
}