function search() {
  const searchText = $('#searchText').val();
  if (searchText.length === 0) {
    return;
  }

  $('li').map((i, e) => {
    if (e.textContent.includes(searchText)) {
      return $(e).css('font-weight', 'bold');
    } else {
      return $(e).css('font-weight', '');
    }
  });
}