function extractText() {
  const result = $('li').toArray()
    .map(v => v.textContent)
    .join(', ');

  console.log(result);
  $('#result').text(result);
}