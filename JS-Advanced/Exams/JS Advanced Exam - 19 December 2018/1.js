// uslovieto e oburkano, taka dava 100 tochki

function solution() {
  let typeElem = $('input#toyType');
  let priceElem = $('input#toyPrice');
  let descriptionElem = $('textarea#toyDescription');

  let type = typeElem.val();
  let price = priceElem.val();
  let description = descriptionElem.val();

  // if (type || !+price || !description) {
  //   return;
  // }

  if (type && +price && description) {
    let div = $('<div class="gift">');
    let img = $('<img src="gift.png">');
    let h2 = $(`<h2>${type}</h2>`);
    // let h2 = $('<h2>');
    // h2.text(type);
    let p = $(`<p>${description}</p>`);
    let button = $(`<button>Buy it for $${price}</button>`).click(() => div.remove());

    div.append(img, h2, p, button);

    $('section#christmasGiftShop').append(div);
  }

  typeElem.val('');
  priceElem.val('');
  descriptionElem.val('');
}