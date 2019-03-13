// 90/100

function onlineShop(selector) {
  let form = `<div id="header">Online Shop Inventory</div>
    <div class="block">
        <label class="field">Product details:</label>
        <br>
        <input placeholder="Enter product" class="custom-select">
        <input class="input1" id="price" type="number" min="1" max="999999" value="1"><label class="text">BGN</label>
        <input class="input1" id="quantity" type="number" min="1" value="1"><label class="text">Qty.</label>
        <button id="submit" class="button" disabled>Submit</button>
        <br><br>
        <label class="field">Inventory:</label>
        <br>
        <ul class="display">
        </ul>
        <br>
        <label class="field">Capacity:</label><input id="capacity" readonly>
        <label class="field">(maximum capacity is 150 items.)</label>
        <br>
        <label class="field">Price:</label><input id="sum" readonly>
        <label class="field">BGN</label>
    </div>`;
  $(selector).html(form);

  // Write your code here
  let nameEl = $('input.custom-select');
  let priceEl = $('input#price');
  let quantityEl = $('input#quantity');
  let ulEl = $('ul.display');
  let btnEl = $('button#submit');
  let capacityEl = $('input#capacity');
  let sumEl = $('input#sum');

  let itemsNumber = 0;
  let sum = 0;

  // disable/enable the submit button
  nameEl.on('input', e => {
    if (e.target.value) {
      btnEl.attr('disabled', false);
    } else {
      btnEl.attr('disabled', true);
    }
  });

  btnEl.click(() => {
    let freeSpace = 150 - itemsNumber;
    let currentQuantity = +quantityEl.val();
    let currentPrice = +priceEl.val();
    if (currentQuantity > freeSpace) {
      currentQuantity = freeSpace;
    }

    itemsNumber += currentQuantity;
    sum += currentPrice;
    sumEl.val(sum);

    // check is inventory full
    if (itemsNumber < 150) {
      capacityEl.val(itemsNumber);
    } else {
      capacityEl.val('full').addClass('fullCapacity');

      nameEl.attr('disabled', true);
      priceEl.attr('disabled', true);
      quantityEl.attr('disabled', true);
      btnEl.attr('disabled', true);
    }

    let li = $(`<li>Product: ${nameEl.val()} Price: ${priceEl.val()} Quantity: ${currentQuantity}</li>`);
    ulEl.append(li);
    nameEl.val('');
    priceEl.val('');
    quantityEl.val('');
  });
}
