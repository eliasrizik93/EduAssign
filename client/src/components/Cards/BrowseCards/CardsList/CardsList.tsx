import React from 'react';
import { Card } from '../BrowseCards';
import './CardsList.scss';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '../../../../CustomApi/axiosInstance';

type CardsListProps = {
  cardsList: Card[];
  handleChooseCard: (card: Card) => void;
};

const CardsList: React.FC<CardsListProps> = ({
  cardsList,
  handleChooseCard,
}) => {
  const handleDelete = async (cardId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the row's onClick event
    await axiosInstance.delete(`/card/${cardId}`);
    // Optionally update state to reflect changes
  };

  return (
    <TableContainer component={Paper} className='cards-table'>
      <Table>
        <TableBody>
          {cardsList.map((card) => (
            <TableRow
              key={card._id}
              onClick={() => handleChooseCard(card)}
              className='card-row'
            >
              <TableCell
                component='th'
                scope='row'
                sx={{
                  borderBottom: 'none', // Remove the bottom border
                }}
              >
                {card._id}
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end', // Adjust as needed
                  borderBottom: 'none', // Remove the bottom border
                }}
                className='card-action'
              >
                <IconButton
                  onClick={(event) => handleDelete(card._id, event)}
                  aria-label='delete'
                  size='small'
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardsList;
