import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group } from '../GroupsCenter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Typography, Box } from '@mui/material';

const GroupDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const group = location.state?.group as Group;

  if (!group) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <Box display='flex' alignItems='center'>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6'>Group Details</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant='h4'>{group.name}</Typography>
        <Typography variant='body1'>Total Cards: {group.totalCards}</Typography>
        <Typography variant='body1'>New: {group.new}</Typography>
        <Typography variant='body1'>In Progress: {group.inProgress}</Typography>
        <Typography variant='body1'>Studied: {group.studied}</Typography>
        {/* Add more details as needed */}
      </Box>
    </Box>
  );
};

export default GroupDetails;
