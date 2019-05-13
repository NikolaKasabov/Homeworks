class CheckingAccount {
  constructor(clientId, email, firstName, lastName) {
    if (typeof clientId !== 'string' || clientId.length !== 6) {
      throw new TypeError('Client ID must be a 6-digit number');
    }

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z.]+$/;
    if (!emailRegex.test(email)) {
      throw new TypeError('Invalid e-mail');
    }

    if (firstName.length < 3 || firstName.length > 20) {
      throw new TypeError('First name must be between 3 and 20 characters long');
    }

    if (lastName.length < 3 || lastName.length > 20) {
      throw new TypeError('Last name must be between 3 and 20 characters long');
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName)) {
      throw new TypeError('First name must contain only Latin characters');
    }

    if (!nameRegex.test(lastName)) {
      throw new TypeError('Last name must contain only Latin characters');
    }
  }
}

const acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');
