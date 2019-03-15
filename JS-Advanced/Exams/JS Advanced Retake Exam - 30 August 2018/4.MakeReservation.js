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

  
}