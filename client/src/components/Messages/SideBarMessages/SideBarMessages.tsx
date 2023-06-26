import React, { useState } from "react";
import SidebarSearch from "./SidebarSearch/SidebarSearch";
import SidebarMessagesList from "./SidebarMessagesList/SidebarMessagesList";
import { User } from "../../../common/Types";

const initialUsersList: User[] = [
  {
    id: 1,
    name: "elias rizik",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage:
      "https://img.freepik.com/premium-photo/close-up-young-handsome-man-with-beard-smiling-camera-with-confidence-standing-white-background_1258-49635.jpg",
  },
  {
    id: 2,
    name: "jack sparrow",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 3,
    name: "david alba",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 4,
    name: "Lionel Messi",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 5,
    name: "elias rizik",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 6,
    name: "jack sparrow",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 7,
    name: "david alba",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 8,
    name: "Lionel Messi",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 9,
    name: "elias rizik",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fpeople-face&psig=AOvVaw09fMN_7VhTs7GVaDrwBiFh&ust=1687807157911000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCcxuKR3_8CFQAAAAAdAAAAABAE",
  },
  {
    id: 10,
    name: "jack sparrows",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 11,
    name: "david alba",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
  {
    id: 12,
    name: "Lionel Messi",
    time: new Date(),
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "",
  },
];
const SideBarMessages = () => {
  const [usersList, setUsersList] = useState<User[]>(initialUsersList);

  const handleSearch = (userName: string): void => {
    const filteredUsersList = initialUsersList.filter((user: User) =>
      user.name.toLowerCase().startsWith(userName.toLowerCase())
    );
    setUsersList(filteredUsersList);
  };

  return (
    <div className="w-1/5 pr-2 pl-5 pt-3">
      <SidebarSearch handleSearch={handleSearch} />
      <div className="h-full w-full">
        <SidebarMessagesList usersList={usersList} />
      </div>
    </div>
  );
};

export default SideBarMessages;
