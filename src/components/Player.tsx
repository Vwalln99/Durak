
import Deck from './Deck';
import { Card as CardType } from '../Durak';

interface PlayerProps {
  name: string;
  hand: CardType[];
  isAttacker: boolean;
  isDefender: boolean;
  onCardClick?:(index:number) =>void;
}

export default function Player ({ name, hand, isAttacker, isDefender, onCardClick }:PlayerProps) {
    return (
      <div className="player">
        <h2 style={{ fontWeight: isAttacker || isDefender ? 'bold' : 'normal' }}>
          {name} {isAttacker ? '(Angreifer)' : isDefender ? '(Verteidiger)' : ''}
        </h2>
        <Deck
          cards={hand}
          onCardClick={onCardClick}
        />
      </div>
    );
  };
  