function attachEvents() {
  const template = $('#towns-template').html();
  const templateFunc = Handlebars.compile(template);

  function onLoadClick() {
    const towns = $('input#towns').val().split(', ');
    const resultHtml = templateFunc({ towns });

    $('#root').append(resultHtml);
  }

  $('button#btnLoadTowns').on('click', onLoadClick);
}
