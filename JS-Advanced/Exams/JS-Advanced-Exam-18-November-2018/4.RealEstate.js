function realEstateAgency() {
  let regPriceEl = $('[name="apartmentRent"]');
  let regTypeEl = $('[name="apartmentType"]');
  let regCommissionEl = $('[name="agencyCommission"]');
  let regButton = $('[name="regOffer"]');

  let findBudgetEl = $('[name="familyBudget"]');
  let findTypeEl = $('[name="familyApartmentType"]');
  let findNameEl = $('[name="familyName"]');
  let findButton = $('[name="findOffer"]');

  let offersPanelEl = $('div#building');
  let messageEl = $('p#message');

  let totalProfitEl = $('#roof h1');
  let totalProfit = 0;

  function isRegDataValid(price, type, commission) {
    return (!price || price < 0
      || !type || type.includes(':')
      || !commission || commission < 0 || commission > 100);
  }

  function addOffer(price, type, commission) {
    let newOfferDiv = $('<div class="apartment">');
    let p1 = $(`<p>Rent: ${price}</p>`);
    let p2 = $(`<p>Type: ${type}</p>`);
    let p3 = $(`<p>Commission: ${commission}</p>`);
    newOfferDiv.append(p1, p2, p3);
    offersPanelEl.append(newOfferDiv);
  }

  function resetInputs(btn) {
    btn.siblings('input').val('');
  }

  function onRegButtonClick() {
    let price = +regPriceEl.val();
    let type = regTypeEl.val();
    let commission = +regCommissionEl.val();

    if (isRegDataValid(price, type, commission)) {
      messageEl.text('Your offer registration went wrong, try again.');
    } else {
      addOffer(price, type, commission);
      resetInputs(regButton);
      messageEl.text('Your offer was created successfully.');
    }
  }

  function foundApartment(type, budget) {
    let apartmentDivs = $('div.apartment');
    let currentProfit = 0;
    let foundApartmentDivs = apartmentDivs.filter((i, e) => {
      let currentRentPrice = +$(e).children().eq(0).text().split(': ')[1];
      let currentType = $(e).children().eq(1).text().split(': ')[1];
      let currentCommission = +$(e).children().eq(2).text().split(': ')[1];
      currentCommission /= 100;

      if (currentRentPrice + (currentRentPrice * currentCommission) <= budget
        && currentType === type) {
        if (currentProfit === 0) {
          currentProfit = currentRentPrice * currentCommission;
          totalProfit += (currentProfit * 2);
        }

        return e;
      }
    });

    if (foundApartmentDivs.length > 0) {
      return foundApartmentDivs[0];
    } else {
      return false;
    }
  }

  function onFindButtonClick() {
    let budget = +findBudgetEl.val();
    let type = findTypeEl.val();
    let familyName = findNameEl.val();

    if (!budget || budget < 0 || !type || !familyName) {
      return;
    }

    let foundApartmentDiv = foundApartment(type, budget);
    if (foundApartmentDiv !== false) {
      totalProfitEl.text(`Agency profit: ${totalProfit} lv.`);
      let newDiv = $('<div class="apartment" style="border: 2px solid red;">');
      let p1 = $(`<p>${familyName}</p>`);
      let p2 = $('<p>live here now</p>');
      let button = $('<button>MoveOut</button>').click(() => {
        newDiv.remove();
        messageEl.text(`They had found cockroaches in ${familyName}\'s apartment`);
      });
      newDiv.append(p1, p2, button);
      $(foundApartmentDiv).replaceWith(newDiv);
    } else {
      messageEl.text('We were unable to find you a home, so sorry :(');
    }

    resetInputs(findButton);
  }

  regButton.on('click', onRegButtonClick);
  findButton.on('click', onFindButtonClick);

  // hardcode some apartments
  // addOffer(5, 'type 1', 10);
  // addOffer(15, 'type 1', 20);
  // addOffer(8, 'type 3', 40);
}