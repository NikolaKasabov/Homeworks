function addItem() {
  let textEl = $('#newItemText');
  let valueEl = $('#newItemValue');

  let selectEl = $('select#menu');

  let newOption = $(`<option value="${valueEl.val()}">${textEl.val()}</option>`);
  selectEl.append(newOption);
  textEl.val('');
  valueEl.val('');
}