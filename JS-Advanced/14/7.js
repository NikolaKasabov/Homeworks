function attachEventsListeners() {
  let meters = 0;
  let coefficients = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yrd: 0.9144,
    ft: 0.3048,
    in: 0.0254
  };

  function convert() {
    let currentValue = +$('input#inputDistance').val();
    let currentUnits = $('select#inputUnits').val();
    
    meters = currentValue * coefficients[currentUnits];
    
    let newUnits = $('select#outputUnits').val();
    let newValue = meters / coefficients[newUnits];

    $('input#outputDistance').val(newValue);
  }

  $('input#convert').click(convert);
}