function validate() {
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

  $('#company').click(showOrHideCompanyFieldset);
}
