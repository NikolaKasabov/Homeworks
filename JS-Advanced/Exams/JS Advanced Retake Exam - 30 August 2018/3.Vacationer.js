class Vacationer {
  constructor(namesArr) {
    this.fullName = { firstName: namesArr[0], middleName: namesArr[1], lastName: namesArr[2] };
    this.idNumber;
  }

  get fullName() {
    return this._fullname;
  }

  set fullName(namesArr) {
    console.log(namesArr);
    if (namesArr.length !== 3) {
      // throw new Error('Name must include first name, middle name and last name');
    }

    let nameRegex = /^[A-Z][a-z]+$/;

    namesArr.forEach(name => {
      if (!nameRegex.test(name)) {
        throw new Error('Invalid full name');
      }
    });

    this._fullname = { firstName: namesArr[0], middleName: namesArr[1], lastName: namesArr[2] };
  }
}

let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
