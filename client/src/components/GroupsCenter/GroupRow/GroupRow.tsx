import React, { useState } from 'react';
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
} from '@mui/icons-material';
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Table,
  TableBody,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import { Group } from '../GroupsCenter';

type DragItem = {
  id: string;
  originalIndex: number;
};
type GroupProps = {
  group: Group;
  level: number;
  handleDeleteGroup: (id: string) => void;
  moveGroup: (sourceId: string, targetId: string) => void;
  findGroup: (id: string) => { index: number };
};

const getBackgroundColor = (level: number) => {
  const colors = ['#fff', '#f7f7f7', '#e7e7e7']; // Example colors for different levels
  return colors[level % colors.length];
};

const GroupRow: React.FC<GroupProps> = ({
  group,
  level,
  handleDeleteGroup,
  moveGroup,
  findGroup,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleGroup = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/groups/${group.id}`, { state: { group } });
  };

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'row',
      item: { id: group.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [group.id]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (item: DragItem) => {
        if (item.id !== group.id) {
          moveGroup(item.id, group.id);
        }
      },
    }),
    [group.id, moveGroup]
  );

  return (
    <>
      <TableRow
        ref={(node) => drag(drop(node))}
        sx={{
          paddingRight: 0,
        }}
        style={{
          backgroundColor: getBackgroundColor(level),
          padding: '0',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <TableCell style={{ width: '50px' }}>
          <IconButton aria-label='drag row' size='small' ref={preview}>
            <DragIndicatorIcon />
          </IconButton>
        </TableCell>
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
        <TableCell align='left' onClick={handleGroup}>
          {group.name}
        </TableCell>
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
            aria-label='delete row'
            size='small'
            onClick={() => handleDeleteGroup(group.id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      {group.children.length > 0 && (
        <TableRow style={{ backgroundColor: getBackgroundColor(level + 1) }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Table
                size='small'
                aria-label='nested table'
                key={group.id + 'table'}
              >
                <TableBody>
                  {group.children.map((subGroup: any) => (
                    <GroupRow
                      group={subGroup}
                      level={level + 1}
                      key={subGroup.id} // Add unique key here
                      handleDeleteGroup={handleDeleteGroup}
                      moveGroup={moveGroup}
                      findGroup={findGroup}
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
