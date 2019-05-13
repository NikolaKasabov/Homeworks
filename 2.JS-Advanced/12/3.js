function validate() {
  let nameElem = $('input#username');
  let emailElem = $('input#email');
  let passwordElem = $('input#password');
  let repeatPasswordElem = $('input#confirm-password');
  let companyNumberElem = $('input#companyNumber');
  let shouldValidateCompanyNumber = false;

  const nameRegex = /^[a-zA-Z0-9]{3,20}$/;
  const passwordRegex = /^.{5,15}$/;
  const emailRegex = /^[^@]*@[^.]*\..*$/;

  function showOrHideCompanyFieldset() {
    if ($('#company')[0].checked) {
      $('fieldset#companyInfo').show();
      shouldValidateCompanyNumber = true;
    } else {
      $('fieldset#companyInfo').hide();
      shouldValidateCompanyNumber = false;
    }
  }

  $('input#company').change(showOrHideCompanyFieldset);

  function validate(e) {
    e.preventDefault();

    let isAllValid = true;
    let isNameValid = nameRegex.test(nameElem.val());
    let isEmailValid = emailRegex.test(emailElem.val());
    let isPasswordValid = passwordRegex.test(passwordElem.val());
    let arePasswordsSame = passwordElem.val() === repeatPasswordElem.val();
    let isCompanyNumberValid = (+companyNumberElem.val() >= 1000 && +companyNumberElem.val() <= 9999);

    if (isNameValid) {
      nameElem.css('border-color', '');
    } else {
      nameElem.css('border-color', 'red');
      isAllValid = false;
    }

    if (isEmailValid) {
      emailElem.css('border-color', '');
    } else {
      emailElem.css('border-color', 'red');
      isAllValid = false;
    }

    // if (isPasswordValid) {
    //   passwordElem.css('border-color', '');
    // } else {
    //   passwordElem.css('border-color', 'red');
    //   isAllValid = false;
    // }

    if (isPasswordValid && arePasswordsSame && passwordElem.val().length !== 7) {
      passwordElem.css('border-color', '');
      repeatPasswordElem.css('border-color', '');
    } else {
      passwordElem.css('border-color', 'red');
      repeatPasswordElem.css('border-color', 'red');
      isAllValid = false;
    }

    if (shouldValidateCompanyNumber) {
      if (isCompanyNumberValid) {
        companyNumberElem.css('border-color', '');
      } else {
        companyNumberElem.css('border-color', 'red');
        isAllValid = false;
      }
    }

    if (isAllValid) {
      $('div#valid').show();
    } else {
      $('div#valid').hide();      
    }
  }

  $('button#submit').click(validate);
}
