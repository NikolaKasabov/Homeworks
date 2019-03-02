function validate() {
  let nameElem = $('input#username');
  let emailElem = $('input#email');
  let passwordElem = $('input#password');
  let repeatPasswordElem = $('input#confirm-password');
  let companyNumberElem = $('input#companyNumber');

  const nameRegex = /^[a-zA-Z0-9]{3,20}$/;
  const passwordRegex = /^.{5,15}$/;
  const emailRegex = /^[^@]*@[^.]*\..*$/;

  function showOrHideCompanyFieldset() {
    if ($('#company')[0].checked) {
      $('fieldset#companyInfo').show();
    } else {
      $('fieldset#companyInfo').hide();
    }
  }

  $('input#company').change(showOrHideCompanyFieldset);

  function validate() {
    
  }

  $('button#submit').click(validate);
}
