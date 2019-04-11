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
          username: sessionStorage.getItem('username')
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
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // dashboard - get
    this.get('#/dashboard/:category', function (ctx) {
      let userId = sessionStorage.getItem('userId');
      let category = ctx.params.category.slice(1);
      // "not mine" pets - all categories, sorted by likes - descending
      let requestEndpoint = `pets?query={"_acl.creator":{"$ne":"${userId}"}}&sort={"likes":-1}`;
      // "not mine" pets - specific category, sorted by likes - descending
      if (category !== 'All') {
        requestEndpoint = `pets?query={"_acl.creator":{"$ne":"${userId}"},"category":"${category}"}&sort={"likes":-1}`;
      }

      auth.showLoading();
      requester.get('appdata', requestEndpoint, 'kinvey')
        .then(function (petsData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/dashboard.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pets: JSON.parse(JSON.stringify(petsData))
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // add like
    this.get('#/addLike/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);
      helpFunctions.addLike(petId);
    });


    // add pet - get
    this.get('#/addPet', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
      }).then(function () {
        this.partial('../templates/addPet.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username')
        });
      });
    });


    // add pet - post
    this.post('#/addPet', function (ctx) {
      let petData = ctx.params;
      petData.likes = 0;

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
      let userId = sessionStorage.getItem('userId');

      auth.showLoading();
      requester.get('appdata', `pets?query={"_acl.creator":"${userId}"}`)
        .then(function (petsData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/myPets.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pets: petsData,
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // edit my pet - get
    this.get('#/edit/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);

      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/edit.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData,
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // edit my pet - post
    this.post('#/edit/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);
      let newDescription = ctx.params.description;

      // get all data for this pet
      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          petData.description = newDescription;
          requester.update('appdata', `pets/${petId}`, 'kinvey', JSON.parse(JSON.stringify(petData)))
            .then(function () {
              auth.hideLoading();
              auth.showInfo('Updated successfully!');
              ctx.redirect('#/dashboard/:All');
            })
            .catch(err => auth.showError(err.responseJSON.description));
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // details other pet - get
    this.get('#/detailsOtherPet/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);

      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/detailsOtherPet.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData,
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // delete one of my pets - get
    this.get('#/delete/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);

      auth.showLoading();
      requester.get('appdata', `pets/${petId}`, 'kinvey')
        .then(function (petData) {
          auth.hideLoading();
          ctx.loadPartials({
            header: '../templates/common/header.hbs',
            footer: '../templates/common/footer.hbs',
          }).then(function () {
            this.partial('../templates/delete.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              pet: petData,
            });
          });
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


    // delete one of my pets - post
    this.post('#/delete/:petId', function (ctx) {
      let petId = ctx.params.petId.slice(1);

      auth.showLoading();
      requester.remove('appdata', `pets/${petId}`, 'kinvey')
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Pet removed successfully!');
          ctx.redirect('#/home');
        })
        .catch(err => auth.showError(err.responseJSON.description));
    });


  });


  app.run('#/home');
});