import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../../../CustomApi/axiosInstance';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const modalStyle = {
  background: 'rgba(128, 128, 128, 0.5)',
};

type DeleteCardModalProps = {
  open: boolean;
  cardId: string;
  handleClose: () => void;
  handleDeleteCard: () => void;
};

const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  open,
  cardId,
  handleClose,
  handleDeleteCard,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    try {
      await axiosInstance.delete(`/card/${cardId}`);
      handleDeleteCard();
      handleClose();
    } catch (err) {
      setError('Failed to delete the card. Please try again.');
      console.error('Delete operation failed:', err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={modalStyle}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
          size='small'
        >
          <CloseIcon />
        </IconButton>
        <Typography id='modal-title' variant='h6' component='h2' gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography id='modal-description'>
          Are you sure you want to permanently delete this card? This action
          cannot be undone.
        </Typography>
        {error && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}
        >
          <Button onClick={handleDelete} variant='contained' color='error'>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteCardModal;
