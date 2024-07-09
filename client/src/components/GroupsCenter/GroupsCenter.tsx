import React, { useState, useEffect } from 'react';
import axiosInstance from '../../CustomApi/axiosInstance';
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
import AddBoxIcon from '@mui/icons-material/AddBox';
import GroupModal from './CreateGroup/CreateGroupModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import GroupRow from './GroupRow';

type CreateGroupDto = {
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
  const [tableData, setTableData] = useState<Group[]>([]);
  const [open, setOpen] = useState(false);
  const userProfile = useSelector((state: RootState) => state.auth.userProfile);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await axiosInstance.get(
          `/group/user/${userProfile?.email}`
        );
        const data = response.data;
        setTableData(data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    getGroups();
  }, [userProfile]);

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
      const response = await axiosInstance.post<Group>('/group', newGroup);
      const createdGroup = response.data;

      setTableData((prevData) => [...prevData, createdGroup]);
    } catch (error) {
      console.error('Error creating group:', error);
    }

    handleClose();
  };

  const handleDeleteGroup = async (groupId: string) => {
    try {
      const response = await axiosInstance.delete(`/group/${groupId}`);
      const data = response.data;
      setTableData(data);
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
      <GroupModal
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
            {tableData.map((groupTemp) => (
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
