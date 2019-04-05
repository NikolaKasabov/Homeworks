$(() => {
  renderCatTemplate();

  function renderCatTemplate() {
    // TODO: Render cat template and attach events
    const template = $('#cat-template').html();
    const templateFunc = Handlebars.compile(template);
    const resultHtml = templateFunc({ cats });

    $('div#allCats').append(resultHtml);
  }

  function onShowStatusCodeClick(ev) {
    const $currentBtn = $(ev.target);
    const id = $currentBtn.next().attr('id');
    $(`div#${id}`).toggle();
    
    if ($currentBtn.text() === 'Show status code') {
      $currentBtn.text('Hide status code');
    } else {
      $currentBtn.text('Show status code');
    }
  }

  $('button').on('click', onShowStatusCodeClick);
});
