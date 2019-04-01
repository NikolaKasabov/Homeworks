function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/appdata/kid_BJXTsSi-e/knock';
  const authString = 'Basic ' + btoa('guest:guest');
  const $startBtn = $('button.start');
  const $result = $('div.result');

  let message = 'Knock Knock.';
  let answer = '';

  
  function checkForResponsePromise() {
    return $.ajax({
      method: 'GET',
      url: baseUrl + `?query=${message}`,
      headers: {
        Authorization: authString
      },
      success: onSuccess,
      error: err => console.log(err)
    });
  }

  // displays data
  function onSuccess(data) {
    message = data.message;
    answer = data.answer;

    console.log(message);

    if (message !== 'undefined') {
      $result.append(`<p>${answer}</p>`);      
    }

    if (answer !== 'undefined') {
      $result.append(`<p>${message}</p>`);      
    }
  }

  async function start() {
    $result.append(`<p>${message}</p>`);

    while (message !== undefined) {
      await checkForResponsePromise();
    }
  }

  $startBtn.on('click', start);
}