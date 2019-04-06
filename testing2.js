$(() => {
  const app = Sammy('#container', function () {
    this.route('get', '#/', function (context) {
      this.swap('<h2>Home Page</h2>');
    });

    this.get('#/about', function (context) {
      this.swap('<h2>About Page</h2>');
    });

    this.get('#/about/:productId', function (context) {
      console.log(context.params);
    });

    this.get('#/login', function (context) {
      this.swap(`<h2>Login Page</h2>
      <form action="#/login" method="post">
      User: <input name="user" type="text">
      Pass: <input name="pass" type="password">
      <input type="submit" value="Login">
    </form>`);
    });

    this.post('#/login', function (context) {
      console.log(context.params);
    });

    this.get('.', function () {
      this.swap('********');
    });
  });

  app.run();
});
