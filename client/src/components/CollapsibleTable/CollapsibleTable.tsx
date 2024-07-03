import React, { useState } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { v4 as uuidv4 } from 'uuid';
import GroupModal from './GroupModal';
import NestedRow from './NestedRow';

type Group = {
  id: string;
  name: string;
  new: number;
  inProgress: number;
  reStudy: number;
  depth: number;
  nestedGroup: Group[];
};

const initialData: Group[] = [
  {
    id: '1',
    name: 'Mathematics',
    new: 25,
    inProgress: 18,
    reStudy: 5,
    depth: 0,
    nestedGroup: [
      {
        id: '1-1',
        name: 'Algebra',
        new: 15,
        inProgress: 10,
        reStudy: 7,
        depth: 1,
        nestedGroup: [],
      },
      {
        id: '1-2',
        name: 'Geometry',
        new: 20,
        inProgress: 15,
        reStudy: 10,
        depth: 1,
        nestedGroup: [],
      },
      {
        id: '1-3',
        name: 'Calculus',
        new: 18,
        inProgress: 13,
        reStudy: 6,
        depth: 1,
        nestedGroup: [
          {
            id: '1-3-1',
            name: 'Derivatives',
            new: 9,
            inProgress: 6,
            reStudy: 3,
            depth: 2,
            nestedGroup: [],
          },
          {
            id: '1-3-2',
            name: 'Integrals',
            new: 8,
            inProgress: 5,
            reStudy: 2,
            depth: 2,
            nestedGroup: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Mathematics2',
    new: 25,
    inProgress: 18,
    reStudy: 5,
    depth: 0,
    nestedGroup: [],
  },
  {
    id: '3',
    name: 'Mathematics3',
    new: 25,
    inProgress: 18,
    reStudy: 5,
    depth: 0,
    nestedGroup: [],
  },
];

const CollapsibleTable: React.FC = () => {
  const [tableData, setTableData] = useState<Group[]>(initialData);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddGroup = (groupName: string) => {
    const newGroup: Group = {
      id: uuidv4(),
      name: groupName,
      new: 0,
      inProgress: 0,
      reStudy: 0,
      depth: 0,
      nestedGroup: [],
    };

    setTableData([...tableData, newGroup]);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((groupTemp) => (
              <NestedRow key={groupTemp.id} group={groupTemp} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CollapsibleTable;
