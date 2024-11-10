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

    /*
    I USE SET DATA STRUCTURE IF THERE IS EVEN 1 DUPLICATE 
    THE RESULT SHOULD BE NOT CONSECUTIVE AS THE HAND WON'T BE STRAIGHT
    THEREFORE, I AM RETURNING FALSE IMMEDIATELY
    */
    const prioritiesSet = new Set();
    for (let card of hand) {
      if (prioritiesSet.has(card.priority)) {
        console.log("Not Consecutive!");
        return false;
      }
      prioritiesSet.add(card.priority);
    }

    //if there is no duplicate  then we would continue with sorting!
    hand.sort((a, b) => a.priority - b.priority);

    /*
        I KNOW THAT WHEN I SORT THE CARDS THE LAST INDEX WILL ALWAYS HAVE 13
        AND THE FIRST INDEX WILL HAVE THE 1 PRIORITY DUE TO SORTING. THEREFORE,
        I CAN CHECK THE HIGH STRAIGHT LOGIC BEFORE ENTERING THE MAIN LOOP
    */

    if (hand[0].priority === 1 && hand[hand.length - 1].priority === 13) {
      console.log("High Straight!");
      return true;
    }

    /*
      THE FIRST IDEA I HAD WAS USING A FOR LOOP AND COUNTING THE DISTANCE BETWEEN EACH CARD
      IF THE DISTANCE IS DIFFERENT THAN 1 IT SHOULD THROW ERROR BUT SINCE I REMOVE THE DUPLICATES
      THERE IS NO NEED TO ITERATE AGAIN HERE.

      IF THE CASE IS NOT HIGH STRAIGHT THEN THE DISTANCE BETWEEN THE HIGHEST CARD
      AND THE LOWEST CARD SHOULD BE 4 ALWAYS. IF THE CONDITION IS SATISFIED THEN WE CAN 
      KNOW THAT THE HAND IS CONSISTING OF CONSECUTIVE CARDS!
    */
    if (hand[hand.length - 1].priority - hand[0].priority === 4) {
      console.log("Consecutive!");
      return true;
    }

    //for any other case it should be not consecutive!
    console.log("Not Consecutive!");
    return false;
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

const exampleFlush2 = [
  new Card("2", "Spades"),
  new Card("4", "Spades"),
  new Card("7", "Spades"),
  new Card("9", "Spades"),
  new Card("J", "Spades"),
];

// Non-flush with mixed suits
const exampleNotFlush2 = [
  new Card("3", "Clubs"),
  new Card("5", "Diamonds"),
  new Card("8", "Clubs"),
  new Card("10", "Hearts"),
  new Card("K", "Clubs"),
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

const highStraightHandShuffled = [
  new Card("10", "Hearts", 10),
  new Card("J", "Diamonds", 11),
  new Card("A", "Hearts", 1), // Ace as high card
  new Card("Q", "Clubs", 12),
  new Card("K", "Spades", 13),
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

const highStraightHandSameCards = [
  new Card("10", "Hearts", 10),
  new Card("10", "Diamonds", 10),
  new Card("A", "Hearts", 1), // Ace as high card
  new Card("J", "Clubs", 11),
  new Card("K", "Spades", 13),
];

// Straight with mixed suits
const straightHand2 = [
  new Card("6", "Hearts", 6),
  new Card("7", "Diamonds", 7),
  new Card("8", "Clubs", 8),
  new Card("9", "Spades", 9),
  new Card("10", "Hearts", 10),
];

// Low straight with Ace as the lowest card
const lowStraightHand2 = [
  new Card("A", "Diamonds", 1),
  new Card("2", "Hearts", 2),
  new Card("3", "Spades", 3),
  new Card("4", "Clubs", 4),
  new Card("5", "Diamonds", 5),
];

// Non-consecutive straight with a gap
const nonConsecutiveStraightHand = [
  new Card("2", "Hearts", 2),
  new Card("3", "Diamonds", 3),
  new Card("4", "Clubs", 4),
  new Card("6", "Spades", 6),
  new Card("7", "Hearts", 7),
];

// High straight with Ace as the highest card but with duplicates
const highStraightHandWithDuplicate = [
  new Card("10", "Hearts", 10),
  new Card("J", "Diamonds", 11),
  new Card("Q", "Clubs", 12),
  new Card("K", "Spades", 13),
  new Card("A", "Diamonds", 1),
  new Card("A", "Clubs", 1), // Duplicate Ace
];

// Four-card hand (invalid for straight check)
const incompleteHand = [
  new Card("2", "Hearts", 2),
  new Card("3", "Diamonds", 3),
  new Card("4", "Clubs", 4),
  new Card("5", "Spades", 5),
];

// High straight with shuffled order
const highStraightHandMixedOrder = [
  new Card("K", "Spades", 13),
  new Card("J", "Diamonds", 11),
  new Card("A", "Hearts", 1),
  new Card("10", "Clubs", 10),
  new Card("Q", "Hearts", 12),
];

// Non-straight with repeated priority values
const handWithDuplicatePriorities = [
  new Card("7", "Hearts", 7),
  new Card("8", "Diamonds", 8),
  new Card("8", "Clubs", 8), // Duplicate priority
  new Card("9", "Spades", 9),
  new Card("10", "Hearts", 10),
];

//TESTING FOR SHUFFLING CARDS
myDeck.shuffle();

//TESTING FOR FLUSH
myDeck.isFlush(exampleFlush);
myDeck.isFlush(exampleNotFlush);
myDeck.isFlush(exampleFlush2);
myDeck.isFlush(exampleNotFlush2);
//TESTING FOR STRAIGHT CASES
myDeck.isStraight(nonStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(straightHand1); // Should print "Consecutive!" and return true
myDeck.isStraight(lowStraightHand); // Should print "Consecutive!" and return true
myDeck.isStraight(highStraightHand); // Should print "High Straight!" and return true
myDeck.isStraight(regularStraightHand); // Should print "Consecutive!" and return true
myDeck.isStraight(nonStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(incompleteStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(duplicateRanksHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(straightHandTest); // Should print "Consecutive!" and return true
myDeck.isStraight(highStraightHandShuffled); // Should print "High Straight!" and return true
myDeck.isStraight(highStraightHandSameCards); // Should print "Not Consecutive!" and return false
myDeck.isStraight(straightHand2); // Should print "Consecutive!" and return true
myDeck.isStraight(lowStraightHand2); // Should print "Consecutive!" and return true
myDeck.isStraight(nonConsecutiveStraightHand); // Should print "Not Consecutive!" and return false
myDeck.isStraight(incompleteHand); //should throw error
myDeck.isStraight(highStraightHandWithDuplicate); // Should print "Not Consecutive!" and return false
myDeck.isStraight(highStraightHandMixedOrder); // Should print "High Straight!" and return true
myDeck.isStraight(handWithDuplicatePriorities); // Should print "Not Consecutive!" and return false
