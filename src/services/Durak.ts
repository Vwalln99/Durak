import { Player } from "../models/Player";
import { Card, Suit, Rank } from "../models/Card";

class Durak {
  players: Player[];
  deck: Card[];
  trumpCard: Card;
  attackerIndex: number;
  defenderIndex: number;

  constructor(players: Player[]) {
    this.players = players;
    this.deck = this.generateDeck();
    this.trumpCard = this.deck[this.deck.length - 1];
    this.attackerIndex = 0;
    this.defenderIndex = 1;
    this.dealCards();
  }

  generateDeck(): Card[] {
    const suits = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
    const ranks = [
      Rank.Six,
      Rank.Seven,
      Rank.Eight,
      Rank.Nine,
      Rank.Ten,
      Rank.Jack,
      Rank.Queen,
      Rank.King,
      Rank.Ace,
    ];
    let deck: Card[] = [];

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        deck.push({ suit, rank });
      });
    });

    return this.shuffle(deck);
  }

  shuffle(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealCards() {
    for (let i = 0; i < 6; i++) {
      this.players.forEach((player) => {
        player.hand.push(this.deck.pop()!);
      });
    }
  }

  startGame() {
    this.deck = this.generateDeck();
    this.trumpCard = this.deck[this.deck.length - 1];
    this.players.forEach((player) => (player.hand = []));
    this.dealCards();
  }

  isTrump(card: Card): boolean {
    return card.suit === this.trumpCard.suit;
  }

  canDefend(attackerCard: Card, defenderCard: Card): boolean {
    if (this.isTrump(defenderCard)) {
      return (
        !this.isTrump(attackerCard) || defenderCard.rank > attackerCard.rank
      );
    } else {
      return (
        defenderCard.suit === attackerCard.suit &&
        defenderCard.rank > attackerCard.rank
      );
    }
  }

  attack(attackerIndex: number, cardIndex: number) {
    const attacker = this.players[attackerIndex];
    const card = attacker.hand.splice(cardIndex, 1)[0];
    return card;
  }

  defend(defenderIndex: number, attackCard: Card, cardIndex: number) {
    const defender = this.players[defenderIndex];
    const card = defender.hand[cardIndex];

    if (this.canDefend(attackCard, card)) {
      defender.hand.splice(cardIndex, 1);
      return card;
    }
    return null;
  }
}

export default Durak;
