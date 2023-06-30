import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import "./SidebarMessagesList.scss";
import {
  capitalize,
  getInitials,
  getUserColor,
} from "../../../../common/Funcitons";
import DOMPurify from "dompurify";
import { User } from "../../../../common/Types";
import { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckIcon from "@material-ui/icons/Check";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsIcon from "@material-ui/icons/Notifications";
type propsType = {
  usersList: User[];
  removeMessageChat: (id: number) => void;
};
type AnchorElementMap = { [key: number]: HTMLElement | null };
type mutedUsers = { [key: number]: boolean };
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

const SidebarMessagesList = (props: propsType) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  const { removeMessageChat } = props;
  const [menuAnchorEl, setMenuAnchorEl] = useState<AnchorElementMap>({});
  const [isMuted, setIsMuted] = useState<mutedUsers>({});

  const handleMenuOpen = (
    userId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setMenuAnchorEl((prevAnchorEl: AnchorElementMap) => ({
      ...prevAnchorEl,
      [userId]: event.currentTarget,
    }));
  };

  const updateStateFunc = (
    setStateFunc: StateSetter<any>,
    key: string | number,
    value: any
  ) => {
    setStateFunc((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleMenuClose = (userId: number) => {
    updateStateFunc(setMenuAnchorEl, userId, null);
  };
  const handleMuteButton = (id: number) => {
    updateStateFunc(setIsMuted, id, !isMuted[id]);
    handleMenuClose(id);
  };
  const handleRemoveUser = (id: number) => {
    removeMessageChat(id);
    handleMenuClose(id);
  };
  return (
    <div className="custom-scrollbar">
      {props.usersList.length > 0 &&
        props.usersList.map((user: User) => {
          const sanitizedImage = DOMPurify.sanitize(user.iconImage ?? "");
          const timeString = user.time.toLocaleTimeString(undefined, options);

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
                    width: 60,
                    height: 60,
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
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 5,
                    }}
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
                      onClick={(event) => handleMenuOpen(user.id, event)}
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
                      anchorEl={menuAnchorEl[user.id]}
                      open={Boolean(menuAnchorEl[user.id])}
                      onClose={() => handleMenuClose(user.id)}
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
                        style: {
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          marginTop: "-8px",
                          width: "300px",
                        },
                      }}
                    >
                      <MenuItem onClick={() => handleMenuClose(user.id)}>
                        <CheckIcon
                          className="outlined-icon mr-5"
                          fontSize="large"
                        />
                        Mark as Read
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(user.id)}>
                        <AccountCircleIcon
                          className="outlined-icon mr-5"
                          fontSize="large"
                        />
                        Go to Profile
                      </MenuItem>
                      <MenuItem onClick={() => handleMuteButton(user.id)}>
                        {!isMuted[user.id] ? (
                          <NotificationsIcon
                            className="outlined-icon mr-5"
                            fontSize="large"
                          />
                        ) : (
                          <NotificationsOffIcon
                            className="outlined-icon mr-5"
                            fontSize="large"
                          />
                        )}
                        {!isMuted[user.id]
                          ? "Mute Notifications"
                          : "Unmute Notifications"}
                      </MenuItem>
                      <MenuItem onClick={() => handleRemoveUser(user.id)}>
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
