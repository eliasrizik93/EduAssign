import React from 'react';
import SideBarMessages from './SideBarMessages';
import MessageContent from './MessageContent';

const Messages: React.FC = () => {
  return (
    <div className='flex h-full'>
      <SideBarMessages />
      <MessageContent />
    </div>
  );
};

export default Messages;
