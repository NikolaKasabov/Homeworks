function solve(arr) {
  let processor = (function () {
    let cars = {};

    return {
      create: function (name) {
        if (!cars.hasOwnProperty(name)) {
          cars[name] = {};
        }
      },
      inherit: function (childName, parentName) {
        Object.setPrototypeOf(cars[childName], cars[parentName]);
      },
      set: function (name, propName, propValue) {
        if (!cars.hasOwnProperty(name)) {
          return;
        }

        cars[name][propName] = propValue;
      },
      print: function (name) {
        let result = [];
        for (const key in cars[name]) {
          result.push(`${key}:${cars[name][key]}`);
        }

        console.log(result.join(', '));
      }
    }
  })();

  for (const line of arr) {
    let [command, name, third, fourth] = line.split(' ');
    if (command === 'create') {
      processor.create(name);
      if (third === 'inherit') {
        processor.inherit(name, fourth);
      }
    } else if (command === 'set') {
      processor.set(name, third, fourth);
    } else if (command === 'print') {
      processor.print(name);
    }
  }
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
