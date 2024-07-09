import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  Box,
} from '@mui/material';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Group } from '../GroupsCenter';

type GroupProps = {
  group: Group;
  level: number;
  handleDeleteGroup: (id: string) => void;
};

const getBackgroundColor = (level: number) => {
  const colors = ['#fff', '#f7f7f7', '#e7e7e7']; // Example colors for different levels
  return colors[level % colors.length];
};

const GroupRow: React.FC<GroupProps> = ({
  group,
  level,
  handleDeleteGroup,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          paddingRight: 0,
        }}
        style={{
          backgroundColor: getBackgroundColor(level),
          padding: '0',
        }}
      >
        <TableCell style={{ width: '50px' }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {group.children.length > 0 ? (
              open ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
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
          {group.studied}
        </TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          <IconButton aria-label='share row' size='small'>
            <ShareIcon />
          </IconButton>
        </TableCell>
        <TableCell align='center' style={{ width: '300px' }}>
          <IconButton
            aria-label='share row'
            size='small'
            onClick={() => handleDeleteGroup(group.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {group.children.length > 0 && (
        <TableRow style={{ backgroundColor: getBackgroundColor(level + 1) }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Table size='small' aria-label='nested table'>
                <TableBody>
                  {group.children.map((subGroup) => (
                    <GroupRow
                      group={subGroup}
                      level={level + 1}
                      key={subGroup.id}
                      handleDeleteGroup={handleDeleteGroup}
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

export default GroupRow;