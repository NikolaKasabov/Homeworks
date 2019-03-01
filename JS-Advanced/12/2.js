function timer() {
  let totalSeconds = 0;
  let counting;
  let isCounting = false;

  function addSeconds() {
    totalSeconds += 1;

    let seconds = ('0' + (totalSeconds % 60)).slice(-2);
    let minutes = ('0' + Math.floor(totalSeconds / 60) % 60).slice(-2);
    let hours = ('0' + Math.floor(totalSeconds / 3600) % 24).slice(-2);
    $('#seconds').text(seconds);
    $('#minutes').text(minutes);
    $('#hours').text(hours);
  }

  function startCounting() {
    if (!isCounting) {
      counting = setInterval(addSeconds, 1000);
      isCounting = true;
    }
  }

  function stopCounting() {
    clearInterval(counting);
    isCounting = false;
  }

  $('#start-timer').click(startCounting);
  $('#stop-timer').click(stopCounting);
}
