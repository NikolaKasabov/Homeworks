function initializeTable() {
  function moveUp() {
    let currentTr = $(this).parent().parent();
    isFirstTr(currentTr);

    // currentTr.insertBefore(currentTr.prev());
  }

  function moveDown() {
    let currentTr = $(this).parent().parent();
    currentTr.insertAfter(currentTr.next());
  }

  function deleteRow() {
    let currentTr = $(this).parent().parent();
    currentTr.remove();
  }

  function isFirstTr(tr) {
    if (tr[0] === $('table tr:nth-child(3)')[0]) {
      console.log('yes');
    } else {
      console.log('no');
    }
  }

  function addCountry() {
    const country = $('#newCountryText').val();
    const capital = $('#newCapitalText').val();
    let table = $('#countriesTable');

    if (country.length === 0 || capital.length === 0) {
      return;
    }

    let newTr = $('<tr>');
    let countryTd = $(`<td>${country}</td>`);
    let capitalTd = $(`<td>${capital}</td>`);
    let actionsTd = $('<td>');
    actionsTd.append($('<a href="#">[Up]</a>').click(moveUp),
      $('<a href="#">[Down]</a>').click(moveDown),
      $('<a href="#">[Delete]</a>').click(deleteRow));

    newTr.append(countryTd, capitalTd, actionsTd);
    table.append(newTr);
  }

  $('#createLink').click(addCountry);
}