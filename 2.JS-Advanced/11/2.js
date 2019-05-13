function search() {
  const searchText = $('#searchText').val();
  if (searchText.length === 0) {
    return;
  }

  $(`li`).css('font-weight', '');

  let towns = $(`li:contains(${searchText})`).css('font-weight', 'bold');
  let count = towns.length;
  $('#result').text(`${count} matches found.`);
}