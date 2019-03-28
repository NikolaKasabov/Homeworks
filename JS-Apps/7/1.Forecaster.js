function attachEvents() {
  let $location = $('input#location');
  let $getWeatherBtn = $('input#submit');
  let $forecastSection = $('div#forecast');
  let $oneDaySection = $('div#current');
  let $threeDaysSection = $('div#upcoming');
  let conditionCodes = {
    'Sunny': '&#x2600;',
    'Partly sunny': '&#x26C5;',
    'Overcast': '&#x2601;',
    'Rain': '&#x2614;',
    'Degrees': '&#176;'
  };

  function onGetWeatherClick() {
    $.ajax({
      method: 'GET',
      url: 'https://judgetests.firebaseio.com/locations.json',
      success: onGetLocationsSuccess,
      error: onError
    });
  }

  $getWeatherBtn.on('click', onGetWeatherClick);

  function onGetLocationsSuccess(locationsArr) {
    let locationName = $location.val();
    let locationCode = null;

    locationsArr.forEach(obj => {
      if (obj.name === locationName) {
        locationCode = obj.code;
      }
    });

    $forecastSection.show();
    if (locationCode === null) {
      onError();
    } else {
      Promise.all([
        $.ajax({
          method: 'GET',
          url: `https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`
        }),
        $.ajax({
          method: 'GET',
          url: `https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`
        })
      ]).then(([oneDayValue, threeDaysValue]) => {
        fillOneDaySection(oneDayValue);
        fillThreeDaysSection(threeDaysValue);
      }).catch(() => onError());
    }
  }

  function fillOneDaySection(data) {
    let $symbolSpan = $(`<span class="condition symbol">${conditionCodes[data.forecast.condition]}</span>`);
    let $forecastSpan = $('<span class="condition"></span>');
    $forecastSpan.append(
      $(`<span class="forecast-data">${data.name}</span>`),
      $(`<span class="forecast-data">${data.forecast.low}&#176;/${data.forecast.high}&#176;</span>`),
      $(`<span class="forecast-data">${data.forecast.condition}</span>`)
    )

    $oneDaySection.append($symbolSpan, $forecastSpan);
  }

  function fillThreeDaysSection(data){
    data.forecast.forEach(day => {
      let $wrapperSpan = $('<span class="upcoming"></span>');
      $wrapperSpan.append(
        $(`<span class="symbol">${conditionCodes[day.condition]}</span>`),
        $(`<span class="forecast-data">${day.low}&#176;/${day.high}&#176;</span>`),
        $(`<span class="forecast-data">${day.condition}</span>`)
      );

      $threeDaysSection.append($wrapperSpan);
    });
  }

  function onError() {
    $forecastSection.text('Error');
  }
}