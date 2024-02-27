import { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  SvgIconProps,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckIcon from "@material-ui/icons/Check";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsIcon from "@material-ui/icons/Notifications";
import {
  capitalize,
  getInitials,
  getUserColor,
} from "../../../../common/Funcitons";
import DOMPurify from "dompurify";

import { User } from "../../../../common/TypesAndEnums";
import "./SidebarMessagesList.scss";
interface CustomMenuItemProps {
  label: string;
  IconComponent: React.ComponentType<SvgIconProps>;
  onClick: () => void;
}
interface CustomMenuItemListProps {
  userId: number;
}
interface AvatarBadgeProps {
  user: User;
  sanitizedImage: string;
}
// Define types for better readability
type AnchorElementMap = { [key: number]: HTMLElement | null };
type MutedUserIds = { [key: number]: boolean };
type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
type SidebarMessagesListProps = {
  users: User[];
  searchQuery: string;
  removeChat: (id: number) => void;
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
  const { users, searchQuery, removeChat } = props;
  const [menuAnchorElements, setMenuAnchorElements] =
    useState<AnchorElementMap>({});
  const [mutedUserIds, setMutedUserIds] = useState<MutedUserIds>({});

  const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const handleMenuOpen = (
    userId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    updateState(setMenuAnchorElements, userId, event.currentTarget);
  };

  const handleMenuClose = (userId: number) => {
    updateState(setMenuAnchorElements, userId, null);
  };

  const handleMuteToggle = (userId: number) => {
    updateState(setMutedUserIds, userId, !mutedUserIds[userId]);
    handleMenuClose(userId);
  };

  const handleUserRemoval = (userId: number) => {
    removeChat(userId);
    handleMenuClose(userId);
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

  const getHighlightedUserName = (name: string): React.ReactNode => {
    const searchIndex = name.toLowerCase().indexOf(searchQuery.toLowerCase());
    const capitalName = capitalize(name);

    if (searchIndex !== -1) {
      const beforeMatch = capitalName.substring(0, searchIndex);
      const match = capitalName.substring(
        searchIndex,
        searchIndex + searchQuery.length
      );
      const afterMatch = capitalName.substring(
        searchIndex + searchQuery.length,
        capitalName.length
      );
      return (
        <>
          {beforeMatch}
          <span className="highlight">{match}</span>
          {afterMatch}
        </>
      );
    }
    return capitalName;
  };

  const AvatarBadge: React.FC<AvatarBadgeProps> = ({
    user,
    sanitizedImage,
  }) => (
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
  );
  const generateMenuItems = (
    userid: number,
    mutedUserIds: MutedUserIds,
    handleMenuClose: (userId: number) => void,
    handleMuteToggle: (userId: number) => void,
    handleUserRemoval: (userId: number) => void
  ) => [
    {
      label: "Mark as Read",
      Icon: CheckIcon,
      action: () => handleMenuClose(userid),
    },
    {
      label: "Go to Profile",
      Icon: AccountCircleIcon,
      action: () => handleMenuClose(userid),
    },
    {
      label: mutedUserIds[userid]
        ? "Unmute Notifications"
        : "Mute Notifications",
      Icon: mutedUserIds[userid] ? NotificationsOffIcon : NotificationsIcon,
      action: () => handleMuteToggle(userid),
    },
    {
      label: "Delete",
      Icon: DeleteIcon,
      action: () => handleUserRemoval(userid),
    },
  ];

  const CustomMenuItem: React.FC<CustomMenuItemProps> = ({
    label,
    IconComponent,
    onClick,
  }) => {
    return (
      <MenuItem onClick={onClick}>
        <IconComponent className="outlined-icon mr-5" fontSize="large" />
        {label}
      </MenuItem>
    );
  };
  const CustomMenuItemList: React.FC<CustomMenuItemListProps> = ({
    userId,
  }) => {
    const menuItems = generateMenuItems(
      userId,
      mutedUserIds,
      handleMenuClose,
      handleMuteToggle,
      handleUserRemoval
    );
    return (
      <>
        {menuItems.map((item, index) => (
          <CustomMenuItem
            key={index}
            label={item.label}
            IconComponent={item.Icon}
            onClick={() => item.action()}
          />
        ))}
      </>
    );
  };
  return (
    <div className="custom-scrollbar">
      {users.length > 0 &&
        users.map((user: User) => {
          const sanitizedImage = DOMPurify.sanitize(user.iconImage ?? "");
          const timeString = user.time.toLocaleTimeString(
            undefined,
            dateTimeFormatOptions
          );

          return (
            <Box
              key={user.id}
              component="div"
              className="mt-8 Container-Message-List-Item"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <AvatarBadge user={user} sanitizedImage={sanitizedImage} />
              <Box component="div" className="ml-4 w-full relative">
                <div className="flex">
                  <div className="text-lg">
                    {getHighlightedUserName(user.name)}
                  </div>
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
                      anchorEl={menuAnchorElements[user.id]}
                      open={Boolean(menuAnchorElements[user.id])}
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
                        style: menuStyle,
                      }}
                    >
                      <CustomMenuItemList userId={user.id} />
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
