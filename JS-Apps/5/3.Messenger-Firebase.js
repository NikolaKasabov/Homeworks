function attachEvents() {
  let textAreaEl = $('textarea#messages');
  let nameEl = $('input#author');
  let messageEl = $('input#content');
  let baseUrl = 'https://messenger-26032019.firebaseio.com/.json';

  function onLoadDataSuccess(data) {
    let result = '';
    let sorted = Object.values(data)
      // .sort((a, b) => a.timestamp - b.timestamp);

    sorted.forEach(post => {
      let name = post.author;
      let message = post.content;
      result += `${name}: ${message}\n`;
    });

    textAreaEl.text(result);
  }

  function onSendClick() {
    let name = nameEl.val();
    let message = messageEl.val();

    let result = {
      author: name,
      content: message,
      timestamp: Date.now()
    };

    $.ajax({
      method: 'POST',
      url: baseUrl,
      data: JSON.stringify(result),
    });
  }

  function onRefreshClick() {
    $.ajax({
      method: 'GET',
      url: baseUrl,
      success: onLoadDataSuccess
    });
  }

  $('input#submit').on('click', onSendClick);
  $('input#refresh').on('click', onRefreshClick);
}
