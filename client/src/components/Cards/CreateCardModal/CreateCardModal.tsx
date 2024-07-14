import React, { useState } from 'react';
import './CreateCardModal.scss';
import ReactQuill from 'react-quill';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';
import { Group } from '../../GroupsCenter/GroupsCenter';

const quillModules = {
  // Define your Quill modules here
};

type CreateCardModalProps = {
  open: boolean;
  group: Group;
  handleClose: () => void;
};

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  open,
  group,
  handleClose,
}) => {
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
          groupId: group.id,
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
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='create-card-modal-title'
      aria-describedby='create-card-modal-description'
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
            <Typography variant='h5' id='create-card-modal-title'>
              Create New Card
            </Typography>
            <IconButton
              onClick={handleClose}
              style={{ position: 'absolute', right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <div
            className='card-modal-container'
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <div className='editor-container'>
              <div className='editor' style={{ marginBottom: '16px' }}>
                <Typography variant='h6' gutterBottom align='center'>
                  Question
                </Typography>
                <ReactQuill
                  className='quill-editor'
                  modules={quillModules}
                  theme='snow'
                  value={questionValue}
                  onChange={handleSetQuestion}
                />
              </div>
              <div className='editor'>
                <Typography variant='h6' gutterBottom align='center'>
                  Answer
                </Typography>
                <ReactQuill
                  className='quill-editor'
                  modules={quillModules}
                  theme='snow'
                  value={answerValue}
                  onChange={handleSetAnswer}
                />
              </div>
            </div>
            <div className='action-container' style={{ marginTop: '16px' }}>
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
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCardModal;
