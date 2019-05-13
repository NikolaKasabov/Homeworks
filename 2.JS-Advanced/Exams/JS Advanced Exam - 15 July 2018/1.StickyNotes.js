function addSticker() {
  let titleEl = $('input.title');
  let textEl = $('input.content');
  let ulEl = $('ul#sticker-list');

  if (!titleEl.val() || !textEl.val()) {
    return;
  }

  let li = $('<li class="note-content">');
  let a = $('<a class="button">x</a>');
  a.click(() => li.remove());
  let h2 = $(`<h2>${titleEl.val()}</h2><hr>`);
  let p = $(`<p>${textEl.val()}</p>`);

  li.append(a, h2, p);
  ulEl.append(li);

  titleEl.val('');
  textEl.val('');
}