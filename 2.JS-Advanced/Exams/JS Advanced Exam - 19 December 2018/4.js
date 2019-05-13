function dart() {
  let homePoints = 0;
  let awayPoints = 0;
  let isHome = true;

  function getScoreForLayer(id) {
    let indexes = {
      firstLayer: 0,
      secondLayer: 1,
      thirdLayer: 2,
      fourthLayer: 3,
      fifthLayer: 4,
      sixthLayer: 5
    };

    let currentTd = $('section#scoreBoard tbody tr')
      .eq([indexes[id]])
      .children()
      .eq(1);

    let score = +currentTd
      .text()
      .split(' ')[0];

    return score;
  }

  function printScores() {
    let homeScoresElem = $('div#Home p:first-child');
    let awayScoresElem = $('div#Away p:first-child');

    homeScoresElem.text(homePoints);
    awayScoresElem.text(awayPoints);
  }

  function changeNextPlayerNotice() {
    let firstP = $('div#turns p:first-child');
    let secondP = $('div#turns p:last-child');

    firstP.text(`Turn on ${isHome ? 'Home' : 'Away'}`);
    secondP.text(`Next is ${isHome ? 'Away' : 'Home'}`);
  }

  function isWinner() {
    if (homePoints < 100 && awayPoints < 100) {
      return;
    }

    let homeP = $('div#Home p:last-child');
    let awayP = $('div#Away p:last-child');

    if (homePoints >= 100) {
      homeP.css('background', 'green');
      awayP.css('background', 'red');
    } else if (awayPoints >= 100) {
      homeP.css('background', 'red');
      awayP.css('background', 'green');
    }

    $('section#playBoard div').off('click');
  }

  function onDartBoardClick(e) {
    e.stopPropagation();

    let currentPoints = getScoreForLayer(e.target.id);

    if (isHome) {
      homePoints += currentPoints;
    } else {
      awayPoints += currentPoints;
    }

    printScores();
    isWinner();
    isHome = !isHome;
    changeNextPlayerNotice();
  }

  $('section#playBoard div').on('click', onDartBoardClick);
}