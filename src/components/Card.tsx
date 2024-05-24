

interface CardProps {
  card: { suit: string; rank: string };
  onClick?:()=>void;
}

export default function Card({ card, onClick }:CardProps) {
  return (
    <div className={`card ${card.suit}`} onClick={onClick}>
      <div className="card-rank">{card.rank}</div>
    </div>
  );
};


