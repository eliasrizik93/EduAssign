import { useDrop } from 'react-dnd';
import { DragItem } from '../GroupRow/GroupRow';
import './RootDropZone.scss';
import { ReactNode } from 'react';

type RootDropZoneProps = {
  moveGroup: (sourceId: string, targetId: string | null) => void;
  children?: ReactNode;
};

const RootDropZone: React.FC<RootDropZoneProps> = ({ moveGroup, children }) => {
  const [, drop] = useDrop(() => ({
    accept: 'row',
    drop: (item: DragItem) => {
      moveGroup(item.id, null);
    },
  }));

  return (
    <div
      ref={drop}
      style={{
        backgroundColor: '#ccc',
        padding: '50px',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default RootDropZone;
