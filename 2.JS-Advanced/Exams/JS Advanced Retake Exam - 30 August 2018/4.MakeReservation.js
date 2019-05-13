function makeReservation(selector) {
  let inputObj = {
    'Name': '',
    'E-Mail': '',
    'Phone': 0,
    'Address': '',
    'Postal Code': 0
  };

  let nameEl = $('#fullName');
  let emailEl = $('#email');
  let phoneNumberEl = $('#phoneNumber');
  let addressEl = $('#address');
  let postalCodeEl = $('#postalCode');
  let submitBtn = $('#submit');
  let ulEl = $('#infoPreview');
  let editBtn = $('#edit');
  let continueBtn = $('#continue');
  let containerEl = $('#container');
  let selectEl;

  function enableSubmitBtn() {
    submitBtn.attr('disabled', false);
  }

  function disableSubmitBtn() {
    submitBtn.attr('disabled', true);
  }

  function enableEditAndContinueBtn() {
    editBtn.attr('disabled', false);
    continueBtn.attr('disabled', false);
  }

  function disableEditAndContinueBtn() {
    editBtn.attr('disabled', true);
    continueBtn.attr('disabled', true);
  }

  function getInputData() {
    inputObj['Name'] = nameEl.val();
    inputObj['E-Mail'] = emailEl.val();
    inputObj['Phone'] = phoneNumberEl.val();
    inputObj['Address'] = addressEl.val();
    inputObj['Postal Code'] = postalCodeEl.val();
  }

  function showDataInPreview() {
    let li1 = $(`<li>Name: ${inputObj['Name']}</li>`);
    let li2 = $(`<li>E-mail: ${inputObj['E-Mail']}</li>`);
    let li3 = $(`<li>Phone: ${inputObj['Phone']}</li>`);
    let li4 = $(`<li>Address: ${inputObj['Address']}</li>`);
    let li5 = $(`<li>Postal Code: ${inputObj['Postal Code']}</li>`);

    ulEl.append(li1, li2, li3, li4, li5);
  }

  function resetInputFields() {
    nameEl.val('');
    emailEl.val('');
    phoneNumberEl.val('');
    addressEl.val('');
    postalCodeEl.val('');
  }

  function onSubmitClick() {
    if (!nameEl.val() || !emailEl.val()) {
      return;
    }

    getInputData();
    resetInputFields();
    showDataInPreview();
    disableSubmitBtn();
    enableEditAndContinueBtn();
  }

  submitBtn.on('click', onSubmitClick);

  function onEditClick() {
    nameEl.val(inputObj['Name']);
    emailEl.val(inputObj['E-Mail']);
    phoneNumberEl.val(inputObj['Phone']);
    addressEl.val(inputObj['Address']);
    postalCodeEl.val(inputObj['Postal Code']);

    ulEl.text('');
    disableEditAndContinueBtn();
    enableSubmitBtn();
  }

  editBtn.on('click', onEditClick);

  function onContinueClick() {
    let h2 = $('<h2>Payment details</h2>');
    let select = $('<select id="paymentOptions" class="custom-select">');
    select.append('<option selected disabled hidden>Choose</option>');
    select.append('<option value="creditCard">Credit Card</option>');
    select.append('<option value="bankTransfer">Bank Transfer</option>');
    let div = $('<div id="extraDetails">');

    containerEl.append(h2, select, div);

    disableSubmitBtn();
    disableEditAndContinueBtn();

    selectEl = $('#paymentOptions');
    selectEl.on('change', onSelectChange);
  }

  continueBtn.on('click', onContinueClick);

  function onSelectChange() {
    let detailsDiv = $('div#extraDetails');
    detailsDiv.text('');
    let btn = $('<button id="checkOut">Check Out</button>');
    btn.click(function () {
      $('#wrapper').text('').append($('<h4>Thank you for your reservation!</h4>'));
    });

    if (selectEl.val() === 'creditCard') {
      let div1 = $('<div class="inputLabel">Card Number<input></div>');
      let div2 = $('<div class="inputLabel">Expiration Date<input></div>');
      let div3 = $('<div class="inputLabel">Security Numbers<input></div>');

      detailsDiv.append(div1, $('<br>'), div2, $('<br>'), div3, $('<br>'), btn);
    } else if (selectEl.val() === 'bankTransfer') {
      let p = $('<p>You have 48 hours to transfer the amount to:<br>IBAN: GR96 0810 0010 0000 0123 4567 890</p>');
      detailsDiv.append(p, btn);
    }
  }
}