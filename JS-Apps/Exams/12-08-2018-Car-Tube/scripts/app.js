$(() => {
  const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    let isLogged = Boolean(sessionStorage.getItem('authtoken'));

    // ROUTES:
    // home - get
    this.get('#/', function () {
      this.loadPartials({
        navigation: '../templates/navigation.hbs',
        footer: '../templates/footer.hbs',
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
        navigation: '../templates/navigation.hbs',
        footer: '../templates/footer.hbs',
      }).then(function () {
        this.partial('../templates/register.hbs');
      })
    });


    // register - post
    this.post('#/register', function (context) {
      let { username, password, repeatPass } = context.params;
      // check if register data is valid
      if (!actions.checkRegisterData(username, password, repeatPass)) {
        return;
      }

      // if data is valid, show message and register user in Kinvey
      auth.showLoading();
      auth.register(username, password, repeatPass)
        .then((userData) => {
          auth.saveSession(userData);
          auth.hideLoading();
          auth.showInfo('User registration successful.');
          context.redirect('#/catalog');
        })
        .catch(error => {
          auth.showError(error.responseJSON.description);
          auth.hideLoading();
        })
    });


    // login - get
    this.get('#/login', function () {
      this.loadPartials({
        navigation: '../templates/navigation.hbs',
        footer: '../templates/footer.hbs',
      }).then(function () {
        this.partial('../templates/login.hbs');
      })
    })


    // login - post
    this.post('#/login', function (context) {
      let { username, password } = context.params;

      // send login request to Kinvey
      auth.showLoading();
      auth.login(username, password)
        .then(userData => {
          auth.hideLoading();
          auth.saveSession(userData);
          // clear input fields and redirect to home page
          $('div#login input').val('');
          auth.showInfo('Login successful.');
          context.redirect('#/');
        })
        .catch(error => {
          auth.hideLoading();
          auth.showError(error.responseJSON.description);
        });
    });


    // logout
    this.get('#/logout', function () {
      // send logout request to Kinvey
      auth.logout()
        .then(() => {
          sessionStorage.clear();
          this.redirect('#/login');
          auth.showInfo('Logout successful.');
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    // catalog - get all
    this.get('#/catalog', function (context) {
      auth.showLoading();
      // AJAX get all cars sorted by time
      requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'kinvey')
        .then(cars => {
          // add property 'isAuthor': 'true', if is author
          cars.map(car => {
            if (car._acl.creator === sessionStorage.getItem('userId')) {
              car.isAuthor = true;
              return car;
            }
          });

          auth.hideLoading();
          let hasCars = (cars.length > 0);

          this.loadPartials({
            navigation: '../templates/navigation.hbs',
            footer: '../templates/footer.hbs',
          }).then(function () {
            this.partial('../templates/catalog.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              hasCars,
              cars,
            })
          })
        })
        .catch(error => auth.showError(error.responseJSON.description));
    })


    // details/:id 
    this.get('#/details/:carId', function (context) {
      auth.showLoading();
      let carId = this.params.carId.slice(1);

      // AJAX get single car by id
      requester.get('appdata', `cars/${carId}`, 'kinvey')
        .then(function (carInfoObj) {
          auth.hideLoading();
          context.loadPartials({
            navigation: '../templates/navigation.hbs',
            footer: '../templates/footer.hbs',
          }).then(function () {
            this.partial('../templates/details.hbs', {
              carInfoObj,
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              isAuthor: (carInfoObj._acl.creator === sessionStorage.getItem('userId')),
            });
          })
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    // create listing - get
    this.get('#/createListing', function () {
      this.loadPartials({
        navigation: '../templates/navigation.hbs',
        footer: '../templates/footer.hbs',
      }).then(function () {
        this.partial('../templates/createListing.hbs', {
          isLogged: Boolean(sessionStorage.getItem('authtoken')),
          username: sessionStorage.getItem('username'),
        });
      });
    });


    // create listing - post
    this.post('#/createListing', function (context) {
      let data = context.params;

      // fields check
      if (!data.title || !data.description || !data.brand || !data.model || !data.year || !data.imageUrl || !data.fuelType || !data.price) {
        auth.showError('There is an empty field.');
      } else if (data.title.length > 33) {
        auth.showError('The title length must not exceed 33 characters!');
      } else if (data.description.length < 30 || data.description.length > 450) {
        auth.showError('The description length must not exceed 450 characters and should be at least 30!');
      } else if (data.brand.length > 11 || data.fuelType.length > 11 || data.model.length > 11) {
        auth.showError('The brand,fuelType and model length must not exceed 11 characters!');
      } else if (data.model.length < 4) {
        auth.showError('The model length should be at least 4 characters!');
      } else if (data.year.length !== 4) {
        auth.showError('The year must be only 4 chars long!');
      } else if (Number(data.price) > 1000000) {
        auth.showError('The maximum price is 1000000$');
      } else if (!data.imageUrl.startsWith('http')) {
        auth.showError('Link url should always start with “http”.');
      } else {
        data.seller = sessionStorage.getItem('username');
        // rename data.fuelType to data.fuel
        data.fuel = data.fuelType;
        delete data.fuelType;
        auth.showLoading();
        requester.post('appdata', 'cars', 'kinvey', JSON.parse(JSON.stringify(data)))
          .then(function () {
            auth.hideLoading();
            auth.showInfo('listing created.');
            context.redirect('#/catalog');
          })
          .catch(error => auth.showError(error.responseJSON.description));
      }
    });


    // edit car listing - get
    this.get('#/edit/:carId', function (context) {
      auth.showLoading();
      let carId = this.params.carId.slice(1);

      // AJAX get car for editing by id
      requester.get('appdata', `cars/${carId}`, 'kinvey')
        .then(function (carInfoObj) {
          auth.hideLoading();
          context.loadPartials({
            navigation: '../templates/navigation.hbs',
            footer: '../templates/footer.hbs',
          }).then(function () {
            this.partial('../templates/editCarListing.hbs', {
              carInfoObj,
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
            });
          })
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    //edit car listing - post
    this.post('#/edit', function (context) {
      let carInfoObj = context.params;
      const id = carInfoObj.carId;
      delete carInfoObj.carId;

      carInfoObj.fuel = carInfoObj.fuelType;
      delete carInfoObj.fuelType;

      carInfoObj.seller = sessionStorage.getItem('username');

      auth.showLoading();
      // AJAX put request to update car
      requester.update('appdata', `cars/${id}`, 'kinvey', JSON.parse(JSON.stringify(carInfoObj)))
        .then(function () {
          auth.hideLoading();
          auth.showInfo(`Listing ${carInfoObj.title} updated.`);
          context.redirect('#/catalog');
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    // delete car listing
    this.get('#/delete/:id', function (context) {
      let carId = context.params.id.slice(1);

      auth.showLoading();
      // AJAX request to delete car
      requester.remove('appdata', `cars/${carId}`, 'kinvey')
        .then(function () {
          auth.hideLoading();
          auth.showInfo('Listing deleted.');
          context.redirect('#/catalog');
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    // my listings - get
    this.get('#/myListings', function (context) {
      let username = sessionStorage.getItem('username');
      auth.showLoading();
      requester.get('appdata', `cars?query={"seller":"${username}"}&sort={"_kmd.ect":-1}`, 'kinvey')
        .then(function (myCarListings) {
          auth.hideLoading();
          context.loadPartials({
            navigation: '../templates/navigation.hbs',
            footer: '../templates/footer.hbs'
          }).then(function () {
            this.partial('../templates/myListings.hbs', {
              isLogged: Boolean(sessionStorage.getItem('authtoken')),
              username: sessionStorage.getItem('username'),
              myCarListings,
              hasCars: (myCarListings.length > 0)
            })
          })
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });

  });

  app.run('#/');
});