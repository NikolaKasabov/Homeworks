function solve(arr) {
  let processor = (function () {
    let cars = {};

    return {
      create: function (name) {

      },
      inherit: function (childName, parentName) {

      },
      set: function (name, propName, propValue) {

      },
      print: function (name) {
        
      }
    }
  })();
}

solve(
  [
    'create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'
  ]
)

////////////////////////////////////
let child = {
  childProp: 'child prop value'
};

let parent = {
  parentProp: 'parent prop value'
};

Object.setPrototypeOf(child, parent);

for (const key in child) {
  console.log(child[key]);
}