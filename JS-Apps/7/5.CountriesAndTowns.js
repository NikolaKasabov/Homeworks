function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/appdata/kid_H1EoJtjdV/';
  const authString = 'Basic ' + btoa('guest:guest');
  const $countriesTable = $('#countriesTable');
  const $townsTable = $('#townsTable');
  const $messageDiv = $('div.message');

  // get all countries from kinvey.
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

  // add click event to 'List all countries' button.
  $('button.getCountries').on('click', onListAllCountriesClick);

  // display all countries.
  function listCountries(data) {
    $countriesTable.empty();

    data.forEach(country => {
      let currentId = country._id;
      let $tr = $('<tr>');
      let $td = $('<td>');
      let $input = $(`<input type="text" value="${country.countryName}">`);
      let $editBtn = $('<button>Change name</button>').click(ev => onChangeNameClick(ev, currentId));
      let $deleteBtn = $('<button>Delete</button>').click(() => onDeleteCountryClick(currentId));
      $td.append($input, $editBtn, $deleteBtn);
      $tr.append($td);
      $countriesTable.append($tr);
    })
  }

  // change current country name.
  function onChangeNameClick(ev, id) {
    showMessage();
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

  // delete current country
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

  // add new country to kinvey, in 'countries' collection.
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

  // add click event to 'Add country' button.
  $('button.addCountry').on('click', onAddCountryClick);

  // get all towns for selected country, from kinvey.
  function onGetTownsClick() {
    const $currentCountryName = $('input.countryName')
    let currentCountryName = $currentCountryName.val();
    if (currentCountryName.length === 0) {
      return;
    }

    // $currentCountryName.val('');
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

  // add click event to 'Get towns' button.
  $('button.getTowns').on('click', onGetTownsClick);

  // display all towns.
  function listTowns(townsArr) {
    $townsTable.empty();
    if (townsArr.length === 0) {
      return;
    }

    $townsTable.empty();
    townsArr.forEach(town => {
      let currentId = town._id;
      let $tr = $('<tr>');
      let $td = $('<td>');
      let $inputTown = $(`<input type="text" value="${town.townName}">`);
      let $inputCountry = $(`<input type="text" value="${town.countryName}">`);
      let $editBtn = $('<button>Edit</button>').click(ev => onEditTownClick(ev,currentId));
      let $deleteBtn = $('<button>Delete</button>').click(() => onDeleteTownClick(currentId));
      $td.append($inputTown,$inputCountry, $editBtn, $deleteBtn);
      $tr.append($td);
      $townsTable.append($tr);
    });
  }

  // send edited town info to kinvey.
  function onEditTownClick(ev,id) {
    let newTownName = $(ev.target).prev().prev().val();
    let newCountryName = $(ev.target).prev().val();

    showMessage();
    $.ajax({
      method: 'PUT',
      url: baseUrl + 'towns/' + id,
      headers: {
        Authorization: authString
      },
      data: {
        townName: newTownName,
        countryName: newCountryName
      },
      success: onGetTownsClick,
      error: err => console.log(err)
    });
  }

  // delete selected town from kinvey.
  function onDeleteTownClick(id) {
    showMessage();
    $.ajax({
      method: 'DELETE',
      url: baseUrl + 'towns/' + id,
      headers: {
        Authorization: authString
      },
      success: onGetTownsClick,
      error: err => console.log(err)
    });
  }

  // shows 'Loading...' message for 1.5 seconds
  function showMessage() {
    $messageDiv.show();
    setTimeout(() => {
      $messageDiv.fadeOut();
    }, 1500);
  }
}