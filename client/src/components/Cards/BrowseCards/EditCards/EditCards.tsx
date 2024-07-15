import React, { useState, useEffect } from 'react';
import { Card } from '../BrowseCards';
import ReactQuill from 'react-quill';
import './EditCards.scss';
import { Box, Typography, Button } from '@mui/material';
import axiosInstance from '../../../../CustomApi/axiosInstance';

type EditCardsProps = {
  card: Card | null;
  handleUpdateCard: (card: Card) => void;
};

const quillModules = {
  // Define your Quill modules here
};

const EditCards: React.FC<EditCardsProps> = ({ card, handleUpdateCard }) => {
  const [editedCard, setEditedCard] = useState<Card | null>(card);

  useEffect(() => {
    setEditedCard(card);
  }, [card]);

  if (!editedCard) {
    return <div>Select a card to edit</div>;
  }

  const handleQuestionChange = (value: string) => {
    setEditedCard({ ...editedCard, question: value });
  };

  const handleAnswerChange = (value: string) => {
    setEditedCard({ ...editedCard, answer: value });
  };

  const handleSave = async () => {
    handleUpdateCard(editedCard);
  };

  return (
    <Box className='edit-cards-container'>
      <Typography variant='h6'>Editing Card: {editedCard._id}</Typography>
      <Box className='edit-cards-half'>
        <Typography variant='subtitle1'>Question:</Typography>
        <ReactQuill
          className='quill-editor'
          modules={quillModules}
          theme='snow'
          value={editedCard.question}
          onChange={handleQuestionChange}
        />
      </Box>
      <Box className='edit-cards-half'>
        <Typography variant='subtitle1'>Answer:</Typography>
        <ReactQuill
          className='quill-editor'
          modules={quillModules}
          theme='snow'
          value={editedCard.answer}
          onChange={handleAnswerChange}
        />
      </Box>
      <Box className='save-button-container'>
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EditCards;
