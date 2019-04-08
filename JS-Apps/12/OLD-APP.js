$(() => {
  const app = Sammy('#main', function () {
    // use Handlebars
    this.use('Handlebars', 'hbs');

  

    // ROUTES:
    // home
    this.route('GET', '#/home', function () {
      let that = this;

      this.loadPartials({
        // load partial templates
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        // these are used in header and home
        // that.loggedIn = Boolean(sessionStorage.authtoken);
        that.loggedIn = Boolean(sessionStorage.authtoken);
        that.username = sessionStorage.username;
        that.hasTeam = sessionStorage.teamId !== 'undefined';

        // show handlebars 'home.hbs' template
        this.partial('../templates/home/home.hbs');
      });
    });


    // about
    this.route('GET', '#/about', function () {
      let that = this;

      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        that.loggedIn = Boolean(sessionStorage.authtoken);
        that.username = sessionStorage.username;
        this.partial('../templates/about/about.hbs');
      });
    });


    // login - get
    this.route('GET', '#/login', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        loginForm: '../templates/login/loginForm.hbs'
      }).then(function () {
        this.partial('../templates/login/loginPage.hbs');
      });
    });


    // login - post
    this.route('POST', '#/login', function (context) {
      const { username, password } = context.params;

      // send ajax post request to Kinvey
      auth.login(username, password)
        .then((userData) => {
          this.redirect('#/home');
          auth.showInfo('Successfully logged.');
          auth.saveSession(userData);
        })
        .catch((error) => {
          auth.showError(error.responseJSON.description);
        });
    });


    // register - get
    this.route('GET', '#/register', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        registerForm: '../templates/register/registerForm.hbs'
      }).then(function () {
        this.partial('../templates/register/registerPage.hbs');
      });
    });


    // register - post
    this.route('POST', '#/register', function (context) {
      const { username, password, repeatPassword } = context.params;

      // send ajax post request to Kinvey
      auth.register(username, password, repeatPassword)
        .then((userData) => {
          this.redirect('#/home');
          auth.saveSession(userData);
          auth.showInfo('Successfully registered');
        })
        .catch((error) => {
          auth.showError(error.responseJSON.description);
        });
    });


    // logout
    this.route('GET', '#/logout', function () {

      // send post request to Kinvey
      auth.logout()
        .then(() => {
          sessionStorage.clear();
          this.redirect('#/home');
          auth.showInfo('Successfull logout.');
        })
        .catch((error) => {
          auth.showError(error.responseJSON.description);
        });
    });


    // catalog
    this.route('GET', '#/catalog', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        team: '../templates/catalog/team.hbs'
      }).then(function () {
        // get all teams from Kinvey with get request, then display them
        teamsService.loadTeams()
          .then(teamsArr => {
            this.partial('../templates/catalog/teamCatalog.hbs',
              {
                hasNoTeam: sessionStorage.teamId === 'undefined',
                teams: teamsArr
              });
          }).catch(error => auth.showError(error));
      })
    });


    // create team - get
    this.route('GET', '#/create', function () {
      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        createForm: '../templates/create/createForm.hbs'
      }).then(function () {
        this.partial('../templates/create/createPage.hbs')
      })
    });


    // create team - post
    this.route('POST', '#/create', function (context) {
      const { name, comment } = context.params;
      teamsService.createTeam(name, comment)
        .then(function (teamInfo) {
          console.log(teamInfo);
          // update user info in Kinvey - add teamId, with PUT request
          requester.update('user', sessionStorage.userId, 'kinvey', { teamId: teamInfo._id });
          sessionStorage.teamId = teamInfo._id;
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });

  });

  app.run('#/home');
});