const $div = $('div.container');
let template = Handlebars.compile('<div>Name: {{name}}</div>');
Handlebars.registerPartial()

$div.html(template({ name: 'Moshe' }));