// CreateCardModal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import { Modal, Box, Button, Typography, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import './CreateCardModal.scss';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { Group } from '../../GroupsCenter/GroupsCenter';
import { addCardToGroup } from '../../../redux/thunks/groupThunks';
import { AppDispatch } from '../../../redux/store';

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
  const dispatch = useDispatch<AppDispatch>();
  const [questionValue, setQuestionValue] = useState('');
  const [answerValue, setAnswerValue] = useState('');

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

    const card = { question: questionValue, answer: answerValue };

    await dispatch(addCardToGroup({ groupId: group.id, card }));

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
