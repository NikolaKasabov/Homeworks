const app = Sammy('#container', function () {
  this.get('', function () {
    this.swap('<h2>Home Page</h2>');
  });

  this.get('#/about', function () {
    this.swap('<h2>About Page</h2>');
  });

  this.get('#/login', function () {
    this.swap('<h2>Login Page</h2>');
  });
});


$(() => app.run());
