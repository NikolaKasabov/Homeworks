function solve() {
  let departBtn = $('input#depart');
  let arriveBtn = $('input#arrive');
  let infoEl = $('div#info span');

  let currentStopId = 'depot';
  let currentStopName;
  let nextStopId;

  function onError() {
    infoEl.text('Error');
    departBtn.attr('disabled', true);
    arriveBtn.attr('disabled', true);
  }

  function depart() {
    $.ajax({
      method: 'GET',
      url: `https://judgetests.firebaseio.com/schedule/${currentStopId}.json`,
      success: data => {
        if (data === null) {
          onError();
          return;
        }
        currentStopName = data.name;
        nextStopId = data.next;
        infoEl.text(`Next stop ${currentStopName}`);
        departBtn.attr('disabled', true);
        arriveBtn.attr('disabled', false);
      },
      error: onError
    });
  }

  function arrive() {
    departBtn.attr('disabled', false);
    arriveBtn.attr('disabled', true);
    infoEl.text(`Arriving at ${currentStopName}`);

    currentStopId = nextStopId;
  }

  return {
    depart,
    arrive
  };
}

let result = solve();
