function acceptance() {
  let companyElem = $('input[name="shippingCompany"]');
  let productElem = $('input[name="productName"]');
  let quantityElem = $('input[name="productQuantity"]');
  let scrapeElem = $('input[name="productScrape"]');

  let company = companyElem.val();
  let product = productElem.val();
  let quantity = +quantityElem.val();
  let scrape = +scrapeElem.val();

  companyElem.val('');
  productElem.val('');
  quantityElem.val('');
  scrapeElem.val('');

  if (!company || !product || !quantity || !scrape || (quantity - scrape <= 0)) {
    return;
  }

  let div = $('<div>');
  let p = $('<p>');
  p.text(`[${company}] ${product} - ${quantity - scrape} pieces`);
  let button = $('<button>Out of stock</button>').click(() => div.remove());
  div.append(p, button);

  $('div#warehouse').append(div);
}