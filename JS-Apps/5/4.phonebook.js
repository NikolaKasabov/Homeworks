function attachEvents() {
  let nameEl = $('input#person');
  let phoneEl = $('input#phone');
  let baseUrl = 'https://phonebook-ee5cb.firebaseio.com/';

  function listContacts(contacts) {
    for (const key in contacts) {
      let person = contacts[key].person;
      let phone = contacts[key].phone;
      let id = key;


    }
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
}
