function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/';
  const appKey = 'kid_BJ_Ke8hZg'
  const authString = 'Basic ' + btoa('guest:pass');
  const $dateInput = $('input#venueDate');
  const $venuesInfo = $('div#venue-info');

  // get venues ids for selected date
  function onListVenuesClick() {
    const date = $dateInput.val();

    showMessage();
    $.ajax({
      method: 'POST',
      url: baseUrl + `rpc/${appKey}/custom/calendar?query=${date}`,
      headers: {
        Authorization: authString
      },
      success: getVenues,
      error: err => console.log(err)
    });
  }

  // add click event listener to 'List Venues' button
  $('input#getVenues').on('click', onListVenuesClick);

  // gets info for selected date's venues
  function getVenues(idsArr) {
    showMessage();
    idsArr.forEach(id => {
      $.ajax({
        method: 'GET',
        url: baseUrl + `appdata/${appKey}/venues/${id}`,
        headers: {
          Authorization: authString
        },
        success: displayVenue,
        error: err => console.log(err)
      });
    });
  }

  // display selected venue's info
  function displayVenue(venue) {
    const $venueTemplate = $(`<div class="venue" id="${venue._id}">
    <span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>
    <div class="venue-details" style="display: none;">
      <table>
        <tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>
        <tr>
          <td class="venue-price">${venue.price} lv</td>
          <td><select class="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select></td>
          <td><input class="purchase" type="button" value="Purchase"></td>
        </tr>
      </table>
      <span class="head">Venue description:</span>
      <p class="description">${venue.description}</p>
      <p class="description">Starting time: ${venue.startingHour}</p>
    </div>
    </div>`);

    $venuesInfo.append($venueTemplate);

    // add click event listener to 'More info' button
    $(`div[id="${venue._id}"] input[value="More info"]`).on('click', onMoreInfoClick);

    // show selected venue's details and hide the rest venues details
    function onMoreInfoClick(ev) {
      // hide all venue-details divs
      $('div.venue-details').css('display', 'none');
      // show current venue-details div
      $(ev.target).parent().next().css('display', 'block');
    }

    // add click event listener to 'Purchase' button
    $(`div[id="${venue._id}"] input[value="Purchase"]`).on('click', () => onPurchaseClick(venue._id, venue.name, venue.price));
  }

  // calculate price and change view
  function onPurchaseClick(id, name, price) {
    const quantity = Number($(`div[id="${id}"] select`).val());

    const template = `<span class="head">Confirm purchase</span>
    <div class="purchase-info">
      <span>${name}</span>
      <span>${quantity} x ${price}</span>
      <span>Total: ${quantity * price} lv</span>
      <input type="button" value="Confirm">
    </div>`;

    $venuesInfo
      .empty()
      .append(template);

    // add click event listener to 'Confirm' button
    $venuesInfo.find('input[value="Confirm"]').on('click', () => onConfirmClick(id, quantity));
  }

  // send post request when 'Confirm' button is clicked
  function onConfirmClick(id, quantity) {
    showMessage();
    $.ajax({
      method: 'POST',
      url: baseUrl + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${quantity}`,
      headers: {
        Authorization: authString
      },
      success: data => {
        $('<p>You may print this page as your ticket</p>').insertBefore($venuesInfo);
        $venuesInfo.html(data.html);
      },
      error: err => console.log(err)
    });
  }

  // create and append message div
  const $message = $('<div style="display: none"><h3>Loading...</h3></div>');
  $message.insertAfter('div#content');

  function showMessage() {
    $message.show();
    setTimeout(() => {
      $message.fadeOut();
    }, 1500);
  }
}
