function solve() {
  
  return {
    collection: [],
    add: function (el) {
      this.collection.push(el);
      this.collection.sort((a, b) => a - b);
      this.size += 1;
    },
    remove: function (index) {
      if (index < 0 || index >= this.collection.length) {
        throw new Error();
      }

      this.collection.splice(index, 1);
      this.size -= 1;
    },
    get: function (index) {
      if (index < 0 || index >= this.collection.length) {
        throw new Error();
      }

      return this.collection[index];
    },
    size: 0
  }
}