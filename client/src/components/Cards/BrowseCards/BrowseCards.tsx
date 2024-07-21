import { Box, IconButton, Modal, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Group } from '../../GroupsCenter/GroupsCenter';
import CloseIcon from '@mui/icons-material/Close';
import CardsList from './CardsList/CardsList';
import EditCards from './EditCards/EditCards';
import axiosInstance from '../../../CustomApi/axiosInstance';

type BrowseCardsProps = {
  open: boolean;
  handleClose: () => void;
  group: Group;
};

export type Card = {
  _id: string;
  question: string;
  answer: string;
  groupId: string;
  state: 'new' | 'inProgress' | 'restudy';
};

const BrowseCards: React.FC<BrowseCardsProps> = ({
  open,
  handleClose,
  group,
}) => {
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [chosenCard, setChosenCard] = useState<Card | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      const response = await axiosInstance.get<Card[]>('card', {
        params: { groupId: group.id },
      });
      setCardsList(response.data);
    } catch (error) {
      console.error('Error fetching cards', error);
    }
  }, [group.id]);

  useEffect(() => {
    if (group) {
      fetchCards();
    }
    return () => {
      setCardsList([]);
      setChosenCard(null);
    };
  }, [group, fetchCards]);

  const handleDeleteCard = () => {
    setChosenCard(null);
    fetchCards();
  };

  const handleCloseBrowseCards = () => {
    handleClose();
    setChosenCard(null);
  };

  const handleUpdateCard = async (editedCard: Card) => {
    try {
      await axiosInstance.put(`/card/${editedCard._id}`, {
        question: editedCard.question,
        answer: editedCard.answer,
      });
      fetchCards();
    } catch (error) {
      console.error('Error updating card', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseBrowseCards}
      aria-labelledby='create-browse-modal-title'
      aria-describedby='create-browse-modal-description'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
        p={2}
      >
        <Box
          bgcolor='background.paper'
          p={4}
          borderRadius={5}
          boxShadow={3}
          width='100%'
          maxWidth={1670}
          height={800}
          display='flex'
          flexDirection='column'
        >
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            mb={2}
            position='relative'
          >
            <Typography variant='h5' id='create-browse-modal-title'>
              Browse Cards
            </Typography>
            <IconButton
              onClick={handleCloseBrowseCards}
              style={{ position: 'absolute', right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            className='browse-modal-container'
            sx={{ flex: 1, overflowY: 'auto' }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  overflow: 'auto',
                  p: 2,
                  boxShadow: 3,
                }}
              >
                <CardsList
                  cardsList={cardsList}
                  handleChooseCard={setChosenCard}
                  handleDeleteCard={handleDeleteCard}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  p: 2,
                  boxShadow: 3,
                }}
              >
                <EditCards
                  card={chosenCard}
                  handleUpdateCard={handleUpdateCard}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default BrowseCards;
