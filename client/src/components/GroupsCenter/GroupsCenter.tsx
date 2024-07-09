import React, { useState, useEffect } from 'react';
import axiosInstance from '../../CustomApi/axiosInstance';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateGroupModal from './CreateGroupModal';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import GroupRow from './GroupRow';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import {
  addGroup,
  deleteGroup,
  fetchGroups,
} from '../../redux/thunks/groupThunks';
import { useDispatch } from 'react-redux';
import { Store } from 'redux';

export type CreateGroupDto = {
  name: string;
  userEmail: string;
  totalCards: number;
  new: number;
  inProgress: number;
  studied: number;
  parentGroupId: string | null;
  cardsId: string[];
};

export type Group = {
  id: string;
  name: string;
  userEmail: string;
  totalCards: number;
  new: number;
  inProgress: number;
  studied: number;
  parent: string | null;
  children: Group[];
  cards: string[];
  createdAt: string;
  updatedAt: string;
};

const GroupsCenter: React.FC = () => {
  const groups = useSelector(
    (state: RootState) => state.groupCollection.groups
  );
  const [open, setOpen] = useState(false);
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userProfile?.email) {
      dispatch(fetchGroups(userProfile.email));
    }
  }, [dispatch, userProfile]);

  const handleAddGroup = async (groupName: string) => {
    const newGroup: CreateGroupDto = {
      name: groupName,
      userEmail: userProfile?.email || '',
      totalCards: 0,
      new: 0,
      inProgress: 0,
      studied: 0,
      parentGroupId: null,
      cardsId: [],
    };

    try {
      dispatch(addGroup(newGroup));
    } catch (error) {
      console.error('Error creating group:', error);
    }

    handleClose();
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      dispatch(deleteGroup(groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <>
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<AddBoxIcon />}
        onClick={handleOpen}
      >
        Create Group
      </Button>
      <CreateGroupModal
        open={open}
        handleClose={handleClose}
        handleAddGroup={handleAddGroup}
      />

      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align='center'>New</TableCell>
              <TableCell align='center'>In Progress</TableCell>
              <TableCell align='center'>Restudy</TableCell>
              <TableCell align='center'>Share</TableCell>
              <TableCell align='center'>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((groupTemp) => (
              <GroupRow
                key={groupTemp.id}
                group={groupTemp}
                level={0}
                handleDeleteGroup={handleDeleteGroup}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GroupsCenter;
