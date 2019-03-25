let container = $('div.container');
let btn = $('button');
let ol = $('<ol>');
container.append(ol);

async function onButtonClick() {
  // let urlGet = 'https://baas.kinvey.com/appdata/kid_rkdp7Q6w4/posts';
  // let urlLogin = 'https://baas.kinvey.com/user/kid_rkdp7Q6w4/login';

  // $.ajax({
  //   url: urlLogin,
  //   method: 'POST',
  //   headers: {
  //     "Authorization": "Basic " + btoa('kid_rkdp7Q6w4:a719bc1cdfa34e94b0247ff894539b67'),
  //   },
  //   data: {
  //     'username': 'guest',
  //     'password': 'guest'
  //   }
  // }).then(data => console.log(data))
  //   .catch(error => console.log(error));

  $.ajax({
    url: 'https://swapi.co/api/people/2',
    method: 'GET'
  })
    //   .then(data => {
    //   return data;
    // })
    .then(data => {
      $.ajax({
        url: 'https://swapi.co/api/people/3',
        method: 'GET'
      }).then(data2 => {
        console.log(data2);
        console.log(data);
      })
    })
}

btn.click(onButtonClick);

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}
