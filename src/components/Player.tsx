
import { Card as CardType } from '../models/Card';
import Card from './Card';

interface PlayerProps {
  name: string;
  hand: CardType[];
  isAttacker: boolean;
  isDefender: boolean;
  onCardClick: (cardIndex: number) => void;
}

export default function Player ({ name, hand, isAttacker, isDefender, onCardClick }:PlayerProps) {
  return (
    <div className="player">
      <h2>{name}</h2>
      <div className="hand">
        {hand.map((card, index) => (
          <Card key={index} card={card} onClick={() => onCardClick(index)} />
        ))}
      </div>
      {isAttacker && <p>Angreifer</p>}
      {isDefender && <p>Verteidiger</p>}
    </div>
  );
};

