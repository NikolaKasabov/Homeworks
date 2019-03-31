function attachEvents() {
  const baseUrl = 'https://baas.kinvey.com/';
  const appKey = 'kid_BJ_Ke8hZg'
  const authString = 'Basic ' + btoa('guest:pass');
  const $dateInput = $('input#venueDate');
  const $venuesInfo = $('div#venue-info');

  // get venues ids for selected date
  function onListVenuesClick() {
    const date = $dateInput.val();
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
  }
}
