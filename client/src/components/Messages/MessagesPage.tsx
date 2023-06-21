import React from "react";
import MessageContent from "./MessageContent/MessageContent";
import SideBarMessages from "./SidebarMessages/SideBarMessages";

const Messages: React.FC = () => {
  return (
    <div className="flex h-full">
      <SideBarMessages />
      <MessageContent />
    </div>
  );
};

export default Messages;
