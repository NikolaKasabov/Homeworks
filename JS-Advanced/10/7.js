


// not mine:
function solve(selector) {
  let selectedEl = [document.querySelector(selector)];
  let counter = 0;
  changeClass(getMaxDeepEl(selectedEl), counter);

  function changeClass(el, num) {
    for (let i = 0; i <= num; i++) {
      el.classList.add('highlight');
      num--;
      return changeClass(el.parentNode, num)
    }
  }

  function getMaxDeepEl(array) {
    let hasChildren = array.filter(x => x.childElementCount > 0);

    if (hasChildren.length > 0) {
      let arrChildren = [].concat(...hasChildren.map(x => Array.from(x.children)));
      counter++
      return getMaxDeepEl(arrChildren)
    } else {
      return array[0];
    }
  }
}