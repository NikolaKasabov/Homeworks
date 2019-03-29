function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/appdata/kid_H1EoJtjdV/';
  const authString = 'Basic ' + btoa('guest:guest');
  const $countriesTable = $('#countriesTable');
  const $townsTable = $('#townsTable');
  const $messageDiv = $('div.message');

  function onListAllCountriesClick() {
    showMessage();
    $.ajax({
      method: 'GET',
      url: baseUrl + 'countries',
      headers: {
        Authorization: authString
      },
      success: listCountries,
      error: err => console.log(err)
    });
  }

  $('button.getCountries').on('click', onListAllCountriesClick);

  function listCountries(data) {
    $countriesTable.empty();

    data.forEach(country => {
      let currentId = country._id;
      let $tr = $('<tr>');
      let $td = $('<td>');
      let $input = $(`<input type="text" value="${country.countryName}">`);
      let $editBtn = $('<button>Change name</button>').click(ev => onEditCountryClick(ev, currentId));
      let $deleteBtn = $('<button>Delete</button>').click(() => onDeleteCountryClick(currentId));
      $td.append($input, $editBtn, $deleteBtn);
      $tr.append($td);
      $countriesTable.append($tr);
    })
  }

  function onEditCountryClick(ev, id) {
    showMessage()
    let newCountryName = $(ev.target).prev().val();
    $.ajax({
      method: 'PUT',
      url: baseUrl + 'countries/' + id,
      headers: {
        Authorization: authString
      },
      data: {
        countryName: newCountryName
      },
      success: onListAllCountriesClick
    });
  }

  function onDeleteCountryClick(id) {
    showMessage();
    $.ajax({
      method: 'DELETE',
      url: baseUrl + 'countries/' + id,
      headers: {
        Authorization: authString
      },
      success: onListAllCountriesClick
    });
  }

  function onAddCountryClick() {
    const $countryName = $('input.addCountry');
    let countryName = $countryName.val();
    if (countryName.length === 0) {
      return
    }

    $countryName.val('');
    showMessage();
    $.ajax({
      method: 'POST',
      url: baseUrl + 'countries',
      headers: {
        Authorization: authString
      },
      data: {
        countryName
      },
      success: onListAllCountriesClick,
      error: err => console.log(err)
    });
  }

  $('button.addCountry').on('click', onAddCountryClick);

  function onGetTownsClick() {
    const $currentCountryName = $('input.countryName')
    let currentCountryName = $currentCountryName.val();
    if (currentCountryName.length === 0) {
      return;
    }

    $currentCountryName.val('');
    showMessage();
    $.ajax({
      method: 'GET',
      url: baseUrl + `towns/?query={"countryName":"${currentCountryName}"}`,
      headers: {
        Authorization: authString
      },
      success: listTowns,
      error: err => console.log(err)
    })
  }

  $('button.getTowns').on('click', onGetTownsClick);

  function listTowns(townsArr) {
    $townsTable.empty();
    if (townsArr.length === 0) {
      return;
    }

    townsArr.forEach(town => {
      let currentId = town._id;
      let $tr = $('<tr>');
      let $td = $('<td>');
      let $input = $(`<input type="text" value="${town.townName}">`);
      //////
    });
  }

  function showMessage() {
    $messageDiv.show();
    setTimeout(() => {
      $messageDiv.fadeOut();
    }, 1500);
  }
}