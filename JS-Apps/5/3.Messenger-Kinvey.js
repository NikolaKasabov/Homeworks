function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/';
  const appKey = 'kid_rkiE6YvdE';
  const username = 'guest';
  const password = 'guest';

  let textAreaEl = $('textarea#messages');
  let nameEl = $('input#author');
  let messageEl = $('input#content');

  function onSendClick() {
    let name = nameEl.val();
    let message = messageEl.val();
    let dataToSend = {
      author: name,
      content: message,
      timestamp: Date.now()
    };

    $.ajax({
      method: 'POST',
      url: baseUrl + 'appdata/' + appKey + '/messages',
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      data: dataToSend
    });
  }

  function onDataLoadSuccess(data) {
    let result = '';

    data
      .sort((a, b) => a.timestamp - b.timestamp)
      .forEach(post => {
        result += `${post.author}: ${post.content}\n`;
      });
    
    textAreaEl.text(result);
  }

  function onRefreshClick() {
    $.ajax({
      method: 'GET',
      url: baseUrl + 'appdata/' + appKey + '/messages',
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      success: onDataLoadSuccess
    });
  }

  $('input#submit').on('click', onSendClick);
  $('input#refresh').on('click', onRefreshClick);
}