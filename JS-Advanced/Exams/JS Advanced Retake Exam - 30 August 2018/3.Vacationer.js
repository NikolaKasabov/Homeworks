class Vacationer {
  constructor(namesArr, creditCardArr) {
    this.fullName = namesArr;

    if (creditCardArr && (typeof creditCardArr[0] !== 'number' || typeof creditCardArr[1] !== 'string' || typeof creditCardArr[2] !== 'number')) {
      throw new Error('Invalid credit card details');
    }
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
      id += '8';
    } else {
      id += '7';
    }

    return id;
  }

  addCreditCardInfo(inputArr) {
    if (inputArr.length < 3) {
      throw new Error('Missing credit card information');
    }
    // ??? strings or numbers - inputArr[0] and [2]
    if (typeof (inputArr[0]) !== 'number' || typeof (inputArr[1]) !== 'string' || typeof (inputArr[2]) !== 'number') {
      throw new Error('Invalid credit card details');
    }

    this.creditCard.cardNumber = inputArr[0];
    this.creditCard.expirationDate = inputArr[1];
    this.creditCard.securityNumber = inputArr[2];
  }

  addDestinationToWishList(destination) {
    if (this.wishList.includes(destination)) {
      throw new Error('Destination already exists in wishlist');
    }

    this.wishList.push(destination);
    this.wishList.sort((a, b) => a.length - b.length);
  }

  getVacationerInfo() {
    let wishListString = this.wishList.join(', ') || 'empty';
    let result = `Name: ${this.fullName.firstName} ${this.fullName.middleName} ${this.fullName.lastName}\n`;
    result += `ID Number: ${this.idNumber}\nWishlist:\n${wishListString}\nCredit Card:\n`;
    result += `Card Number: ${this.creditCard.cardNumber}\nExpiration Date: ${this.creditCard.expirationDate}\nSecurity Number: ${this.creditCard.securityNumber}\n`;
    return result;
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
