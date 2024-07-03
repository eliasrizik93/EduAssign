import React, { useState } from 'react';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import './NestedRow.scss';
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

export default NestedRow;
