function attachEventsListeners() {
  let totalSeconds = 0;

  let coefficients = {
    daysBtn: 86400,
    hoursBtn: 3600,
    minutesBtn: 60,
    secondsBtn: 1,
  };

  // add click event to all buttons
  $('input[type="button"]').click(e => {
    let currentValue = $(e.target).prev().val();
    // convert current value to seconds
    totalSeconds = currentValue * coefficients[e.target.id];

    // itterate through input fields and print the new values
    $('input[type="text"]').val(function (i, e) {
      let currentId = this.id;
      let newValue = totalSeconds / coefficients[currentId + 'Btn'];
      return newValue;
    });
  });
}