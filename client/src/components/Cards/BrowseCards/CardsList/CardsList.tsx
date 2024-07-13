import React from 'react';
import { Card } from '../BrowseCards';

type CardsListProps = {
  cardsList: Card[];
};

const CardsList: React.FC<CardsListProps> = ({ cardsList }) => {
  return (
    <div>
      {cardsList.map((card) => {
        return <div>{card.question}</div>;
      })}
    </div>
  );
};

export default CardsList;
