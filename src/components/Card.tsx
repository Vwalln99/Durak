
import { Card as CardType } from '../models/Card';

interface CardProps {
  card: CardType;
  onClick?: () => void;
}

export default function Card ({ card, onClick } : CardProps ){
  return (
    <div className="card" onClick={onClick}>
      {card.rank} {card.suit}
    </div>
  );
};


