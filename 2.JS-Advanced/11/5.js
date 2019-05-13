function initializeTable() {
  function fixLinks() {
    $('a').show();
    $('table tr:nth-child(3) td:nth-child(3) a:first-child').hide();
    $('table tr:last-child td:nth-child(3) a:nth-child(2)').hide();
  }

  function moveUp() {
    let currentTr = $(this).parent().parent();
    currentTr.insertBefore(currentTr.prev());
    fixLinks();
  }

  function moveDown() {
    let currentTr = $(this).parent().parent();
    currentTr.insertAfter(currentTr.next());
    fixLinks();
  }

  function deleteRow() {
    let currentTr = $(this).parent().parent();
    currentTr.remove();
    fixLinks();
  }

  function addRow() {
    const country = $('#newCountryText').val();
    const capital = $('#newCapitalText').val();

    createRow(country, capital);
  }

  function createRow(country, capital) {
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
    fixLinks();
  }

  createRow('Bulgaria', 'Sofia');
  createRow('Germany', 'Berlin');
  createRow('Russia', 'Moscow');

  $('#createLink').click(addRow);
}