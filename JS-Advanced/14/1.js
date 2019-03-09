function subtract() {
  let firstNum = +$('input#firstNumber').val();
  let secondNum = +$('input#secondNumber').val();

  $('div#result').text(firstNum - secondNum);
}