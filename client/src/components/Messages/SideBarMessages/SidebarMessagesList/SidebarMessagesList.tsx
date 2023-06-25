import { Avatar, Box } from "@material-ui/core";
import "./SidebarMessagesList.scss";
import { capitalize, getInitials, getRandomColor } from "../../../../common/Funcitons";
import DOMPurify from 'dompurify';

const Users = [
  {
    name: "elias rizik",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "https://img.freepik.com/premium-photo/close-up-young-handsome-man-with-beard-smiling-camera-with-confidence-standing-white-background_1258-49635.jpg",
  },
  {
    name: "jack sparrow",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "david alba",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "Lionel Messi",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "elias rizik",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "jack sparrow",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "david alba",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "Lionel Messi",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "elias rizik",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fpeople-face&psig=AOvVaw09fMN_7VhTs7GVaDrwBiFh&ust=1687807157911000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCcxuKR3_8CFQAAAAAdAAAAABAE",
  },
  {
    name: "jack sparrows",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "david alba",
    time: "10:30",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
  {
    name: "Lionel Messi",
    time: "10:00",
    notifications: 3,
    lastMessage: "hello how are you?",
    iconImage: '',
  },
];

const SidebarMessagesList = () => {

  return (
    <div className="custom-scrollbar">
      {Users.length > 0 &&
        Users.map((user) => {
          const sanitizedImage = DOMPurify.sanitize(user.iconImage ?? '');
          const avatarColor = sanitizedImage ? '' : getRandomColor();
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
              <Avatar src={user.iconImage} alt="No Picture" style={{
                width: 60,
                height: 60,
                backgroundColor: getRandomColor()
              }} >{getInitials(user.name)}</Avatar>
              <Box component="div" className="ml-4 w-full">
                <div className="flex">
                  <div>{capitalize(user.name)}</div>
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
