import React from 'react';
import { Card } from '../BrowseCards';
import './CardsList.scss';

type CardsListProps = {
  cardsList: Card[];
  handleChooseCard: (card: Card) => void;
};

const CardsList: React.FC<CardsListProps> = ({
  cardsList,
  handleChooseCard,
}) => {
  return (
    <table className='cards-table'>
      <thead>
        <tr>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        {cardsList.map((card) => (
          <tr
            key={card.id}
            className='card-row'
            onClick={() => handleChooseCard(card)}
          >
            <td>{card.id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardsList;
