import React, { useState } from 'react';
import { Card } from '../BrowseCards';
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
import DeleteCardModal from '../DeleteCardModal/DeleteCardModal';

type CardsListProps = {
  cardsList: Card[];
  handleChooseCard: (card: Card) => void;
  handleDeleteCard: () => void;
};

const CardsList: React.FC<CardsListProps> = ({
  cardsList,
  handleChooseCard,
  handleDeleteCard,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const handleOpenDeleteModal = (cardId: string) => {
    setCurrentCardId(cardId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <TableContainer component={Paper} className='cards-table'>
      <Table>
        <TableBody>
          {cardsList.map((card) => (
            <TableRow
              key={card._id}
              onClick={() => handleChooseCard(card)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light grey color on hover
                  '& .question-cell': {
                    // Targeting the cell with class "question-cell"
                    color: '#1976d2', // Changing text color on hover
                    fontWeight: 'bold', // Making text bold on hover
                  },
                },
              }}
              className='card-row'
            >
              <TableCell
                component='th'
                scope='row'
                className='question-cell'
                sx={{ borderBottom: 'none' }}
              >
                {card.question}
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  borderBottom: 'none',
                }}
                className='card-action'
              >
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering row's onClick
                    handleOpenDeleteModal(card._id);
                  }}
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
      {currentCardId && (
        <DeleteCardModal
          cardId={currentCardId}
          open={deleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleDeleteCard={handleDeleteCard}
        />
      )}
    </TableContainer>
  );
};

export default CardsList;
