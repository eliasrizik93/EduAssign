import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../../CustomApi/axiosInstance';
import { Card as CardType } from '../BrowseCards/BrowseCards';
import parse from 'html-react-parser';
import { Label } from '@mui/icons-material';

const StudyCards = () => {
  const [cardsList, setCardsList] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { group } = location.state || {};

  useEffect(() => {
    if (!group) {
      console.error('Group data is missing.');
      return;
    }
    const fetchCards = async () => {
      try {
        const cardsList = await getDueCards(group.id);
        setCardsList(cardsList);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };
    fetchCards();

    return () => {
      setCardsList([]);
    };
  }, [group]);

  const getDueCards = async (groupId: string): Promise<CardType[]> => {
    const response = await axiosInstance.get<CardType[]>('/card', {
      params: {
        groupId: groupId,
      },
    });
    return response.data;
  };

  const reviewCard = async (
    cardId: string,
    performanceRating: number
  ): Promise<CardType> => {
    const response = await axiosInstance.put(`/card/${cardId}/review`, {
      performanceRating,
    });
    return response.data;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cardsList.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRateCard = async (rating: number) => {
    const currentCard = cardsList[currentCardIndex];
    try {
      await reviewCard(currentCard._id, rating);
      handleNextCard();
    } catch (error) {
      console.error('Failed to rate card:', error);
    }
  };

  if (!group) {
    return <div>Error: Group data is missing.</div>;
  }

  if (cardsList.length === 0) {
    return <div>Loading...</div>;
  }

  const currentCard = cardsList[currentCardIndex];

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='flex-start'
        width='100%'
        mb={2}
      >
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6'>Study Cards</Typography>
      </Box>

      <Box>
        <Typography variant='h5'>{parse(currentCard.question)}</Typography>
        {showAnswer && (
          <Typography variant='body1'>{parse(currentCard.answer)}</Typography>
        )}
      </Box>

      <Box display='flex' justifyContent='center' mt={2}>
        {!showAnswer && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleShowAnswer}
            style={{ marginRight: '10px' }}
          >
            Show Answer
          </Button>
        )}
        {showAnswer && (
          <>
            <Button
              variant='contained'
              color='primary'
              style={{ marginRight: '10px' }}
              onClick={() => handleRateCard(0)}
            >
              Hard
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleRateCard(1)}
              style={{ marginRight: '10px' }}
            >
              Medium
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleRateCard(2)}
            >
              Easy
            </Button>
          </>
        )}
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
        <Box mx={2} textAlign='center'>
          <Typography variant='subtitle1' color='textSecondary'>
            New:
          </Typography>
          <Typography variant='h6'>{group.new}</Typography>
        </Box>
        <Box mx={2} textAlign='center'>
          <Typography variant='subtitle1' color='textSecondary'>
            Mistake:
          </Typography>
          <Typography variant='h6'>{group.inProgress}</Typography>
        </Box>
        <Box mx={2} textAlign='center'>
          <Typography variant='subtitle1' color='textSecondary'>
            Repeat:
          </Typography>
          <Typography variant='h6'>{group.studied}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StudyCards;
