import { useState, useEffect } from 'react';
import Player from './Player';
import Durak, {Card as CardType} from '../Durak';
import Card from './Card';
import Deck from './Deck';

export default function Game(){
  const [durak, setDurak] = useState(() => new Durak([
    { name: 'Player 1', hand: [] },
    { name: 'Player 2', hand: [] }
  ]));
  const [currentAttacker, setCurrentAttacker] = useState(durak.attackerIndex);
  const [currentDefender, setCurrentDefender] = useState(durak.defenderIndex);
  const [table, setTable] = useState<{ attackerCard: CardType, defenderCard: CardType | null }[]>([]);

  useEffect(() => {
    durak.startGame();
    setDurak(durak);
  }, []);

  const handleAttack = (cardIndex: number) => {
    const attacker = durak.players[currentAttacker];
    const card = attacker.hand[cardIndex];
    if (durak.isValidAttack(card)) {
        durak.attack(cardIndex, currentDefender);
      setTable([...table, { attackerCard: card, defenderCard: null }]);
      attacker.hand.splice(cardIndex, 1);
      setCurrentDefender(currentDefender);
      setCurrentAttacker((currentAttacker + 1) % durak.players.length);
    }
  };

  const handleDefend = (cardIndex: number) => {
    const defender = durak.players[currentDefender];
    const card = defender.hand[cardIndex];
    const lastAttack = table[table.length - 1];
    if (lastAttack && durak.isValidDefend(lastAttack.attackerCard, card)) {
        durak.defend(cardIndex, currentAttacker, currentDefender);
      lastAttack.defenderCard = card;
      defender.hand.splice(cardIndex, 1);
      setTable([...table.slice(0, -1), lastAttack]);
      setCurrentAttacker((currentAttacker + 1) % durak.players.length);
    }
  };

  return (
    <div className="game">
      {durak.players.map((player, index) => (
        <Player
          key={index}
          name={player.name}
          hand={player.hand}
          isAttacker={index === currentAttacker}
          isDefender={index === currentDefender}
          onCardClick={index === currentAttacker ? handleAttack : handleDefend}
        />
      ))}
      <div className="table">
        {table.map((turn, index) => (
          <div key={index} className="turn">
            <Card card={turn.attackerCard} />
            {turn.defenderCard && <Card card={turn.defenderCard} />}
          </div>
        ))}
      </div>
      <Deck cards={durak.players[currentAttacker].hand} onCardClick={handleAttack} />
      <Deck cards={durak.players[currentDefender].hand} onCardClick={handleDefend} />
    </div>
  );
};

