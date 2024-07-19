import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography, Box, Button } from '@mui/material';
import CreateCardModal from '../../Cards/CreateCardModal';
import BrowseCards from '../../Cards/BrowseCards';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchGroups } from '../../../redux/thunks/groupThunks';

const GroupDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const group = useSelector((state: RootState) =>
    state.groupCollection.groups.find((g) => g.id === id)
  );
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState(false);

  useEffect(() => {
    if (!group && userProfile) {
      dispatch(fetchGroups(userProfile.email));
    }
  }, [dispatch, group, userProfile]);

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

  const handleStudyCardsButton = () => {
    navigate(`/groups/${id}/cards`, { state: { group: group } });
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
        <Button
          variant='contained'
          color='primary'
          onClick={handleStudyCardsButton}
          style={{ marginLeft: '10px' }}
        >
          Study Cards
        </Button>
      </Box>
    </Box>
  );
};

export default GroupDetails;
