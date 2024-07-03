import React, { useState } from 'react';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Box,
  Button,
  Modal,
  Typography,
  TextField,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { v4 as uuidv4 } from 'uuid';

import './CollapsibleTable.scss';
type GroupProps = {
  group: Group;
};
type Group = {
  id: string;
  name: string;
  new: number;
  inProgress: number;
  reStudy: number;
  depth: number;
  nestedGroup: Group[];
};

const data: Group[] = [
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

const colors = ['#f5f5f5', '#eeeeee', '#e0e0e0'];
const getBackgroundColor = (depth: number) => {
  return colors[depth % colors.length];
};

const NestedRow: React.FC<GroupProps> = ({ group }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          paddingRight: 0,
        }}
        style={{
          backgroundColor: getBackgroundColor(group.depth),
          padding: '0',
        }}
      >
        <TableCell style={{ width: '50px' }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {group.nestedGroup.length > 0 ? (
              open ? (
                <KeyboardArrowUp />
              ) : (
                <KeyboardArrowDown />
              )
            ) : (
              <Box width={24} height={24} />
            )}
          </IconButton>
        </TableCell>
        <TableCell align='left'>{group.name}</TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          {group.new}
        </TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          {group.inProgress}
        </TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          {group.reStudy}
        </TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          <IconButton aria-label='share row' size='small'>
            <ShareIcon /> Share
          </IconButton>
        </TableCell>
      </TableRow>
      {group.nestedGroup.length > 0 && (
        <TableRow
          style={{ backgroundColor: getBackgroundColor(group.depth + 1) }}
        >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Table size='small' aria-label='nested table'>
                <TableBody>
                  {group.nestedGroup.map((subGroup) => (
                    <NestedRow
                      group={{ ...subGroup, depth: group.depth + 1 }}
                      key={subGroup.id}
                    />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
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
        </Typography>{' '}
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

const CollapsibleTable = () => {
  const [tableData, setTableData] = useState(data);
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
