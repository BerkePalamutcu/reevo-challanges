/*
SINCE THIS TASK REQUIRES BARE NODE JS APPLICATION I WON'T BE ADDING
UNIT TESTS OR ANY OTHER COMPREHENSIVE TESTING FUNCTIONALITY. 
I WILL MANUALLY ADD THE TESTS AT THE END!
*/

class Card {
  constructor(rank, suit, priority) {
    this.rank = rank;
    this.suit = suit;
    this.priority = priority;
  }
}

class Deck {
  cards = [];
  suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  constructor() {
    this.createDeck();
  }

  createDeck() {
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank, index) => {
        this.cards.push(new Card(rank, suit, index + 1));
      });
    });
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i + 1);

      /*I AM ASSIGNING EACH CARD TO A NEW RANDOM INDEX */
      /*I USED Fisher-Yates (or Knuth) Shuffle algorithm here*/
      /*https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle */

      [this.cards[i], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[i],
      ];
    }

    console.log("SHUFFLED CARDS", this.cards);
    return this.cards;
  }

  isFlush(hand) {
    if (hand.length < 5) {
      console.error(
        "The size of the hand should be minimum 5 to check if it is flush or not!"
      );
      return;
    }

    //just using the first card in the hand as the test suit
    const firstSuit = hand[0].suit;

    const result = hand.every((card) => card.suit === firstSuit);

    //CONSOLE LOGGING THE RESULTS
    console.log(
      result ? "THIS CARD DECK IS FLUSH!" : "THIS CARD DECK IS NOT FLUSH!"
    );

    return result;
  }

  isStraight(hand) {
    /*
          THIS IS THE MOST TRICKY PART OF THE TASK !
          BUT SINCE I CREATED THE PRIORITY VARIABLE FOR THE CARD DATA STRUCTURE
          I CAN CHECK IF THE ARRAY IS CONSECUTIVE OR NOT!
      */

    if (hand.length < 5) {
      return console.error(
        "There are no 5 elements in the hand! can not check!"
      );
    }

    hand.sort((a, b) => a.priority - b.priority);

    /*
        I KNOW THAT WHEN I SORT THE CARDS THE FIRST INDEX WILL ALWAYS HAVE 10
        AND THE LAST INDEX WILL HAVE THE 1 PRIORITY DUE TO SORTING. THEREFORE,
        I CAN CHECK THE HIGH STRAIGHT LOGIC BEFORE ENTERING THE MAIN LOOP
    */

    if (hand[0].priority === 1 && hand[hand.length - 1].priority === 13) {
      console.log("High Straight!");
      return true;
    }

    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i + 1].priority - hand[i].priority != 1) {
        console.log("Not Consecutive!");
        return false;
      }
    }

    console.log("Consecutive!");
    return true;
  }
}

//CLASS ENDS HERE
/*

I WON'T CREATE A MAIN ROUTINE FUNCTION HERE BECAUSE YOU CAN PLAY AROUND WITH THE CODE

*/
const myDeck = new Deck();

const exampleFlush = [
  new Card("A", "Hearts"),
  new Card("10", "Hearts"),
  new Card("J", "Hearts"),
  new Card("Q", "Hearts"),
  new Card("K", "Hearts"),
];

const exampleNotFlush = [
  new Card("A", "Hearts"),
  new Card("10", "Clubs"),
  new Card("J", "Hearts"),
  new Card("Q", "Hearts"),
  new Card("K", "Hearts"),
];

const straightHand1 = [
  new Card("A", "Hearts", 1),
  new Card("2", "Diamonds", 2),
  new Card("3", "Clubs", 3),
  new Card("4", "Spades", 4),
  new Card("5", "Hearts", 5),
];

const straightHandTest = [
  new Card("3", "Hearts", 3),
  new Card("2", "Diamonds", 2),
  new Card("A", "Clubs", 1),
  new Card("4", "Spades", 4),
  new Card("5", "Hearts", 5),
];

const highStraightHand = [
  new Card("10", "Hearts", 10),
  new Card("J", "Diamonds", 11),
  new Card("Q", "Clubs", 12),
  new Card("K", "Spades", 13),
  new Card("A", "Hearts", 1), // Ace as high card
];

const lowStraightHand = [
  new Card("A", "Hearts", 1),
  new Card("2", "Diamonds", 2),
  new Card("3", "Clubs", 3),
  new Card("4", "Spades", 4),
  new Card("5", "Hearts", 5),
];

const regularStraightHand = [
  new Card("5", "Hearts", 5),
  new Card("6", "Diamonds", 6),
  new Card("7", "Clubs", 7),
  new Card("8", "Spades", 8),
  new Card("9", "Hearts", 9),
];

const nonStraightHand = [
  new Card("A", "Hearts", 1),
  new Card("3", "Diamonds", 3),
  new Card("5", "Clubs", 5),
  new Card("7", "Spades", 7),
  new Card("9", "Hearts", 9),
];

const incompleteStraightHand = [
  new Card("2", "Hearts", 2),
  new Card("3", "Diamonds", 3),
  new Card("4", "Clubs", 4),
  new Card("5", "Spades", 5),
  new Card("7", "Hearts", 7),
];

const duplicateRanksHand = [
  new Card("10", "Hearts", 10),
  new Card("10", "Diamonds", 10),
  new Card("J", "Clubs", 11),
  new Card("Q", "Spades", 12),
  new Card("K", "Hearts", 13),
];

//TESTING FOR SHUFFLING CARDS
myDeck.shuffle();

//TESTING FOR FLUSH
myDeck.isFlush(exampleFlush);
myDeck.isFlush(exampleNotFlush);
//TESTING FOR STRAIGHT CASES
myDeck.isStraight(nonStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(straightHand1); // Should print "Consecutive!" and return true
myDeck.isStraight(lowStraightHand); // Should print "Consecutive!" and return true
myDeck.isStraight(highStraightHand); // Should print "High Straight!" and return true
myDeck.isStraight(regularStraightHand); // Should print "Consecutive!" and return true
myDeck.isStraight(nonStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(incompleteStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(duplicateRanksHand); // Should print "Not Consecutive!" and return false

myDeck.isStraight(straightHandTest);
