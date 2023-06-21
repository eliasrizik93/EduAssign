import React from 'react';
import SidebarSearch from './SidebarSearch/SidebarSearch';
import SidebarMessagesList from './SidebarMessagesList/SidebarMessagesList';

const SideBarMessages = () => {
  return (
    <div className="w-1/5 pr-2 pl-5 pt-3">
        <SidebarSearch />
      <div className="h-full w-full">
        <SidebarMessagesList />
      </div>
    </div>
  );
};

export default SideBarMessages;
