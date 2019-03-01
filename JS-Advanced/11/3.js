function attachEvents() {
  $('a').click(function () {
    $('a').removeClass('selected');
    $(this).addClass('selected')
  });
}