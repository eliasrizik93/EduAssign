import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface GroupModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddGroup: (groupName: string) => void;
}

const GroupModal: React.FC<GroupModalProps> = ({
  open,
  handleClose,
  handleAddGroup,
}) => {
  const [groupName, setGroupName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = () => {
    handleAddGroup(groupName);
    setGroupName('');
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Create Group
        </Typography>
        <TextField
          id='group-name'
          label='Group Name'
          value={groupName}
          onChange={handleChange}
          fullWidth
          margin='normal'
        />
        <Button onClick={handleSubmit} variant='contained' sx={{ mt: 2 }}>
          Add Group
        </Button>
      </Box>
    </Modal>
  );
};

export default GroupModal;
