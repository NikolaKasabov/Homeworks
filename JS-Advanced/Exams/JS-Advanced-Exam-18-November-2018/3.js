class Vacation {
  constructor(organizer, destination, budget) {
    this.organizer = organizer;
    this.destination = destination;
    this.budget = budget;
    this.kids = {};
  }

  registerChild(name, grade, budget) {
    function isKidAlreadyAdded(grade, name) {
      return this.kids[grade].some(v => v.startsWith(name));
    }

    if (budget < this.budget) {
      return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
    }

    if (!this.kids.hasOwnProperty(grade)) {
      this.kids[grade] = [];
    }

    if (isKidAlreadyAdded.call(this, grade, name)) {
      return `${name} is already in the list for this ${this.destination} vacation.`;
    }

    this.kids[grade].push(`${name}-${budget}`);
    return this.kids[grade];
  }

  removeChild(name, grade) {
    // check if kid is added
    if (this.kids.hasOwnProperty(grade) && this.kids[grade].some(v => v.startsWith(name))) {
      const indexToDelete = this.kids[grade].findIndex(v => v.startsWith(name));
      this.kids[grade].splice(indexToDelete, 1);
      return this.kids[grade];
    }

    return `We couldn't find ${name} in ${grade} grade.`;
  }

  toString() {
    const sorted = Object.entries(this.kids)
      .sort((a, b) => a[0] - b[0]);
    const numberOfChildren = sorted.reduce((acc, cur) => acc + cur[1].length, 0);

    if (numberOfChildren === 0) {
      return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
    }

    let result = '';
    result += `${this.organizer} will take ${numberOfChildren} children on trip to ${this.destination}\n`;
    sorted.forEach(gradeArr => {
      result += `Grade: ${gradeArr[0]}\n`;
      gradeArr[1].forEach((v, i) => {
        result += `${i + 1}. ${v}\n`;
      });
    })

    return result;
  }

  get numberOfChildren() {
    const numberOfChildren = Object.entries(this.kids)
      .reduce((acc, cur) => acc + cur[1].length, 0);
    
    return numberOfChildren;
  }
}

let vacation = new Vacation('Mr Pesho', 'San diego', 2000);
vacation.registerChild('Gosho', 5, 2000);
vacation.registerChild('Lilly', 6, 2100);

console.log(vacation.removeChild('Gosho', 9));

vacation.registerChild('Pesho', 6, 2400);
vacation.registerChild('Gosho', 5, 2000);
console.log(vacation.removeChild('Lilly', 6));
console.log(vacation.registerChild('Tanya', 5, 6000))
