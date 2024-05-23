import React from 'react';
import { Avatar } from '@mui/material';
import './Message.scss';

type MessageProps = {
  message?: string;
  imgUrl?: string;
  timeStamp?: string;
};

const Message = (props: MessageProps) => {
  return (
    <>
      <div className='container'>
        <Avatar src={props.imgUrl} alt='No Picture' className='avatar'></Avatar>
        <div className='text'>
          qweqw qkw eoqw wqopi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop
          jqwiope jqpio epi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop
          jqwiope jqpio ejqopi ejqiop ejoipwq jiopq jioppi ejwopqie jqiopw
          jpioqwej pqwje pioqw wqeiojqwiop jqwiope jqpio ejqopi ejqiop ejoipwq
          jiopq jioppi ejwopqie jqiopw jpioqwej pqwje pioqw wqeiojqwiop jqwiope
          jqpio ejqopi ejqiop ejoipwq jiopq jiopjqopi ejqiop ejoipwq jiopq
          jiopejqiopwejoipqwejoipqwj wqe jioqwej ioqwejo iqjeio qwjeiowq
          jioewjioqejioqw ejioqwej qwioko qwj keioqjoi ejqwio jiowj ioqwej owqw
          qjiwe{' '}
        </div>
        <div className='timestamp'>12:30</div>
      </div>
      <div className='container'>
        <Avatar src={props.imgUrl} alt='No Picture' className='avatar'></Avatar>
        <div className='text'>
          qweqw qkw eoqw wqopi ejio ejqopi ejqiop ejqwej owqw qjiwe{' '}
        </div>
        <div className='timestamp'>12:30</div>
      </div>
      <div className='container'>
        <Avatar src={props.imgUrl} alt='No Picture' className='avatar'></Avatar>
        <div className='text'>
          qweqw qkw eoqw wqopi ejio ejqopi ejqiop ejqqopi ejqiop ejqwej owqqopi
          ejqiop ejqwej owqqopi ejqiop ejqwej owqwej owqw qjiwe{' '}
        </div>
        <div className='timestamp'>12:30</div>
      </div>
      <div className='container'>
        <Avatar src={props.imgUrl} alt='No Picture' className='avatar'></Avatar>
        <div className='text'>
          qweqw qkqopi ejqiop ejqwej owqqopi ejqiop ejqwej owqw eoqw wqopi ejio
          ejqopi ejqiop ejqwej owqw qjiwe{' '}
        </div>
        <div className='timestamp'>12:30</div>
      </div>
    </>
  );
};
export default Message;
