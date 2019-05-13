function toggle() {
  let buttonEl = $('span.button');
  let extraDivEl = $('div#extra');

  if (buttonEl.text() === 'More') {
    extraDivEl.css('display', 'block');
    buttonEl.text('Less');
  } else {
    extraDivEl.css('display', 'none');
    buttonEl.text('More');
  }
}