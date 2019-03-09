function attachEventsListeners() {
  let button = document.getElementById('convert');
  let unitsObj = {
    km: 1000, m: 1, cm: 0.01, mm: 0.001,
    mi: 1609.34, yrd: 0.9144,
    ft: 0.3048, in: 0.0254
  }

  button.addEventListener('click', () => {
    let firstUnit = document.getElementById('inputUnits').value;
    let secondUnit = document.getElementById('outputUnits').value;
    let inputNum = document.getElementById('inputDistance').value;
    let outputNum = document.getElementById('outputDistance');
    outputNum.value = (+inputNum * unitsObj[firstUnit]) / unitsObj[secondUnit]
  })
}