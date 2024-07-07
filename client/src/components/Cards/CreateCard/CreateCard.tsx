import React, { useState } from 'react';
import './CreateCard.scss';
import ReactQuill from 'react-quill';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';

const module = {
  // Define your Quill modules here
};

const CreateCard = () => {
  const [questionValue, setQuestionValue] = useState<string>('');
  const [answerValue, setAnswerValue] = useState<string>('');

  const handleSetQuestion = (content: string) => {
    setQuestionValue(content);
  };

  const handleSetAnswer = (content: string) => {
    setAnswerValue(content);
  };

  const handleCreateCard = async () => {
    if (answerValue === '' || questionValue === '') {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/card',
        {
          question: questionValue,
          answer: answerValue,
          groupId: '1',
          id: 'some-unique-id',
        },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      const data = response.data;

      if (response.status === 201) {
        console.log('Card created successfully:', data);
      } else {
        console.error('Creation error:', data);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
    setQuestionValue('');
    setAnswerValue('');
  };

  return (
    <div className='container-test'>
      <div className='card-container'>
        <div className='question'>
          <ReactQuill
            className='react-quill-style'
            modules={module}
            theme='snow'
            value={questionValue}
            onChange={handleSetQuestion}
          />
        </div>
        <div className='answer'>
          <ReactQuill
            className='react-quill-style'
            modules={module}
            theme='snow'
            value={answerValue}
            onChange={handleSetAnswer}
          />
        </div>
      </div>
      <div className='button-container'>
        <Button
          component='label'
          variant='contained'
          startIcon={<AddBoxIcon />}
          onClick={handleCreateCard}
        >
          Create Card
        </Button>
      </div>
    </div>
  );
};

export default CreateCard;
