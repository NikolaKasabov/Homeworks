function attachEvents() {
  let ulEl = $('ul#phonebook');
  let nameEl = $('input#person');
  let phoneEl = $('input#phone');
  // let baseUrl = 'https://phonebook-ee5cb.firebaseio.com/';
  let baseUrl = 'https://phonebook-nakov.firebaseio.com/phonebook';

  function onDeleteClick(id) {
    $.ajax({
      method: 'DELETE',
      url: baseUrl + '/' + id + '.json',
      success: onLoadClick
    });
  }

  function listContacts(contacts) {
    for (const key in contacts) {
      let person = contacts[key].person;
      let phone = contacts[key].phone;
      let id = key;

      let li = $(`<li>${person}: ${phone}</li>`);
      let deleteBtn = $('<button>Delete</button>');
      deleteBtn.click(() => onDeleteClick(id));
      li.append(deleteBtn);
      ulEl.append(li);
    }
  }

  function onLoadClick() {
    ulEl.empty();

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
      success: () => {
        nameEl.val('');
        phoneEl.val('');
        onLoadClick();
      }
    });
  }

  $('button#btnLoad').on('click', onLoadClick);
  $('button#btnCreate').on('click', onCreateClick);
}
