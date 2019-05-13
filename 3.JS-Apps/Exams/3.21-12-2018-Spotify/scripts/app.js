$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    let isLogged = Boolean(sessionStorage.getItem('authtoken'));

    // ROUTES:
    // home - get
    this.get('#/home', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/home.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username'),
        });
      });
    });


    // register - get
    this.get('#/register', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/register.hbs');
      });
    });


    // register - post
    this.post('#/register', function (ctx) {
      let { username, password } = ctx.params;
      if (username.length < 3) {
        auth.showError('Username must be at least 3 symbols');
        return;
      }

      if (password.length < 6) {
        auth.showError('Password must be at least 6 symbols');
        return;
      }

      auth.showLoading();
      auth.register(username, password)
        .then(function (userInfo) {
          auth.hideLoading();
          auth.saveSession(userInfo);
          auth.showInfo('User registration successful.');
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // login - get
    this.get('#/login', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/login.hbs');
      });
    });


    // login - post
    this.post('#/login', function (ctx) {
      let { username, password } = ctx.params;
      if (username.length < 3) {
        auth.showError('Username must be at least 3 symbols');
        return;
      }

      if (password.length < 6) {
        auth.showError('Password must be at least 6 symbols');
        return;
      }

      auth.hideError();
      auth.showLoading();
      auth.login(username, password)
        .then(function (userInfo) {
          auth.hideLoading();
          auth.saveSession(userInfo);
          auth.showInfo('Login successful.');
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // logout
    this.get('#/logout', function (ctx) {
      auth.showLoading();
      auth.logout()
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Logout successful.');
          sessionStorage.clear();
          ctx.redirect('#/login');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // all songs - get
    this.get('#/allSongs', function (ctx) {
      auth.showLoading();
      // get all songs from kinvey
      requester.get('appdata', 'songs', 'kinvey')
        .then(function (allSongs) {
          auth.hideLoading();
          const userId = sessionStorage.getItem('userId');
          // sort all songs
          let notMySongs = allSongs.filter(song => song._acl.creator !== userId)
            .sort((a, b) => b.likes - a.likes);
          let mySongs = allSongs.filter(song => song._acl.creator === userId)
            .sort((a, b) => b.likes - a.likes || b.listened - a.listened)
            .map(song => {
              song.isAuthor = true;
              return song;
            });
          let allSongsSorted = notMySongs.concat(mySongs);

          // display page
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/songs/allSongs.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              allSongs: allSongsSorted,
            }).then(function () {

              // add click event to 'Like' buttons
              $('button[data-type="like"]').on('click', function (ev) {
                helpFunctions.onLikeClick(ev, app);
              });
              // add click event to 'Listen' buttons
              $('button[data-type="listen"]').on('click', function (ev) {
                helpFunctions.onListenClick(ev, app);
              });
              // add click event to 'Remove' buttons
              $('button[data-type="remove"]').on('click', function (ev) {
                helpFunctions.onRemoveClick(ev, app);
              });
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // add song - get
    this.get('#/addSong', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/songs/addSong.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username'),
        });
      });
    });


    // add song - post
    this.post('#/addSong', function (ctx) {
      let { title, artist, imageURL } = ctx.params;
      if (title.length < 3) {
        auth.showError('Title must be at least 3 symbols');
        return;
      }

      if (artist.length < 6) {
        auth.showError('Artist must be at least 6 symbols');
        return;
      }

      if (!imageURL.startsWith('http://')
        && !imageURL.startsWith('https://')) {
        auth.showError('The imageURL should start with "http://" or "https://"');
        return;
      }

      let currentSong = {
        title,
        artist,
        image: imageURL,
        likes: 0,
        listened: 0
      };

      auth.showLoading();
      requester.post('appdata', 'songs', 'kinvey', JSON.parse(JSON.stringify(currentSong)))
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Song created successfully.');
          ctx.redirect('#/allSongs');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // my songs - get
    this.get('#/mySongs', function (ctx) {
      auth.showLoading();
      let endURL = `songs?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`;
      requester.get('appdata', endURL, 'kinvey')
        .then(function (mySongs) {
          auth.hideLoading();
          // display page
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/songs/mySongs.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              mySongs
            }).then(function () {
              // add click event to 'Listen' buttons
              $('button[data-type="listen"]').on('click', function (ev) {
                helpFunctions.onListenClick(ev, app);
              });
              // add click event to 'Remove' buttons
              $('button[data-type="remove"]').on('click', function (ev) {
                helpFunctions.onRemoveClick(ev, app);
              });
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });



  });

  app.run('#/home');
});