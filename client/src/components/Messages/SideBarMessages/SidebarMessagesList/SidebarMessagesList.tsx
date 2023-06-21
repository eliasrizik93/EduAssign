import { Box } from "@material-ui/core";
import "./SidebarMessagesList.scss";
const Users = [
  {
    name: "elias rizik3",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "jack sparrow3",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "david alba3",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "Lionel Messi3",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "elias rizik4",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "jack sparrow4",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "david alba4",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "Lionel Messi4",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "elias rizik5",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "jack sparrow5",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "david alba5",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
  {
    name: "Lionel Messi5",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "wwq",
  },
];

const SidebarMessagesList = () => {
  return (
    <div className="custom-scrollbar">
      {Users.length > 0 &&
        Users.map((user) => {
          return (
            <Box
              key={user.name}
              component="div"
              className="mt-8"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>{user.iconImage}</div>
              <Box component="div" className="ml-4 w-full">
                <div className="flex">
                  <div>{user.name}</div>
                  <Box component="div" className="ml-auto mr-2">
                    {user.time}
                  </Box>
                </div>
                <div>{user.lastMessage}</div>
              </Box>
            </Box>
          );
        })}
    </div>
  );
};

export default SidebarMessagesList;
