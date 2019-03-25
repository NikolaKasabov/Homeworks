function getInfo() {
  let inputEl = $('input#stopId');
  let stopNameEl = $('div#stopName');
  let busesUlEl = $('ul#buses');

  function onLoadSuccess(data) {
    stopNameEl.text(data.name);
    busesUlEl.empty();
    for (const key in data.buses) {
      let busId = key;
      let time = data.buses[key];
      let li = $(`<li>Bus ${busId} arrives in ${time} minutes</li>`);
      busesUlEl.append(li);
    }
  }

  function onLoadError() {
    busesUlEl.empty();
    stopNameEl.text('Error');
  }

  $.ajax({
    method: 'GET',
    url: `https://judgetests.firebaseio.com/businfo/${inputEl.val()}.json`,
    success: onLoadSuccess,
    error: onLoadError
  });
}