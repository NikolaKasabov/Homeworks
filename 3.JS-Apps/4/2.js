function loadTitle() {
  let divEl = $('div#text');

  // $.ajax({
  //   method: 'GET',
  //   url: 'text.html',
  //   success: (data) => divEl.html(data),
  //   error: (err) => console.log(err)
  // });

  divEl.load('text.html');
}
