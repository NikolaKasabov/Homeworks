function solve(arr, sortingBy) {
  class Ticket {
    constructor(destination, price, status) {
      this.destination = destination;
      this.price = +price;
      this.status = status;
    }
  }

  let sortingIndex = 0;
  if (sortingBy === 'price') sortingIndex = 1;
  else if (sortingBy === 'status') sortingIndex = 2;

  const sorted = arr.map((string) => {
    const [destination, price, status] = string.split('|');
    return [destination, +price, status];
  }).sort((a, b) => {
    if (sortingBy === 'price') {
      return a[sortingIndex] - b[sortingIndex];
    }

    return a[sortingIndex].localeCompare(b[sortingIndex]);
  });

  const result = [];
  sorted.forEach((arr) => {
    result.push(new Ticket(arr[0], arr[1], arr[2]));
  });

  return result;
}

solve(
  [
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed',
  ],
  'destination',
);
