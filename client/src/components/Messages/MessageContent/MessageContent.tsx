import { TextField, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import Message from './Message/Message';
import './MessageContent.scss';

const MessageContent: React.FC = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const [emptyMessage, setEmptyMessage] = useState<boolean>(true);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value } = event.target;
    if (value === '') {
      !emptyMessage && setEmptyMessage(true);
    } else {
      emptyMessage && setEmptyMessage(false);
    }
    setNewMessage(value);
  };

  const sendMessage = () => {};

  return (
    <div className='messageContainer w-4/5'>
      <Paper className='messageList'>
        <Message />
      </Paper>
      <div className='messageInput'>
        <TextField
          className='textField'
          value={newMessage}
          onChange={handleTextFieldChange}
          placeholder='Type a message...'
          variant='outlined'
        />
        {!emptyMessage && <SendIcon onClick={sendMessage} />}
        {emptyMessage && <ThumbUpIcon />}
      </div>
    </div>
  );
};

export default MessageContent;
