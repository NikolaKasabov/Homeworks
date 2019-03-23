let container = $('div.container');
let btn = $('button');
let ol = $('<ol>');
container.append(ol);

async function onButtonClick() {
  let url = 'https://baas.kinvey.com/appdata/kid_rkdp7Q6w4/posts';

  $.ajax({
    url: url,
    method: 'GET',
    headers: {
      // "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q="
      "Authorization": "Basic " + btoa('guest:guest')
    }
  }).then(data => console.log(data));
}

btn.click(onButtonClick);
