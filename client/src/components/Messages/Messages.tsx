import React from "react";
import SideBarMessages from "./SideBarMessages/SideBarMessages";
import MessageContent from "./MessageContent/MessageContent";

const Messages: React.FC = () => {
  return (
    <div className="flex h-full">
      <SideBarMessages />
      <MessageContent />
    </div>
  );
};

export default Messages;
