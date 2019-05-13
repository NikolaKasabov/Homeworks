function solve(arr) {
  let processor = (function () {
    let collection = [];

    return {
      add: function (string) {
        collection.push(string);
      },
      remove: function (string) {
        collection = collection.filter(v => v !== string);
      },
      print: function () {
        console.log(collection.join(','));
      }
    }
  })();

  for (const line of arr) {
    const [command, string] = line.split(' ');
    if (command === 'print') {
      processor.print();
    } else {
      processor[command](string);
    }
  }
}

solve(
  ['add hello', 'add again', 'remove hello', 'add again', 'print']
)