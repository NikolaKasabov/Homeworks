$(() => {
  const app = Sammy('#main', function () {
    // use Handlebars
    this.use('Handlebars', 'hbs');

    let loggedIn = Boolean(sessionStorage.authtoken);
    let hasTeam = Boolean(sessionStorage.teamId);

    // ROUTES:
    // home
    this.route('GET', '#/home', function () {

      this.loadPartials({
        // load partial templates
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        // show handlebars 'home.hbs' template
        this.partial('../templates/home/home.hbs', {
          loggedIn,
          username: sessionStorage.username,
          hasTeam,
          teamId: sessionStorage.teamId
        });
      });
    });


    // about
    this.route('GET', '#/about', function () {

      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs'
      }).then(function () {
        this.partial('../templates/about/about.hbs', {
          loggedIn,
          username: sessionStorage.username
        });
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
      let { username, password } = context.params;

      // send ajax post request to Kinvey
      auth.login(username, password)
        .then((userData) => {
          this.redirect('#/home');
          auth.showInfo('Successfully logged.');
          auth.saveSession(userData);
          loggedIn = true;
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
          loggedIn = false;
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
                loggedIn,
                username: sessionStorage.username,
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
          // update user info in Kinvey - add teamId, with PUT request
          requester.update('user', sessionStorage.userId, 'kinvey', { teamId: teamInfo._id });
          sessionStorage.teamId = teamInfo._id;
        })
        .catch(error => auth.showError(error.responseJSON.description));
    });


    // see team
    this.route('GET', '#/catalog/:teamId', async function (context) {
      let teamInfo;
      try {
        teamInfo = await requester.get('appdata', `teams/${context.params.teamId}`, 'kinvey');
      } catch (error) {
        console.log(error);
      }

      this.loadPartials({
        header: '../templates/common/header.hbs',
        footer: '../templates/common/footer.hbs',
        teamMember: '../templates/catalog/teamMember.hbs',
        teamControls: '../templates/catalog/teamControls.hbs'
      })
        .then(function () {
          this.partial('../templates/catalog/details.hbs', {
            name: teamInfo.name,
            members: teamInfo.members,
            loggedIn,
            username: sessionStorage.username,
            comment: teamInfo.comment,
            isAuthor: sessionStorage.userId === teamInfo._acl.creator,
            isOnTeam: teamInfo.members && teamInfo.members.includes(sessionStorage.username)
          })
        })
    });
  });

  // not finished...

  app.run('#/home');
});