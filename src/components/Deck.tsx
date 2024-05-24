
import Card from './Card';
import { Card as CardType } from '../Durak';

interface DeckProps {
  cards:CardType[];
  onCardClick?:(index:number)=>void;
}

export default function Deck({ cards, onCardClick }:DeckProps){
  return (
    <div className="deck">
      {cards.map((card, index) => (
        <Card key={index} card={card}
        onClick={onCardClick?()=>onCardClick(index):undefined}
        />
      ))}
    </div>
  );
};


