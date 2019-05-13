function addDestination() {
  let cityEl = $('#input input').eq(0);
  let countryEl = $('#input input').eq(1);
  let seasonEl = $('#seasons');
  let addButton = $('button');
  let tableBodyEl = $('#destinations');

  function resetFields() {
    cityEl.val('');
    countryEl.val('');
  }

  function createRow(city, country, season) {
    let seasonString = season.slice(0, 1).toUpperCase() + season.slice(1);
    let tr = $(`<tr><td>${city}, ${country}</td><td>${seasonString}</td></tr>`);
    tableBodyEl.append(tr);
  }

  function addCount(season) {
    let currentField = $(`#${season}`);
    let currentNumber = Number(currentField.val());
    currentField.val(currentNumber + 1);
  }

  function onAddClick() {
    let city = cityEl.val();
    let country = countryEl.val();
    let season = seasonEl.val();

    if (!city || !country) {
      return;
    }

    createRow(city, country, season);
    addCount(season);
    resetFields();
  }

  addButton.on('click', onAddClick());
}