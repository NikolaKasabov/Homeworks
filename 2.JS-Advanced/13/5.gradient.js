function attachGradientEvents() {
  let gradientElem = $('div#gradient');
  let x, percentage;
  let resultElem = $('div#result');

  function onGradientClick(e) {
    x = e.offsetX;
    percentage = Math.floor(x / 300 * 100);
    resultElem.text(percentage + '%');
  }

  gradientElem.mousemove(onGradientClick);
}