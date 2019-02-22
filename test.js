let templateObj = {
  extensionMethod: function () { return 'sadasdsa' },
  extensionProperty: 'someString',
}

console.log(typeof Object.values(templateObj)[0]);
