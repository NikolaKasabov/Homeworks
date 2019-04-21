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


  // add 1 like to animal with _id=animalId
  function addLike(animalId, app) {
    auth.showLoading();
    requester.get('appdata', `pets/${animalId}`, 'kinvey')
      .then(function (petData) {
        petData.likes = Number(petData.likes) + 1;
        requester.update('appdata', `pets/${animalId}`, 'kinvey', JSON.parse(JSON.stringify(petData)))
          .then(function () {
            auth.hideLoading();
            auth.showInfo('Liked!');

            // reload the page
            app.refresh();
          })
          .catch(err => auth.showError(err.responseJSON.description));
      })
      .catch(err => auth.showError(err.responseJSON.description));
  }


  // add 1 listen to song with _id=songId
  function addListen(songId, app) {
    auth.showLoading();
    requester.get('appdata', `songs/${songId}`, 'kinvey')
      .then(function (songData) {
        songData.listened = Number(songData.listened) + 1;
        requester.update('appdata', `songs/${songId}`, 'kinvey', JSON.stringify(songData))
          .then(function () {
            auth.hideLoading();
            auth.showInfo(`You just listened ${songData.title}`);

            // reload the page
            app.refresh();
          })
          .catch(err => auth.showError(err.responseJSON.description));
      })
      .catch(err => auth.showError(err.responseJSON.description));

  }


  // delete song from kinvey
  function removeSong(songId, app) {
    auth.showLoading();
    requester.remove('appdata', `songs/${songId}`, 'kinvey')
      .then(function () {
        auth.hideLoading();
        auth.showInfo('Song removed successfully!');
        // reload page
        app.refresh();
      })
      .catch(err => auth.showError(err.responseJSON.description));
  }

  // event handler for 'Like' button click
  function onLikeClick(ev, app) {
    ev.preventDefault();
    ev.stopPropagation();
    let petId = ev.target.dataset.id;
    addLike(petId, app);
  }

  // event handler for 'Listen' button click
  function onListenClick(ev, app) {
    ev.preventDefault();
    ev.stopPropagation();
    let songId = ev.target.dataset.id;
    addListen(songId, app);
  }

  // event handler for 'Remove' button click
  function onRemoveClick(ev, app) {
    ev.preventDefault();
    ev.stopPropagation();
    let songId = ev.target.dataset.id;
    removeSong(songId, app);
  }

  return {
    // checkRegisterData
    addLike,
    addListen,
    removeSong,
    onLikeClick,
    onListenClick,
    onRemoveClick
  }
})();