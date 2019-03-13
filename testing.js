let arr = [1, 2, 3, 'asd'].reduce((acc, cur) => {
  return acc.concat(cur);
}, []);

console.log(arr);