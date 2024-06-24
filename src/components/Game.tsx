import { useState, useEffect } from 'react';
import Player from './Player';
import Durak from '../services/Durak';
import { Card as CardType } from '../models/Card';
import './Game.css';

export default function Game (){
  const [durak, setDurak] = useState(() => new Durak([
    { name: 'Player 1', hand: [] },
    { name: 'Player 2', hand: [] }
  ]));
  const [currentAttacker, setCurrentAttacker] = useState(0);
  const [currentDefender, setCurrentDefender] = useState(1);
  const [table, setTable] = useState<{ attackerCard: CardType, defenderCard: CardType | null }[]>([]);
  const [gameMessage, setGameMessage] = useState('');

  useEffect(() => {
    durak.startGame();
    setDurak(durak);
  }, [durak]);

  const handleAttack = (cardIndex: number) => {
    const attackCard = durak.attack(currentAttacker, cardIndex);
    if (attackCard) {
      setTable([...table, { attackerCard: attackCard, defenderCard: null }]);
    } else {
      setGameMessage('Angriff fehlgeschlagen.');
    }
  };

  const handleDefend = (cardIndex: number) => {
    const lastAttack = table[table.length - 1];
    if (!lastAttack) return;

    const defendCard = durak.defend(currentDefender, lastAttack.attackerCard, cardIndex);
    if (defendCard) {
      lastAttack.defenderCard = defendCard;
      setTable([...table]);
    } else {
      setGameMessage('Verteidigung fehlgeschlagen. Karte aufgenommen.');
      durak.players[currentDefender].hand.push(lastAttack.attackerCard);
      setTable(table.slice(0, -1));
    }
  };

  const endTurn = () => {
    setCurrentAttacker((currentAttacker + 1) % durak.players.length);
    setCurrentDefender((currentDefender + 1) % durak.players.length);
    setTable([]);
    setGameMessage('');
  };

  return (
    <div className="game">
      <h1>Durak</h1>
      {gameMessage && <p>{gameMessage}</p>}
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
        {/*{table.map((turn, index) => (
          <div key={index} className="turn">
            <Card card={turn.attackerCard} />
            {turn.defenderCard && <Card card={turn.defenderCard} />}
          </div>
        ))}*/}
      </div>
      <button onClick={endTurn}>Turn beenden</button>
    </div>
  );
};


