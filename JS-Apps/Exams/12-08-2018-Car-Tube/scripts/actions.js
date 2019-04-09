let actions = (() => {
  function checkRegisterData(username, password, repeatPass) {
    let isDataValid = true;
    const usernameRegex = /^[a-zA-Z]{3,}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;

    if (!usernameRegex.test(username)) {
      auth.showError('Username is not valid!');
      isDataValid = false;
    } else if(!passwordRegex.test(password)){
      auth.showError('Password is not valid!');
      isDataValid = false;
    } else if (password !== repeatPass) {
      auth.showError('Passwords are not same!');
      isDataValid = false;
    }

    return isDataValid;
  }

  return {
    checkRegisterData
  }
})();