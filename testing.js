let arr = [
  { name: 'Pesho' },
  { name: 'Gosho' },
  { name: 'Penka' }
];

arr = arr.filter(v => {
  return v.name !== 'Gosho';
});

console.log(arr);