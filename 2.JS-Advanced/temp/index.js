function attachEventsListeners() {
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
    let inputValue = document.querySelector('input#inputDistance').value;
    let inputUnits = document.querySelector('select#inputUnits').value;
    
    let outputUnits = document.querySelector('select#outputUnits').value;
    let outputValue = (+inputValue * coefficients[inputUnits]) / coefficients[outputUnits];

    document.querySelector('input#outputDistance').value = outputValue;
  }

  document.querySelector('input#convert').addEventListener('click', convert);
}