type Suit = "spade" | "heart" | "diamond" | "club";
type Rank = "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  suit: Suit;
  rank: Rank;
}

interface Player {
  name: string;
  hand: Card[];
}

class Durak {
  players: Player[];
  deck: Card[];
  trumpCard: Card | null;
  attackerIndex: number;
  defenderIndex: number;

  constructor(players: Player[]) {
    this.players = players;
    this.deck = this.generateDeck();
    this.trumpCard = null;
    this.attackerIndex = 0;
    this.defenderIndex = 1;
    this.dealCards();
  }

  generateDeck(): Card[] {
    const suits: Suit[] = ["spade", "heart", "diamond", "club"];
    const ranks: Rank[] = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck: Card[] = [];
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank });
      }
    }
    return this.shuffleDeck(deck);
  }
  shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealCards(): void {
    for (let i = 0; i < 6; i++) {
      for (const player of this.players) {
        const card = this.deck.pop();
        if (card) {
          player.hand.push(card);
        }
      }
    }
    this.trumpCard = this.deck.pop()!;
  }

  startGame(): void {
    console.log("Durak game starts!");
    console.log(
      `Trump card: ${this.trumpCard!.rank} of ${this.trumpCard!.suit}`
    );
  }

  attack(attackerIndex: number, cardIndex: number): void {
    const attacker = this.players[this.attackerIndex];

    const card = attacker.hand[cardIndex];
    if (this.isValidAttack(card)) {
      console.log(`${attacker.name} attacks with ${card.rank} of ${card.suit}`);
      attacker.hand.splice(cardIndex, 1);
      this.defenderIndex = (attackerIndex + 1) % this.players.length;
    } else {
      console.log(`Invalid attack with ${card.rank} of ${card.suit}`);
    }
  }

  defend(
    defenderIndex: number,
    attackerCardIndex: number,
    defenderCardIndex: number
  ): void {
    const defender = this.players[defenderIndex];
    const attackerCard =
      this.players[(defenderIndex + 1) % this.players.length].hand[
        attackerCardIndex
      ];
    const defenderCard = defender.hand[defenderCardIndex];
    if (this.isValidDefend(attackerCard, defenderCard)) {
      console.log(
        `${defender.name} defends with ${defenderCard.rank} of ${defenderCard.suit}`
      );
      defender.hand.splice(defenderCardIndex, 1);
      this.attackerIndex = (defenderIndex + 1) % this.players.length;
    } else {
      console.log(
        `Invalid defense with ${defenderCard.rank} of ${defenderCard.suit}`
      );
    }
  }

  endTurn(): void {
    console.log("Turn ends.");
    if (this.players.every((player) => player.hand.length === 0)) {
      console.log("All players have no cards left. Game ends.");
    } else {
      console.log("Next turn starts.");
    }
  }

  isGameEnd(): boolean {
    return this.players.some((player) => player.hand.length === 0);
  }

  isValidAttack(card: Card): boolean {
    return card.rank === "6"; // Beispiel: Nur Karte 6 kann als Angriffskarte verwendet werden
  }

  isValidDefend(attackerCard: Card, defenderCard: Card): boolean {
    return (
      attackerCard.rank !== defenderCard.rank &&
      attackerCard.suit !== defenderCard.suit
    );
  }

  compareRanks(rank1: Rank, rank2: Rank): number {
    const ranks: Rank[] = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    return ranks.indexOf(rank1) - ranks.indexOf(rank2);
  }
}

export default Durak;
