function attachEvents() {
  let textAreaEl = $('textarea#messages');
  let nameEl = $('input#author');
  let messageEl = $('input#content');

  function onSendClick() {
    
  }

  function onRefreshClick() {
    
  }

  $('input#submit').on('click', onSendClick);
  $('input#refresh').on('click', onRefreshClick);
}