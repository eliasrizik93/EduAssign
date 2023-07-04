import { makeStyles, TextField, Paper } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
const useStyles = makeStyles((theme) => ({
  messageContainer: {
    margin: "30px 50px 0 30px",
  },
  messageList: {
    flex: 1,
    overflow: "auto",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
    height: "80vh",
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  messageInput: {
    display: "flex",
    alignItems: "center",
  },
}));

const MessageContent = () => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState<string>("");
  const [emptyMessage, setEmptyMessage] = useState<boolean>(true);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value === "") {
      !emptyMessage && setEmptyMessage(true);
    } else {
      emptyMessage && setEmptyMessage(false);
    }
    setNewMessage(value);
  };

  const sendMessage = () => {};
  return (
    <div className={`${classes.messageContainer} w-4/5`}>
      <Paper className={classes.messageList}>Content</Paper>
      <div className={classes.messageInput}>
        <TextField
          className={classes.textField}
          value={newMessage}
          onChange={handleTextFieldChange}
          placeholder="Type a message..."
          variant="outlined"
        />
        {!emptyMessage && <SendIcon onClick={sendMessage} />}
        {emptyMessage && <ThumbUpIcon />}
      </div>
    </div>
  );
};
export default MessageContent;
