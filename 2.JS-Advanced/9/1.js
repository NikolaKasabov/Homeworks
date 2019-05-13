function solve(inputArr) {
  const result = [];

  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    area() {
      return this.width * this.height;
    }

    compareTo(other) {
      if (this.area() === other.area()) {
        return other.width - this.width;
      } else {
        return other.area() - this.area();
      }
    }
  }

  for (const arr of inputArr) {
    let currentRect = new Rectangle(arr[0], arr[1]);
    result.push(currentRect);
  }

  result.sort((a, b) => a.compareTo(b));

  return result;
}

console.log(solve(
  [
    [1, 20], [20, 1], [5, 3], [5, 3]
  ]
));
