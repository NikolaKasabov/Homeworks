let result = (function () {
  const suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
  };
  const validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  
  function checkFace(value) {
    if (!validFaces.includes(value)) {
      throw new Error();
    }
  }

  function checkSuit(value) {
    if (!Object.values(suits).includes(value)) {
      throw new Error();
    }
  }

  class Card {
    constructor(face, suit) {
      checkFace(face);
      checkSuit(suit);
      this._face = face;
      this._suit = suit;
    }

    get face() {
      return this._face;
    }

    set face(value) {
      checkFace(value);
      this._face = value;
    }

    get suit() {
      return this._suit;
    }

    set suit(value) {
      checkSuit(value);
      this._suit = value;
    }
  }

  return {
    Card: Card,
    Suits: suits
  }
})();

let Card = result.Card;
let Suits = result.Suits;

let card = new Card('2', Suits.CLUBS);
card.face = 'A';
card.suit = Suits.DIAMONDS;

console.log(card);

'https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/'