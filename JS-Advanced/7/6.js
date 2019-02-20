let result = (function () {
  const suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
  };

  const validFaces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  class Card {
    constructor(face, suit) {
      this._face = face;
      this._suit = suit;
    }

    set face(value) {
      if (!validFaces.includes(value)) {
        throw new Error();
      }

      this._face = value;
    }

    set suit(value) {
      if (!Object.values(suits).includes(value)) {
        throw new Error();
      }

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

let card = new Card('Q', Suits.CLUBS);
card.face = 'A';
card.suit = Suits.DIAMONDS;
let card2 = new Card('1', Suits.DIAMONDS);

console.log(card2);

'https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/'