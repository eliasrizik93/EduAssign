import React from "react";
import MessageContent from "./MessageContent/MessageContent";
import SidebarMessages from "./SidebarMessages/SidebarMessages";

const Messages: React.FC = () => {
  return (
    <div className="flex h-full">
      <SidebarMessages />
      <MessageContent />
    </div>
  );
};

export default Messages;
