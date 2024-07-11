import React, { useEffect, useState } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import GroupRow from './GroupRow';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  addGroup,
  deleteGroup,
  fetchGroups,
  moveGroups,
} from '../../redux/thunks/groupThunks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CreateGroupModal from './CreateGroupModal';
import RootDropZone from './RootDropZone/RootDropZone';

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

  const findGroupRecursively = (
    groups: Group[] | undefined,
    groupId: string
  ): Group | null => {
    // Safely handle cases where groups might be undefined or not an array
    if (!Array.isArray(groups) || groups.length === 0) {
      return null;
    }

    for (const group of groups) {
      if (group.id === groupId) {
        return group;
      }

      if (group.children && group.children.length > 0) {
        const found = findGroupRecursively(group.children, groupId);
        if (found) {
          return found;
        }
      }
    }

    return null;
  };

  const moveGroup = (sourceId: string, targetId: string | null) => {
    if (sourceId === targetId) return;
    const sourceGroup = findGroupRecursively(groups, sourceId);
    const targetGroup = targetId
      ? groups.find((group) => group.id === targetId)
      : null;
    if (targetGroup && sourceGroup?.id === targetGroup.parent) {
      return;
    }
    dispatch(
      moveGroups({
        groupIdSource: sourceId,
        groupIdTarget: targetId,
      })
    );
  };
  const findGroup = (id: string) => {
    const group = groups.find((group) => group.id === id);
    return {
      group,
      index: group ? groups.indexOf(group) : -1,
    };
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
      <RootDropZone moveGroup={moveGroup}>
        <TableContainer component={Paper} sx={{ padding: '100px' }}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
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
              {groups?.length > 0 &&
                groups.map((groupTemp) => (
                  <GroupRow
                    key={groupTemp.id}
                    group={groupTemp}
                    level={0}
                    handleDeleteGroup={handleDeleteGroup}
                    moveGroup={moveGroup}
                    findGroup={findGroup}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </RootDropZone>
    </>
  );
};

export default GroupsCenter;
