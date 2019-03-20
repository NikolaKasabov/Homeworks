function solve() {
  let url = 'https://api.github.com/users/NikolaKasabov/repos';

  $.get(url, function (data) {
    console.log(data);
  });


}

setTimeout(() => {
  console.log(1);
}, 2000);

setTimeout(() => {
  console.log(2);
}, 0);