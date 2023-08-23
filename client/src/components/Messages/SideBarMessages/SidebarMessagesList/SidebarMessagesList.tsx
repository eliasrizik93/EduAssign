import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  capitalize,
  getInitials,
  getUserColor,
} from "../../../../common/Funcitons";
import DOMPurify from "dompurify";
import { User } from "../../../../common/TypesAndEnums";
import { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckIcon from "@material-ui/icons/Check";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./SidebarMessagesList.scss";

// Define types for better readability
type AnchorElementMap = { [key: number]: HTMLElement | null };
type MutedUsers = { [key: number]: boolean };
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

type SidebarMessagesListProps = {
  usersList: User[];
  removeMessageChat: (id: number) => void;
};

// Define style constants
const avatarStyle: React.CSSProperties = {
  width: 60,
  height: 60,
};
const badgeStyle: React.CSSProperties = {
  position: "absolute",
  top: 10,
  right: 5,
};
const menuStyle: React.CSSProperties = {
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  marginTop: "-8px",
  width: "300px",
};

const SidebarMessagesList = (props: SidebarMessagesListProps) => {
  const { removeMessageChat } = props;
  const [menuAnchorMap, setMenuAnchorMap] = useState<AnchorElementMap>({});
  const [mutedUsers, setMutedUsers] = useState<MutedUsers>({});

  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const openMenu = (
    userId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    updateState(setMenuAnchorMap, userId, event.currentTarget);
  };

  const closeMenu = (userId: number) => {
    updateState(setMenuAnchorMap, userId, null);
  };

  const toggleMute = (userId: number) => {
    updateState(setMutedUsers, userId, !mutedUsers[userId]);
    closeMenu(userId);
  };

  const removeUser = (userId: number) => {
    removeMessageChat(userId);
    closeMenu(userId);
  };

  const updateState = (
    stateSetter: StateSetter<any>,
    key: string | number,
    value: any
  ) => {
    stateSetter((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="custom-scrollbar">
      {props.usersList.length > 0 &&
        props.usersList.map((user: User) => {
          const sanitizedImage = DOMPurify.sanitize(user.iconImage ?? "");
          const timeString = user.time.toLocaleTimeString(
            undefined,
            dateTimeFormatOptions
          );

          return (
            <Box
              key={user.id}
              component="div"
              className="mt-8"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <Avatar
                  src={sanitizedImage}
                  alt="No Picture"
                  style={{
                    ...avatarStyle,
                    backgroundColor: getUserColor(user.id),
                  }}
                >
                  {getInitials(user.name)}
                </Avatar>
                {user.unreadMessages > 0 && (
                  <Badge
                    badgeContent={user.unreadMessages}
                    color="error"
                    overlap="rectangular"
                    style={{ ...badgeStyle }}
                  />
                )}
              </Box>

              <Box component="div" className="ml-4 w-full relative">
                <div className="flex">
                  <div className="text-lg">{capitalize(user.name)}</div>
                  <Box
                    component="div"
                    className="ml-auto mr-2 absolute right-0 mt-1"
                  >
                    <IconButton
                      className="mr-2 "
                      onClick={(event) => openMenu(user.id, event)}
                      style={{
                        transform: "translateY(50%) rotate(90deg)",
                        padding: 0,
                        right: 0,
                        marginRight: 10,
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorMap[user.id]}
                      open={Boolean(menuAnchorMap[user.id])}
                      onClose={() => closeMenu(user.id)}
                      getContentAnchorEl={null}
                      keepMounted
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        style: menuStyle,
                      }}
                    >
                      <MenuItem onClick={() => closeMenu(user.id)}>
                        <CheckIcon
                          className="outlined-icon mr-5"
                          fontSize="large"
                        />
                        Mark as Read
                      </MenuItem>
                      <MenuItem onClick={() => closeMenu(user.id)}>
                        <AccountCircleIcon
                          className="outlined-icon mr-5"
                          fontSize="large"
                        />
                        Go to Profile
                      </MenuItem>
                      <MenuItem onClick={() => toggleMute(user.id)}>
                        {mutedUsers[user.id] ? (
                          <NotificationsOffIcon
                            className="outlined-icon mr-5"
                            fontSize="large"
                          />
                        ) : (
                          <NotificationsIcon
                            className="outlined-icon mr-5"
                            fontSize="large"
                          />
                        )}
                        {mutedUsers[user.id]
                          ? "Unmute Notifications"
                          : "Mute Notifications"}
                      </MenuItem>
                      <MenuItem onClick={() => removeUser(user.id)}>
                        <DeleteIcon
                          className="outlined-icon mr-5"
                          fontSize="large"
                        />
                        Delete
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
                <div className="flex items-center text-gray-500 ">
                  <div
                    className="text-lg overflow-hidden truncate "
                    style={{ maxWidth: "200px" }}
                  >
                    {user.lastMessage}
                  </div>
                  <div className="ml-1 mt-1 text-sm">{timeString}</div>
                </div>
              </Box>
            </Box>
          );
        })}
    </div>
  );
};

export default SidebarMessagesList;
