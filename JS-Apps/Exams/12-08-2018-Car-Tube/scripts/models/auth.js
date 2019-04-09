let auth = (() => {
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

  // show error messages
  function showError(message) {
    let errorBox = $('#errorBox');
    errorBox.html(`<span>${message}</span>`);
    errorBox.show();
    errorBox.click(() => errorBox.fadeOut());
    hideLoading();
  }

  // show 'Loading...' message when AJAX request is started
  function showLoading() {
    $('#loadingBox').show();
  }

  // hide 'Loading...' message when AJAX request is finished
  function hideLoading() {
    $('#loadingBox').fadeOut();
  }

  return {
    login,
    register,
    logout,
    saveSession,
    showInfo,
    showError,
    showLoading,
    hideLoading
  }
})()