$(() => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    let isLogged = Boolean(sessionStorage.getItem('authtoken'));

    // ROUTES:
    // home - get
    this.get('#/home', function (ctx) {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/home.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    });


    // register - get
    this.get('#/register', function (ctx) {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/user/register.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    })


    // register - post
    this.post('#/register', function (ctx) {
      const { username, password } = ctx.params;
      // check input
      if (!username || !password) {
        auth.showInfo('Input fields must not be empty.');
        return;
      }

      if (username.length < 3) {
        auth.showInfo('The username should be at least 3 characters long');
        return;
      }

      if (password.length < 6) {
        auth.showInfo('The password should be at least 6 characters long');
        return;
      }

      // send register data to kinvey
      auth.register(username, password)
        .then(function (userData) {
          auth.showInfo('User registration successful.');
          auth.saveSession(userData)
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // login - get
    this.get('#/login', function (ctx) {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/user/login.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    });


    // login - post
    this.post('#/login', function (ctx) {
      const { username, password } = ctx.params;
      auth.login(username, password)
        .then(function (userData) {
          auth.showInfo('Login successful.');
          auth.saveSession(userData);
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // logout - get
    this.get('#/logout', function (ctx) {
      auth.logout()
        .then(function () {
          auth.showInfo('Logout successful.');
          sessionStorage.clear();
          ctx.redirect('#/login');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // all songs - get
    this.get('#/allSongs', function (ctx) {
      const userId = sessionStorage.getItem('userId');
      // get songs and sort them
      requester.get('appdata', 'songs', 'kinvey')
        .then(function (allSongs) {
          let notMySongs = allSongs.filter(song => song._acl.creator !== userId);
          notMySongs.sort((a, b) => b.likes - a.likes);
          let mySongs = allSongs
            .filter(song => song._acl.creator === userId)
            .map(song => {
              song.isAuthor = true;
              return song;
            });
          mySongs.sort((a, b) => b.likes - a.likes || b.listened - a.listened);
          allSongs = notMySongs.concat(mySongs);

          // display the view
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/allSongs.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              allSongs
            }).then(function () {
              // add click event to 'Like' buttons
              $('button[data-type="like"]').click(function (ev) {
                helpFunctions.onLikeClick(ev, app);
              });

              // add click event to 'Listen' buttons
              $('button[data-type="listen"]').click(function (ev) {
                helpFunctions.onListenClick(ev, app);
              });

              // add click event to 'Remove' buttons
              $('button[data-type="remove"]').click(function (ev) {
                helpFunctions.onRemoveClick(ev, app);
              });
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // add song - get
    this.get('#/addSong', function (ctx) {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/addSong.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    });


    // add song - post
    this.post('#/addSong', function (ctx) {
      const { title, artist } = ctx.params;
      const image = ctx.params.imageURL;
      const newSong = {
        title,
        artist,
        image,
        likes: 0,
        listened: 0
      };
      // check inputs
      if (!title || !artist || !image) {
        auth.showInfo('Input fields must not be empty.');
        return;
      }

      if (title.length < 6) {
        auth.showInfo('The title should be at least 6 characters long.');
        return;
      }

      if (artist.length < 3) {
        auth.showInfo('The artist should be at least 3 characters long.');
        return;
      }

      if (!image.startsWith('http://') && !image.startsWith('https://')) {
        auth.showInfo('The image should start with "http://" or "https://"');
        return;
      }

      requester.post('appdata', 'songs', 'kinvey', JSON.parse(JSON.stringify(newSong)))
        .then(function () {
          auth.showInfo('Song created successfully.');
          ctx.redirect('#/allSongs');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // my songs - get
    this.get('#/mySongs', function (ctx) {
      const userId = sessionStorage.getItem('userId');
      // get my songs from kinvey
      requester.get('appdata', `songs?query={"_acl.creator":"${userId}"}`, 'kinvey')
        .then(function (mySongs) {
          mySongs.sort((a, b) => b.likes - a.likes || b.listened - a.listened);
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/mySongs.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              mySongs
            }).then(function () {
              // add click event to 'Listen' buttons
              $('button[data-type="listen"]').click(function (ev) {
                helpFunctions.onListenClick(ev, app);
              });

              // add click event to 'Remove' buttons
              $('button[data-type="remove"]').click(function (ev) {
                helpFunctions.onRemoveClick(ev, ctx);
              });
            });
          });

        })
        .catch(err => auth.showError(err.responseJSON.description));
    });



  });

  app.run('#/home');
});