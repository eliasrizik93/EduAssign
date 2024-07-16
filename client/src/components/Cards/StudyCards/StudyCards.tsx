import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../CustomApi/axiosInstance';
import { Card as CardType } from '../BrowseCards/BrowseCards'; // Rename to avoid conflict with HTML element
import parse from 'html-react-parser';

const StudyCards = () => {
  const [cardsList, setCardsList] = useState<CardType[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // Track current card index
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();
  const { id: groupId } = useParams();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axiosInstance.get<CardType[]>('card', {
          params: {
            groupId: groupId,
          },
        });
        const cardsList = response.data;
        setCardsList(cardsList);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };
    fetchCards();

    return () => {
      setCardsList([]);
    };
  }, [groupId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cardsList.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleRateCard = async (rating: number) => {
    const currentCard = cardsList[currentCardIndex];
    try {
      await axiosInstance.put(`card/${currentCard._id}/review`, {
        performanceRating: rating,
      });
      handleNextCard();
    } catch (error) {
      console.error('Failed to rate card:', error);
    }
  };

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
              onClick={() => handleRateCard(5)}
              style={{ marginRight: '10px' }}
            >
              Easy
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleRateCard(3)}
              style={{ marginRight: '10px' }}
            >
              Medium
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleRateCard(1)}
            >
              Hard
            </Button>
          </>
        )}
      </Box>

      <Box display='flex' justifyContent='center' mt={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
          style={{ marginRight: '10px' }}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleNextCard}
          disabled={currentCardIndex === cardsList.length - 1}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StudyCards;
