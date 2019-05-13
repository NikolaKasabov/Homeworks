function attachEvents() {
  const selectedTowns = [];

  function townsClickHandler() {
    const currentTown = this.textContent;

    if (selectedTowns.includes(currentTown)) {
      const currentTownIndex = selectedTowns.indexOf(currentTown);
      selectedTowns.splice(currentTownIndex, 1);
      $(this).removeAttr('data-selected').css('background-color', '');
    } else {
      selectedTowns.push(this.textContent);
      $(this).attr('data-selected', true).css('background-color', '#DDD');
    }


  }

  $('li').click(townsClickHandler);

  function showTownsEventHandler() {
    $('#selectedTowns').text(selectedTowns.join(', '))
  }

  $('button').click(showTownsEventHandler);
}