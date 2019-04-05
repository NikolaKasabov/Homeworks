$(() => {
  const template = $('#monkey-template').text();
  const templateFunc = Handlebars.compile(template);
  const resultHtml = templateFunc({ monkeys });

  $('div.monkeys').append(resultHtml);

  function onInfoClick(ev) {
    $(ev.target).next().toggle();
  }

  $('button').on('click', onInfoClick);
})