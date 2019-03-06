function acceptance() {
  let company = $('input[name="shippingCompany"]').val();
  let product = $('input[name="productName"]').val();
  let quantity = $('input[name="productQuantity"]').val();
  let scrape = $('input[name="productScrape"]').val();

  if (!company || !product || !+quantity || !+scrape) {
    return;
  }


}