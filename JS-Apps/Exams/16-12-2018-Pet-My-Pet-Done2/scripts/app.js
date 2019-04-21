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
    });


    // register - post
    this.post('#/register', function (ctx) {
      const { username, password } = ctx.params;
      // check inputs
      if (!username || !password) {
        auth.showError('Fields must be non-empty.');
        return;
      }

      if (username.length < 3) {
        auth.showError('Username must be at least 3 symbols.');
        return;
      }

      if (password.length < 6) {
        auth.showError('Password must be at least 6 symbols.');
        return;
      }

      auth.showLoading();
      auth.register(username, password)
        .then(function (userInfo) {
          auth.hideLoading();
          auth.saveSession(userInfo);
          auth.showInfo('User registration successful.');
          ctx.redirect('#/home');
        }).catch(err => auth.showError(err.responseJSON.description));
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
      // check inputs
      if (!username || !password) {
        auth.showError('Fields must be non-empty.');
        return;
      }

      if (username.length < 3) {
        auth.showError('Username must be at least 3 symbols.');
        return;
      }

      if (password.length < 6) {
        auth.showError('Password must be at least 6 symbols.');
        return;
      }

      auth.showLoading();
      auth.login(username, password)
        .then(function (userData) {
          auth.hideLoading();
          auth.saveSession(userData);
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
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // dashboard
    this.get('#/dashboard/:animalsCategory', function (ctx) {
      const animalsCategory = ctx.params.animalsCategory;
      const userId = sessionStorage.getItem('userId');
      let lastPart = `pets?query={"_acl.creator":{"$ne":"${userId}"}}&sort={"likes": -1}`;
      if (animalsCategory !== 'All') {
        lastPart = `pets?query={"_acl.creator":{"$ne":"${userId}"},"category":"${animalsCategory}"}&sort={"likes": -1}`;
      }

      // get animals data
      auth.showLoading();
      requester.get('appdata', lastPart, 'kinvey')
        .then(function (animalsData) {
          auth.hideLoading();
          // display the view
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/dashboard.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              animals: animalsData
            }).then(function () {
              // add click event to 'Like' buttons
              $('button[data-type="like"]').click(function (ev) {
                helpFunctions.onLikeClick(ev, app);
              });
            })
          });

        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // add pet - get
    this.get('#/addPet', function (ctx) {
      ctx.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/pets/addPet.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    });


    // add pet - post
    this.post('#/addPet', function (ctx) {
      let petData = ctx.params;
      petData.likes = 0;
      // add pet to kinvey
      auth.showLoading();
      requester.post('appdata', 'pets', 'kinvey', JSON.parse(JSON.stringify(petData)))
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Pet created.');
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // my pets - get
    this.get('#/myPets', function (ctx) {
      const userId = sessionStorage.getItem('userId');
      const lastPart = `pets?query={"_acl.creator":"${userId}"}`;
      // get my pets from kinvey
      auth.showLoading();
      requester.get('appdata', lastPart, 'kinvey')
        .then(function (myPetsData) {
          auth.hideLoading();
          // display the view
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/pets/myPets.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              myPets: myPetsData
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // edit pet - get
    this.get('#/edit/:petId', function (ctx) {
      const petId = ctx.params.petId;
      //get pet data
      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/pets/editPet.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // edit pet - post
    this.post('#/edit/:petId', function (ctx) {
      const petId = ctx.params.petId;
      const newDescription = ctx.params.description;
      // get pet data
      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          petData.description = newDescription;
          // update pet in kinvey
          requester.update('appdata', `pets/${petId}`, 'kinvey', JSON.parse(JSON.stringify(petData)))
            .then(function () {
              auth.hideLoading();
              auth.showInfo('Updated successfully!');
              ctx.redirect('#/dashboard/All');
            })
            .catch(err => auth.showError(err.responseJSON.description));
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // details - get
    this.get('#/details/:petId', function (ctx) {
      const petId = ctx.params.petId;
      //get pet data
      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          // display the view
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/pets/details.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData,
            }).then(function () {
              // add click event to 'Like' button
              $('button[data-type="like"]').click(function (ev) {
                helpFunctions.onLikeClick(ev, app);
              });
            })
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // delete pet - get
    this.get('#/delete/:petId', function (ctx) {
      const petId = ctx.params.petId;
      // get pet data
      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          // display the view
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/pets/delete.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // delete pet - post
    this.post('#/delete/:petId', function (ctx) {
      const petId = ctx.params.petId;
      // send delete request
      auth.showLoading();
      requester.remove('appdata', `pets/${petId}`, 'kinvey')
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Pet removed successfully!');
          ctx.redirect('#/dashboard/All');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


  });

  app.run('#/home');
});