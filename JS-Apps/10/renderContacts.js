$(async function () {
  // register partial
  const partialTemplate = await $.get('./templates/partialTemplate.hbs');
  Handlebars.registerPartial('partialTemplate', partialTemplate);

  const mainTemplate = await $.get('./templates/mainTemplate.hbs');
  const templateFunc = Handlebars.compile(mainTemplate);
  // contacts array is in the global scope
  const context = { contacts };
  const resultHtml = templateFunc(context);

  $('body').append(resultHtml);
});

function showDetails(id) {
  $(`div#${id}`).toggle();
}