import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group } from '../GroupsCenter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography, Box, Button } from '@mui/material';
import CreateCardModal from '../../Cards/CreateCardModal';
import BrowseCards from '../../Cards/BrowseCards';

const GroupDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const group = location.state?.group as Group;

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState(false);

  if (!group) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenCardModal = () => {
    setIsCardModalOpen(true);
  };
  const handleOpenBrowseModal = () => {
    setIsBrowseModalOpen(true);
  };
  const handleCardCloseModal = () => {
    setIsCardModalOpen(false);
  };
  const handleBrowseCloseModal = () => {
    setIsBrowseModalOpen(false);
  };

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
        <Typography variant='h6'>Group Details</Typography>
      </Box>
      <Box display='flex' justifyContent='center' mt={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleOpenCardModal}
          style={{ marginRight: '10px' }}
        >
          Add Cards
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleOpenBrowseModal}
        >
          Browse Cards
        </Button>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h4'>{group.name}</Typography>
        <Typography variant='body1'>Total Cards: {group.totalCards}</Typography>
        <Typography variant='body1'>New: {group.new}</Typography>
        <Typography variant='body1'>In Progress: {group.inProgress}</Typography>
        <Typography variant='body1'>Studied: {group.studied}</Typography>
      </Box>
      <CreateCardModal
        open={isCardModalOpen}
        handleClose={handleCardCloseModal}
        group={group}
      />
      <BrowseCards
        open={isBrowseModalOpen}
        handleClose={handleBrowseCloseModal}
        group={group}
      />
    </Box>
  );
};

export default GroupDetails;
