let helpFunctions = (() => {
  // function checkRegisterData(username, password, repeatPass) {
  //   let isDataValid = true;
  //   const usernameRegex = /^[a-zA-Z]{3,}$/;
  //   const passwordRegex = /^[a-zA-Z0-9]{6,}$/;

  //   if (!usernameRegex.test(username)) {
  //     auth.showError('Username is not valid!');
  //     isDataValid = false;
  //   } else if(!passwordRegex.test(password)){
  //     auth.showError('Password is not valid!');
  //     isDataValid = false;
  //   } else if (password !== repeatPass) {
  //     auth.showError('Passwords are not same!');
  //     isDataValid = false;
  //   }

  //   return isDataValid;
  // }


  // add 1 like to pet with _id=petId
  function addLike(petId) {
    auth.showLoading();
    requester.get('appdata', `pets/${petId}`, 'kinvey')
      .then(function (petData) {
        petData.likes = Number(petData.likes) + 1;
        requester.update('appdata', `pets/${petId}`, 'kinvey', JSON.parse(JSON.stringify(petData)))
          .then(function () {
            auth.hideLoading();
          })
          .catch(err => auth.showError(err.responseJSON.description));        
      })
      .catch(err => auth.showError(err.responseJSON.description));
  }

  return {
    // checkRegisterData
    addLike
  }
})();