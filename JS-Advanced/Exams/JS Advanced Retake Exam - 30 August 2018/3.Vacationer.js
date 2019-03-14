class Vacationer {
  constructor(namesArr, creditCardArr) {
    this.fullName = namesArr;
    this.creditCard = {
      cardNumber: creditCardArr ? creditCardArr[0] : 1111,
      expirationDate: creditCardArr ? creditCardArr[1] : '',
      securityNumber: creditCardArr ? creditCardArr[2] : 111
    };
    this.wishList = [];
    this.idNumber = this.generateIDNumber(namesArr);
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(namesArr) {
    if (namesArr.length !== 3) {
      throw new Error('Name must include first name, middle name and last name');
    }

    let nameRegex = /^[A-Z][a-z]+$/;

    namesArr.forEach(name => {
      if (!nameRegex.test(name)) {
        throw new Error('Invalid full name');
      }
    });

    this._fullName = { firstName: namesArr[0], middleName: namesArr[1], lastName: namesArr[2] };
  }

  generateIDNumber(namesArr) {
    let id = 231 * namesArr[0][0].charCodeAt(0);
    id += 139 * namesArr[1].length;

    let vowels = ["a", "e", "o", "i", "u"];
    let lastNameLastLetter = namesArr[2][namesArr[2].length - 1];
    if (vowels.includes(lastNameLastLetter)) {
      id += 8;
    } else {
      id += 7;
    }

    return id;
  }

  addCreditCardInfo(inputArr) {
    
  }
}



// Initialize vacationers with 2 and 3 parameters
let vacationer1 = new Vacationer(["Vania", "Ivanova", "Zhivkova"]);
let vacationer2 = new Vacationer(["Tania", "Ivanova", "Zhivkova"], [123456789, "10/01/2018", 777]);

// Should throw an error (Invalid full name)
try {
  let vacationer3 = new Vacationer(["Vania", "Ivanova", "ZhiVkova"]);
} catch (err) {
  console.log("Error: " + err.message);
}

console.log(vacationer1.testing);

// Should throw an error (Missing credit card information)
try {
  let vacationer3 = new Vacationer(["Zdravko", "Georgiev", "Petrov"]);
  vacationer3.addCreditCardInfo([123456789, "20/10/2018"]);
} catch (err) {
  console.log("Error: " + err.message);
}

vacationer1.addDestinationToWishList('Spain');
vacationer1.addDestinationToWishList('Germany');
vacationer1.addDestinationToWishList('Bali');

// Return information about the vacationers
console.log(vacationer1.getVacationerInfo());
console.log(vacationer2.getVacationerInfo());
