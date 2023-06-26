import { Avatar, Badge, Box } from "@material-ui/core";
import "./SidebarMessagesList.scss";
import {
  capitalize,
  getInitials,
  getUserColor,
} from "../../../../common/Funcitons";
import DOMPurify from "dompurify";
import { User } from "../../../../common/Types";

type propsType = {
  usersList: User[];
};

const SidebarMessagesList = (props: propsType) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return (
    <div className="custom-scrollbar">
      {props.usersList.length > 0 &&
        props.usersList.map((user: any) => {
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
              <Box style={{
                position: "relative",
                display: "flex",
                flexDirection: "row-reverse"
              }}>
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
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 5
                    }}
                  />
                )}
              </Box>

              <Box component="div" className="ml-4 w-full">
                <div className="flex">
                  <div>{capitalize(user.name)}</div>
                  <Box component="div" className="ml-auto mr-2">
                    {timeString}
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
