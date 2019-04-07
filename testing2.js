$(() => {
  const app = Sammy('#container', function () {
    // use Handlebars
    this.use('Handlebars', 'hbs');

    // routes
    this.route('get', '/', function (context) {
      this.swap('<h2>Home Page</h2>');
    });

    this.route('GET', '#/about', function () {
      this.swap('<h2>About Page without params</h2>');
    });

    this.route('GET', '#/about/:productId', function (context) {
      this.swap(`<h2>About Page with params: ${context.params}</h2>`);
      console.log(context.params);
    });

    this.route('GET', '#/login', function () {
      this.swap(`<h2>Login Page</h2>
      <form action="#/login" method="post">
      User: <input name="user" type="text">
      Pass: <input name="pass" type="password">
      <input type="submit" value="Login">
    </form>`);
    });

    this.route('POST', '#/login', function (context) {
      console.log(context.params);
    });

    this.route('GET', '.', function () {
      this.swap('********');
    });
  });

  app.run();
});
