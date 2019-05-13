let auth = (() => {
  // save user info to session storage
  function saveSession(userInfo) {
    let userAuth = userInfo._kmd.authtoken;
    sessionStorage.setItem('authtoken', userAuth);
    let userId = userInfo._id;
    sessionStorage.setItem('userId', userId);
    let username = userInfo.username;
    sessionStorage.setItem('username', username);
  }

  // user/login
  function login(username, password) {
    let userData = {
      username,
      password
    };

    return requester.post('user', 'login', 'basic', userData);
  }

  // user/register
  function register(username, password, repeatPassword) {
    let userData = {
      username,
      password
    };

    return requester.post('user', '', 'basic', userData);
  }

  // user/logout
  function logout() {
    let logoutData = {
      authtoken: sessionStorage.getItem('authtoken')
    };

    return requester.post('user', '_logout', 'kinvey', logoutData);
  }

  // show info messages (successfull login, logout, register...)
  function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.on('click', onClickClose);
    infoBox.html(`<span>${message}</span>`);
    infoBox.show();

    setTimeout(() => {
      infoBox.off('click', onClickClose);
      infoBox.fadeOut();
    }, 3000);

    function onClickClose() {
      infoBox.off('click', onClickClose);
      infoBox.fadeOut();
    }
  }

  // show error messages and hide 'Loading...' AJAX message
  function showError(message) {
    let errorBox = $('#errorBox');
    errorBox.on('click', onClickClose);
    errorBox.html(`<span>${message}</span>`);
    errorBox.show();
    // hideLoading();

    setTimeout(() => {
      errorBox.off('click', onClickClose);
      errorBox.fadeOut();
    }, 3000);

    function onClickClose() {
      errorBox.off('click', onClickClose);
      errorBox.fadeOut();
    }
  }

  // hide error message
  function hideError() {
    let errorBox = $('#errorBox');
    errorBox.hide();    
  }

  // // show 'Loading...' message when AJAX request is started
  // function showLoading() {
  //   $('#loadingBox').show();
  // }

  // // hide 'Loading...' message when AJAX request is finished
  // function hideLoading() {
  //   $('#loadingBox').fadeOut();
  // }

  $(document).on({
    ajaxStart: () => $('#loadingBox').show(),
    ajaxStop: () => $('#loadingBox').fadeOut()
  })

  return {
    login,
    register,
    logout,
    saveSession,
    showInfo,
    showError,
    hideError,
    // showLoading,
    // hideLoading
  }
})()