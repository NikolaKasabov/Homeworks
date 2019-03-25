let nameEl = $('input#person');
let phoneEl = $('input#phone');
let baseUrl = 'https://phonebook-ee5cb.firebaseio.com/';

function listContacts(data) {
  console.log(typeof data);
}

function onLoadClick() {
  $.ajax({
    method: 'GET',
    url: baseUrl + '.json',
    success: listContacts,
    error: err => console.log(err)
  });
}

function onCreateClick() {
  let name = nameEl.val();
  let phone = phoneEl.val();
  
  $.ajax({
    method: 'POST',
    url: baseUrl + '.json',
    headers: {
      "Content-Type": "application/json"
    },
    data: `{"person":"${name}","phone":"${phone}"}`,
    success: data => console.log(data.name),
    error: err => console.log(err)
  });
}

function onDeleteClick() {
  
}

$('button#btnLoad').on('click', onLoadClick);
$('button#btnCreate').on('click', onCreateClick);